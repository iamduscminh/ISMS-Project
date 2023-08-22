import { React, useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import IconTag from "../../components/Elements/IconTag";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { URL } from "../../utils/Url";

function FilterRequest() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const { id } = useParams();
  const { auth } = useAuth();
  const [ticketData, setTicketData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [requestTypeData, setRequestTypeData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    criteriaMode: "all",
  });
  const today = new Date().toISOString().split("T")[0];
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
  const columns = [
    { field: "stt", headerName: "STT", width: 50 },
    { field: "id", headerName: "ID", width: 150 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "createAt", headerName: "Create At", width: 200 },
  ];
  const handleRowClick = (e) => {};
  const resetConditionfilter = () => {
    setValue("rqtTitle", "");
    setValue("rqtStatus", "");
    setValue("rqtService", "");
    setValue("rqtType", "");
    setValue("rqtCreateFr", "");
    setValue("rqtCreateTo", "");
    setValue("rqtIsIncident", false);
  };
  useEffect(() => {
    const requestTypeUrl = `${URL.SERVICE_ITEM_URL}/getall`;
    const serviceUrl = `${URL.SERVICE_CATEGORY_URL}/getall`;

    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        await axiosInstance
          .get(serviceUrl, { headers })
          .then((response) => {
            const dataService = response.data.map((item, i) => ({
              id: item.serviceCategoryId,
              name: item.serviceCategoryName,
            }));
            setServiceData(dataService);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          });

        await axiosInstance
          .get(requestTypeUrl, { headers })
          .then((response) => {
            const dataRqType = response.data.map((item, i) => ({
              id: item.serviceItemId,
              name: item.serviceItemName,
            }));
            setRequestTypeData(dataRqType);
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
  const onSubmit = async (data) => {
    console.log(data);
    const filterTicketUrl = `${URL.REQUEST_TICKET_URL}/filtertickets`;
    const queryDto = {
      titleSearch: data.rqtTitle,
      status: data.rqtStatus == "" ? null : [data.rqtStatus],
      requestType: data.rqtType == "" ? null : [data.rqtType],
      service: data.rqtService == "" ? null : [data.rqtService],
      createdFrom: data.rqtCreateFr,
      createdTo: data.rqtCreateTo,
      isIncident: data.rqtIsIncident,
    };
    // console.log(data);
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      await axiosInstance
        .post(filterTicketUrl, queryDto, headers)
        .then((response) => {
          //console.log(response.data);
          const data = response.data.map((item, i) => ({
            stt: i,
            id: item.ticketId,
            type: item.isIncident ? "Issue Abnormal" : item.serviceItemName,
            title: item.title,
            status: item.status,
            createAt: new Date(item.createdAt).toLocaleString("en-US", options),
          }));
          setTicketData(data);
        })
        .catch((error) => {
          const result = Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
          });
        });
      const minimumLoadingTime = 3000; // Minimum loading time in milliseconds
      const endTime = new Date().getTime() + minimumLoadingTime;
      const remainingTime = endTime - new Date().getTime();
      if (remainingTime > 0) {
        setTimeout(() => {
          Swal.close(); // Close loading popup
          // Optionally, show a success message using Swal.fire
        }, remainingTime);
      } else {
        Swal.close(); // Close loading popup immediately
      }
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
    <div className="detail-request-container w-full h-full py-5 bg-[#294a8d] mt-3 overflow-y-scroll">
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
            <div className="detail-request-header-right">
              <Link to={"/catalog"}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Create Request Ticket
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-5 w-full h-full">
          <div className="form-search flex items-center justify-center w-full">
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
                      maxLength: {
                        value: 500,
                        message: "This field must less than 500 characters",
                      },
                    })}
                  />
                </div>
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtStatus"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Status
                  </label>
                  <select
                    id={`rptstatus`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("rqtStatus")}
                  >
                    <option value={null}></option>
                    <option value="Open">Open</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
              </div>
              <div className=" flex items-center justify-between">
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtType"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Request Type
                  </label>
                  <select
                    id={`rqtType`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("rqtType")}
                  >
                    <option value={null}></option>
                    {requestTypeData.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtService"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Services
                  </label>
                  <select
                    id={`rqtService`}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("rqtService")}
                  >
                    <option value={null}></option>
                    {serviceData.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className=" flex items-center justify-between">
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtCreateFr"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Create From
                  </label>
                  <input
                    type="date"
                    id="rqtCreateFr"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder=""
                    max={today}
                    {...register("rqtCreateFr", {})}
                  />
                </div>
                <div className="mb-2 w-[40%]">
                  <label
                    htmlFor="rqtCreateTo"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Create To
                  </label>
                  <input
                    type="date"
                    id="rqtCreateTo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    {...register("rqtCreateTo", {})}
                  />
                </div>
              </div>
              <div className="mb-2 w-[50%] flex items-center">
                <label
                  htmlFor="rqtIsIncident"
                  className="inline-block text-sm font-medium text-gray-500 "
                >
                  Is Incident
                </label>
                <input
                  type="checkbox"
                  id="rqtIsIncident"
                  className="ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                  {...register("rqtIsIncident", {})}
                />
              </div>
              <div className="m-auto w-[50%] flex items-center justify-between ">
                <button
                  type="submit"
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center "
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={resetConditionfilter}
                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center "
                >
                  Reset Condition
                </button>
              </div>
            </form>
          </div>
          <div className="grid-data mt-10">
            <DataGrid
              rows={ticketData}
              columns={columns}
              onRowClick={handleRowClick}
              pagination
              pageSize={30} // Set the maximum number of rows per page
              rowsPerPageOptions={[5, 10, 20]} // Optionally set available page size options
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterRequest;
