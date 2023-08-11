import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import * as Icon from "../../components/Elements/Icon";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
function ViewRequests() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();
  const columns = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "id", headerName: "ID", width: 50, hide: true },
    { field: "type", headerName: "Type", width: 200 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "createAt", headerName: "Create At", width: 200 },
  ];
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const [requestTicketData, setrequestTicketData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  useEffect(() => {
    const requester = { requester: auth?.email, requestTicketId: "" };
    const apiGetRequestTicketsUrl = `api/RequestTickets/getalltickets/${requester.requester}/${requester.requestTicketId}`;
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get request tickets
        axiosInstance
          .get(apiGetRequestTicketsUrl)
          .then((response) => {
            const data = response.data.map((item, i) => ({
              stt: i,
              id: item.requestTicketId,
              type: item.isIncident
                ? "Issue Abnormal"
                : item.serviceItemEntity?.serviceItemName,
              title: item.serviceItemEntity?.serviceItemName,
              status: item.status,
              createAt: new Date(item.createdAt).toLocaleString(
                "en-US",
                options
              ),
            }));
            setrequestTicketData(data);
            setFilteredRows(data);
            console.log(response.data);
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
  const handleFilterChange = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = requestTicketData.filter((row) =>
      Object.values(row).some(
        (value) =>
          (typeof value === "string" &&
            value.toLowerCase().includes(keyword)) ||
          (typeof value === "number" && value.toString().includes(keyword))
      )
    );
    setFilteredRows(filteredData);
  };

  const handleRowClick = (params) => {
    const { id } = params.row;

    navigate("/detailRequest/" + id);
  };

  return (
    <div className="view-requests-container w-full h-full py-5 bg-[#294a8d] mt-3">
      <div className="view-requests-section mt-4 mx-auto max-w-7xl bg-white rounded shadow">
        {/* HEADER SECTION*/}
        <div className="view-requests-header w-full bg-[#0e3275] text-white">
          <nav className="view-requests-header-nav px-6 pt-3 pb-3">
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
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url">View Requests</Link>
              </li>
            </ul>
          </nav>
          <div className="view-requests-header-content px-6 pb-3 flex items-center">
            <div className="view-requests-header-icon">
              <Icon.CiViewList className="h-[50px] w-[50px]" />
            </div>
            <div className="view-requests-header-description ml-5">
              <h4 className="text-2xl font-bold">View Requests</h4>
              <span>Views & Filter your request tickets</span>
            </div>
          </div>
        </div>
        {/* REQUEST TICKET LIST SECTION*/}
        <div className="p-5 w-full h-full">
          <div className="request-tickets-ctn">
            <div className="top-menu">
              <div className="search-section">
                <form className="mb-3 w-1/3">
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
                      className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search..."
                    />
                  </div>
                </form>
              </div>
            </div>

            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRequests;
