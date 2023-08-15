import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import IconTag from "../../components/Elements/IconTag";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ViewRequestTypes() {
  const { auth } = useAuth();
  const axiosInstance = useAxiosPrivate();
  const navigate = useNavigate();
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const token = auth?.accessToken;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };

  const [services, setServices] = useState([]);
  const [requestTypes, setRequestTypes] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "requestType", headerName: "Request Type", width: 350 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "serviceName", headerName: "Service", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    //{ field: "createAt", headerName: "Create At", width: 200 },
  ];

  //Handle search request type
  const handleFilterChange = (e) => {
    const keyword = e.target.value;
    const filteredData = requestTypes.filter((row) =>
      Object.values(row).some(
        (value) =>
          (typeof value === "string" &&
            value.toLowerCase().includes(keyword)) ||
          (typeof value === "number" && value.toString().includes(keyword))
      )
    );
    setFilteredRows(filteredData);
  };
  //Handle combobox request type
  const handleFilterRequestTypeChange = (e) => {
    const keyword = e.target.value;
    const filteredData = requestTypes.filter(
      (row) => !keyword || row.serviceId == keyword
    );

    setFilteredRows(filteredData);
  };
  const handleRowClick = (params) => {
    const { id } = params.row;
    navigate("/requestType/" + id);
  };

  useEffect(() => {
    const apiGetSvcCategoryUrl = "api/ServiceCategories/getall";
    const apiGetRequestTypesUrl = "api/ServiceItems/getall";
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get serrvices
        axiosInstance
          .get(apiGetSvcCategoryUrl, { headers })
          .then((response) => {
            const data = response.data.map((item, i) => ({
              id: item.serviceCategoryId,
              name: item.serviceCategoryName,
            }));
            setServices(data);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          });
        Swal.close();

        //-------------Get request type
        axiosInstance
          .get(apiGetRequestTypesUrl, { headers })
          .then((response) => {
            console.log(response.data);
            const data = response.data.map((item, i) => ({
              id: item.serviceItemId,
              requestType: item.serviceItemName,
              description: item.description,
              serviceId: item?.serviceCategoryEntity?.serviceCategoryId,
              serviceName: item?.serviceCategoryEntity?.serviceCategoryName,
              iconDisplay: item?.iconDisplay,
              createAt: item.createAt,
              status: item.status,
            }));
            // id: 1,
            // requestType: "Fix a account problem",
            // description:
            //   "Having trouble accessing certain websites or systems? We'll help you out",
            // service: "Logins and Accounts",
            setRequestTypes(data);
            setFilteredRows(data);
            //console.log(requestTypesBySvc);
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
  return (
    <div className="request-types-container pb-4 w-full h-full bg-[#fff] bg-blend-lighten overflow-y-scroll">
      <div className="request-types-section">
        {/* HEADER SECTION*/}
        <div className="request-types-header w-full text-white bg-[#42526E]">
          <nav className="request-types-header-nav pt-3 pb-1 ">
            <ul className="header-nav-content flex items-center text-[1rem] ml-[1.25rem]">
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
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url ">Service Requests</Link>
              </li>
            </ul>
          </nav>
          <div className="request-types-header-content pb-2 flex items-center ml-[1.25rem]">
            <div className="request-types-header-icon">
              <IconTag
                name={"BsFillInfoSquareFill"}
                className="h-[50px] w-[50px]"
              />
            </div>
            <div className="request-types-header-description ml-5 w-1/2">
              <h4 className="text-2xl font-bold">Service Requests</h4>
              <span className="text-[0.9rem]">
                Customize the types of service requests in the system. Make
                these request types available in your system portal by editing
                your request type group.
              </span>
            </div>
          </div>
        </div>
        {/* REQUEST TYPE LIST SECTION*/}
        <div className=" w-full min-h-screen p-6 bg-white rounded shadow ">
          <div className="request-tickets-ctn ">
            <div className="top-menu flex justify-between">
              <div className="search-section w-1/3">
                <form className="mb-3">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only "
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      onChange={handleFilterChange}
                      id="default-search"
                      className="block w-full px-[1rem] py-[0.5rem] pl-[1.75rem] text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search..."
                    />
                  </div>
                </form>
              </div>
              <div className="flex justify-between w-3/5">
                <div className="request-type-section w-2/5">
                  <select
                    id="countries"
                    defaultValue=""
                    onChange={handleFilterRequestTypeChange}
                    className="bg-gray-50 px-[1rem] py-[0.5rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Choose Service</option>
                    {services.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="request-type-add w-1/3 self-center">
                  <Link to={"/requestType/0"}>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-[1rem] py-[0.5rem] mr-2 mb-2"
                    >
                      Create Request Type
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[20]}
              onRowClick={handleRowClick}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRequestTypes;
