import { React, useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./CreateRequest.module.scss";
import CustomField from "../../components/Elements/CustomField";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import IconTag from "../../components/Elements/IconTag";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { axiosPrivate } from "../../utils/axiosConfig";
const cx = classNames.bind(styles);
function CreateRequest() {
  const { id } = useParams();
  const { auth } = useAuth();
  const [requestType, setRequestType] = useState(null);
  const [requestTypeCustomFields, setRequestTypeCustomFields] = useState([]);
  //API CONFIG
  const headers = {
    Authorization: `Bearer ${auth?.token}`,
    withCredentials: true,
  };
  //CALL API GET REQUEST TYPE
  useEffect(() => {
    const apiGetRequestTypeUrl = `api/ServiceItems/${id}`;
    const apiGetCustomFieldsUrl = `api/ServiceItemCustomFields/getbyserviceitem/${id}`;
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
        await axiosPrivate
          .get(apiGetRequestTypeUrl, { headers })
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
            console.log(data);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
              showCancelButton: true,
              cancelButtonText: "Cancel",
            });
          });
        Swal.close();

        //-------------Get custom field
        await axiosPrivate
          .get(apiGetCustomFieldsUrl, { headers })
          .then((response) => {
            const data = response.data.map((item, i) => ({
              fieldId: item.customField.customFieldId,
              fieldCode: item.customField.fieldCode,
              fieldName: item.customField.fieldName,
              fieldValue: item.customField.defaultValue ?? null,
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
              showCancelButton: true,
              cancelButtonText: "Cancel",
            });
          });
        Swal.close();
      } catch (error) {
        // Handle errors if needed
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    };
    fetchData();
  }, []);
  const requestTypeTemp = {
    id: "1",
    requestTypeName: "Request new hardware",
    description: "Request to admin for new hardware",
    customFields: [
      {
        fieldId: 1,
        fieldCode: "f1",
        fieldName: "Configuration information",
        fieldValue: null,
        fieldType: "T",
        valType: "N",
        mandatory: 0,
        minVal: null,
        maxVal: null,
        minlength: null,
        maxlength: null,
        listOfValue: null,
        listOfValueDisplay: null,
        placeholder: null,
      },
      {
        fieldId: 2,
        fieldCode: "f2",
        fieldName: "Brand Expect",
        fieldValue: null,
        fieldType: "LOV",
        valType: "T",
        mandatory: 0,
        minVal: null,
        maxVal: null,
        minlength: null,
        maxlength: null,
        listOfValue: "Dell;HP;Acer;MSI",
        listOfValueDisplay: "Dell;HP;Acer;MSI",
        placeholder: null,
      },
    ],
  };

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
    console.log(data);
  };
  return (
    <div
      className={cx(
        "cre-request-container w-full h-full py-5 bg-[#294a8d] mt-3"
      )}
    >
      <div
        className={cx(
          "cre-request-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow "
        )}
      >
        <div
          className={cx("cre-request-header  w-full bg-[#0e3275] text-white")}
        >
          <nav className={cx("cre-request-header-nav px-6 pt-3 pb-3")}>
            <ul
              className={cx("header-nav-content flex items-center text-[18px]")}
            >
              <li className={cx("header-nav-item ml-1")}>
                <Link className={cx("header-nav-url")} to="/">
                  <UnderlineAnimation>Home</UnderlineAnimation>
                </Link>
              </li>

              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <Link className={cx("header-nav-url")} href="/catalog">
                  <UnderlineAnimation>Create Request</UnderlineAnimation>
                </Link>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <Link className={cx("header-nav-url")} href="/catalog">
                  <UnderlineAnimation>
                    {requestType?.serviceName}
                  </UnderlineAnimation>
                </Link>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <Link className={cx("header-nav-url")}>
                  <span>{requestType?.requestTypeName}</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div
            className={cx(
              "cre-request-header-content px-6 pb-3 flex items-center"
            )}
          >
            <div className={cx("cre-request-header-icon")}>
              <IconTag
                name={requestType?.iconDisplay}
                className={"h-[50px] w-[50px]"}
              />
            </div>
            <div className={cx("cre-request-header-description ml-5")}>
              <h4 className="text-2xl font-bold">
                {requestType?.requestTypeName}
              </h4>
              <span>{requestType?.description}</span>
            </div>
          </div>
        </div>
        {/* REQUEST FORM SECTION*/}
        <div className={cx("p-5 w-full h-full")}>
          <div className={cx("request-ticket-form-ctn w-[60%] m-auto")}>
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
              <div className="customFieldSection mt-3">
                {requestTypeCustomFields.map((item, i) => {
                  return (
                    <CustomField
                      key={i}
                      fieldId={item?.fieldId}
                      fieldCode={item?.fieldCode}
                      fieldName={item?.fieldName}
                      fieldValue={item?.fieldValue}
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
