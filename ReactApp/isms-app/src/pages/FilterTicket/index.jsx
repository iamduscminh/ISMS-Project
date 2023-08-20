import { React, useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import styled from "styled-components";
import RequestComment from "../../components/Elements/RequestComment";
import ModalDialog from "../../components/Elements/PopupModal";
import CustomField from "../../components/Elements/CustomField";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import IconTag from "../../components/Elements/IconTag";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { URL } from "../../utils/Url";

function FilterRequest() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const { id } = useParams();
  const { auth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    criteriaMode: "all",
  });
  const ticketUrl = `${URL.REQUEST_TICKET_URL}`;

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const headers = {
    Authorization: `Bearer ${auth?.accessToken}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };
  const [condition1, setCondition1] = useState("");
  const [condition2, setCondition2] = useState("");
  const [condition3, setCondition3] = useState("");
  const [condition4, setCondition4] = useState("");
  // useEffect(() => {
  //   const apiGetRequestTicketsUrl = `${ticketUrl}/gettickets/${auth?.email}/${id}`;
  //   const fetchData = async () => {
  //     try {
  //       Swal.fire({
  //         title: "Loading...",
  //         allowOutsideClick: false,
  //         onBeforeOpen: () => {
  //           Swal.showLoading();
  //         },
  //       });
  //       //--------------Get request tickets
  //       await axiosInstance
  //         .get(apiGetRequestTicketsUrl)
  //         .then((response) => {
  //           const dataRp = response.data;
  //           const rqTicket = {
  //             requestType: {
  //               requestTypeId: dataRp?.serviceItemEntity?.serviceItemId ?? 0,
  //               requestTypeName:
  //                 dataRp?.serviceItemEntity?.serviceItemName ??
  //                 "Report an issue",
  //               requestTypeDesc:
  //                 dataRp?.serviceItemEntity?.description ??
  //                 "Report an issue when you have abnormal problem",
  //               requestTypeIcon:
  //                 dataRp?.serviceItemEntity?.iconDisplay ?? "GoReport",
  //             },
  //             isIncident: dataRp.isIncident,
  //             title: dataRp.title,
  //             description: dataRp.description,
  //             createAt: dataRp.createdAt,
  //             status: dataRp.status,
  //             fileName: dataRp.attachmentEntity?.filename,
  //             filePath: dataRp.attachmentEntity?.filePath,
  //           };
  //           console.log(response.data);
  //         })
  //         .catch((error) => {
  //           const result = Swal.fire({
  //             icon: "error",
  //             title: "Oops...",
  //             text: `${error}`,
  //           });
  //         });

  //       Swal.close();
  //     } catch (error) {
  //       // Handle errors if needed
  //       console.log(error);
  //       Swal.close();
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: error,
  //       });
  //     }
  //   };
  //   fetchData();
  // }, []);
  const onSubmit = (data) => {
    console.log(data);
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      // axiosInstance
      //   .post(apiCreateRequestTicketUrl, formData, headers)
      //   .then((response) => {
      //     console.log(response.data);
      //     ticketIdResponse = response.data.requestTicketDTO.requestTicketId;
      //     //CREATE REQUEST TICKET EXT
      //     if (customFieldsData.some((item) => typeof item === "object")) {
      //       const customFieldsDataArray = customFieldsData.map((item) => {
      //         return {
      //           ...item,
      //           ticketId: response.data.requestTicketDTO.requestTicketId,
      //         };
      //       });
      //       //console.log(customFieldsDataArray);
      //       //console.log(ticketIdResponse);
      //       return axiosInstance.post(
      //         apiCreateRequestTicketExtUrl,
      //         JSON.stringify(customFieldsDataArray),
      //         { headers }
      //       );
      //     }
      //   })
      //   .catch((error) => {
      //     const result = Swal.fire({
      //       icon: "error",
      //       title: "Oops...",
      //       text: `${error}`,
      //     });
      //   });

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
    <div className="detail-request-container w-full h-full py-5 bg-[#294a8d] mt-3">
      <div className="detail-request-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow">
        {/* HEADER SECTION*/}
        <div className="detail-request-header w-full bg-[#0e3275] text-white">
          <nav className="detail-request-header-nav px-6 pt-3 pb-3">
            <ul className="header-nav-content flex items-center text-[18px]">
              <li className="header-nav-item ml-1">
                <Link
                  className="header-nav-url hover:underline hover:text-white"
                  to="/"
                  title="Home"
                  aria-label="Home"
                >
                  Home
                </Link>
              </li>

              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link
                  className="header-nav-url hover:underline hover:text-white"
                  title="Create Request"
                  aria-label="Create Request"
                >
                  Filter Tickets
                </Link>
              </li>
            </ul>
          </nav>
          <div className="detail-request-header-content px-6 pb-3 flex items-center justify-between">
            <div className="detail-request-header-left  flex items-center">
              <div className="detail-request-header-icon">
                <IconTag name={"BiFilterAlt"} className={"h-[50px] w-[50px]"} />
              </div>
              <div className="detail-request-header-description ml-5">
                <h4 className="text-2xl font-bold">Filter Ticket</h4>
                <span>Filter, search your list request ticket</span>
              </div>
            </div>
            {/* <div className="detail-request-header-right">
              <Link to={"/catalog"}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Create Request Ticket
                </button>
              </Link>
            </div> */}
          </div>
        </div>
        <div className="p-5 w-full h-full flex">
          <div className="form-search flex items-center justify-center">
            <form className="w-[60%]" onSubmit={handleSubmit(onSubmit)}>
              <div className=" flex items-center justify-between">
                <div className="mb-2 w-[40%]">
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
                </div>
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtTitle"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Status
                  </label>
                  <select
                    id={`searchbox`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("statusTicket")}
                  >
                    <option></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
              <div className=" flex items-center justify-between">
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtTitle"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Request Type
                  </label>
                  <select
                    id={`searchbox`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("statusTicket")}
                  >
                    <option></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtTitle"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Services
                  </label>
                  <select
                    id={`searchbox`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("statusTicket")}
                  >
                    <option></option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              </div>
              <div className=" flex items-center justify-between">
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtTitle"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Create From
                  </label>
                  <input
                    type="date"
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
                </div>
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtTitle"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Create To
                  </label>
                  <input
                    type="date"
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
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterRequest;
