import { React, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomField from "../../components/Elements/CustomField";
import IconTag from "../../components/Elements/IconTag";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function CreateRequest() {
  const { id } = useParams();
  const { auth } = useAuth();
  const axiosInstance = useAxiosPrivate();
  const [isIncident, setIsIncident] = useState(false);
  const [requestType, setRequestType] = useState(null);
  const [requestTypeCustomFields, setRequestTypeCustomFields] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState();
  //API CONFIG
  const token = auth?.accessToken;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile);
      const fileName = selectedFile.name;
      setSelectedFileName(fileName);
    }
  };

  //CALL API GET REQUEST TYPE
  useEffect(() => {
    if (id) {
      setIsIncident(false);
    } else {
      setIsIncident(true);
    }

    const apiGetRequestTypeUrl = `api/ServiceItems/${id}`;
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get request type
        axiosInstance
          .get(apiGetRequestTypeUrl)
          .then((response) => {
            const data = {
              id: response.data.serviceItemId,
              requestTypeName: response.data.serviceItemName,
              description: response.data.description,
              iconDisplay: response.data.iconDisplay,
              serviceCategoryId: response.data.serviceCategoryId,
              serviceName:
                response.data.serviceCategoryEntity.serviceCategoryName,
            };
            setRequestType(data);
            //console.log(data);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          });

        //CALL API GET REQUEST TYPE
        const apiGetCustomFieldsUrl = `api/ServiceItemCustomFields/getbyserviceitem/${id}`;

        axiosInstance
          .get(apiGetCustomFieldsUrl, { headers })
          .then((response) => {
            const data = response.data.map((item, i) => ({
              fieldId: item.customField.customFieldId,
              fieldCode: item.customField.fieldCode,
              fieldName: item.customField.fieldName,
              fieldValue: item.customField.defaultValue ?? undefined,
              fieldType: item.customField.fieldType,
              valType: item.customField.valType,
              mandatory: item.mandatory,
              minVal: item.customField.minVal,
              maxVal: item.customField.maxVal,
              minlength: item.customField.minlength,
              maxlength: item.customField.maxlength,
              listOfValue: item.customField.listOfValue,
              listOfValueDisplay: item.customField.listOfValueDisplay,
              placeholder: item.customField.placeholder,
            }));

            setRequestTypeCustomFields(data);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          });
        Swal.close();
      } catch (error) {
        // Handle errors if needed
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    };
    if (id) fetchData();
    else {
      setRequestType({
        id: 0,
        requestTypeName: "Report an issue",
        description: "Report an issue when you have abnormal problem",
        iconDisplay: "GoReport",
        serviceCategoryId: "",
        serviceName: "",
      });
    }
  }, []);
  //định nghĩa form
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (data) => {
    const rqtTitle = getValues("rqtTitle");
    const rqtDesc = getValues("rqtDesc");
    const list = ["rqtTitle", "rqtDesc", "rqtFile"];
    const customFieldsDataForm = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => !list.includes(key))
    );
    const customFieldsData = Object.entries(customFieldsDataForm).map(
      ([key, value]) => {
        return { fieldId: key, fieldValue: value ?? "" };
      }
    );

    //Main Request Information
    const formData = new FormData();
    const fileName = selectedFile?.name;
    formData.append("IsIncident", isIncident);
    formData.append("Title", rqtTitle);
    formData.append("Description", rqtDesc);
    formData.append("ServiceItemId", isIncident ? "" : requestType.id);
    formData.append("RequesterEmail", auth?.email);
    if (selectedFile) formData.append("Attachment", selectedFile, fileName);

    //CREATE REQUEST TICKET
    const apiCreateRequestTicketUrl = "api/RequestTickets/sendticket";
    const apiCreateRequestTicketExtUrl = "api/RequestTicketExts/create";
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      axiosInstance
        .post(apiCreateRequestTicketUrl, formData, headers)
        .then((response) => {
          console.log(response.data);
          //CREATE REQUEST TICKET EXT
          if (customFieldsData.some((item) => typeof item === "object")) {
            const customFieldsDataArray = customFieldsData.map((item) => {
              return {
                ...item,
                ticketId: response.data.requestTicketDTO.requestTicketId,
              };
            });
            console.log(customFieldsDataArray);
            return axiosInstance.post(
              apiCreateRequestTicketExtUrl,
              JSON.stringify(customFieldsDataArray),
              { headers }
            );
          }
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          const result = Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
          });
        });

      Swal.close();
    } catch (error) {
      // Handle errors if needed
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };
  return (
    <div className="cre-request-container w-full h-full py-5 bg-[#294a8d] mt-3">
      <div className="cre-request-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow ">
        <div className="cre-request-header  w-full bg-[#0e3275] text-white">
          <nav className="cre-request-header-nav px-6 pt-3 pb-3">
            <ul className="header-nav-content flex items-center text-[18px]">
              <li className="header-nav-item ml-1">
                <Link
                  className="header-nav-url hover:underline hover:text-white"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <IconTag name="AiOutlineRight" />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link
                  className="header-nav-url hover:underline hover:text-white"
                  to="/catalog"
                >
                  Create Request
                </Link>
              </li>
              {requestType?.serviceName && (
                <>
                  <li className="header-nav-item ml-1">
                    <div className="header-nav-arrow">
                      <IconTag name={"AiOutlineRight"} />
                    </div>
                  </li>
                  <li className="header-nav-item ml-1">
                    <Link
                      className="header-nav-url hover:underline hover:text-white"
                      to="/catalog"
                    >
                      {requestType?.serviceName}
                    </Link>
                  </li>
                </>
              )}
              {requestType?.requestTypeName && (
                <>
                  <li className="header-nav-item ml-1">
                    <div className="header-nav-arrow">
                      <IconTag name={"AiOutlineRight"} />
                    </div>
                  </li>
                  <li className="header-nav-item ml-1">
                    <Link className="header-nav-url hover:underline hover:text-white">
                      <span>{requestType.requestTypeName}</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="cre-request-header-content px-6 pb-3 flex items-center">
            <div className="cre-request-header-icon">
              {requestType?.iconDisplay && (
                <IconTag
                  name={requestType?.iconDisplay}
                  className={"h-[50px] w-[50px]"}
                />
              )}
            </div>
            <div className="cre-request-header-description ml-5">
              <h4 className="text-2xl font-bold">
                {requestType?.requestTypeName}
              </h4>
              <span>{requestType?.description}</span>
            </div>
          </div>
        </div>
        {/* REQUEST FORM SECTION*/}
        <div className="p-5 w-full h-full">
          <div className="request-ticket-form-ctn w-[60%] m-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <label
                  htmlFor="rqtTitle"
                  className="block mb-2 text-sm font-medium text-gray-500 "
                >
                  Request Title
                </label>
                <input
                  type="text"
                  id="rqtTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder=""
                  {...register("rqtTitle", {
                    required: "This field is required.",
                    maxLength: {
                      value: 500,
                      message: "This field must less than 500 characters",
                    },
                  })}
                />
                <p className="mt-2 text-sm text-red-600 ">
                  {errors.rqtTitle && errors.rqtTitle.message}
                </p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="rqtDesc"
                  className="block mb-2 text-sm font-medium text-gray-500 "
                >
                  Description
                </label>
                <textarea
                  id="rqtDesc"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Write description content of request ticket"
                  {...register("rqtDesc", {
                    maxLength: {
                      value: 200,
                      message: "This field must less than 2000 characters",
                    },
                  })}
                ></textarea>
                <p className="mt-2 text-sm text-red-600 ">
                  {errors.rqtDesc && errors.rqtDesc.message}
                </p>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="rqtFile"
                  className="block mb-2 text-sm font-medium text-gray-500 "
                >
                  File Attachment
                </label>
                <input
                  type="file"
                  id="rqtFile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  onChange={handleFileChange}
                />
                <p className="mt-2 text-sm text-red-600 ">
                  {errors.rqtFile && errors.rqtFile.message}
                </p>
              </div>
              <div className="customFieldSection mt-3">
                {requestTypeCustomFields.map((item, i) => {
                  return (
                    <CustomField
                      key={i}
                      fieldId={item?.fieldId}
                      fieldCode={item?.fieldCode}
                      fieldName={item?.fieldName}
                      fieldValue={
                        item?.fieldValue ?? item?.defaultValue ?? undefined
                      }
                      fieldType={item?.fieldType}
                      valType={item?.valType}
                      mandatory={item?.mandatory}
                      minVal={item?.minVal}
                      maxVal={item?.maxVal}
                      minlength={item?.minlength}
                      maxlength={item?.maxlength}
                      listOfValue={item?.listOfValue}
                      listOfValueDisplay={item?.listOfValueDisplay}
                      placeholder={item?.placeholder}
                      register={register}
                      setValueFnc={setValue}
                      errors={errors}
                    />
                  );
                })}
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;
