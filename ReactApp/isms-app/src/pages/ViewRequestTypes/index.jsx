import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import * as Icon from "../../components/Elements/Icon";
function ViewRequestTypes() {
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "type", headerName: "Request Type", width: 200 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "status", headerName: "Status", width: 200 },
  ];

  const rows = [
    {
      id: 1,
      type: "Computers",
      title: "Doe",
      status: "Done",
      requestTypeId: 1,
    },
    {
      id: 2,
      type: "Computers",
      title: "Smith",
      status: "Done",
      requestTypeId: 2,
    },
    {
      id: 3,
      type: "Computers",
      title: "Johnson",
      status: "Done",
      requestTypeId: 1,
    },
  ];
  const requestTypes = [
    { id: 1, name: "Computer Broken" },
    { id: 2, name: "New Account" },
    { id: 3, name: "New Password" },
  ];

  //Handle search request type
  const handleFilterChange = (e) => {
    const keyword = e.target.value;
    const filteredData = rows.filter((row) =>
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
    const keyword = e.target.value.toLowerCase();

    const filteredData = rows.filter(
      (row) => !keyword || row.requestTypeId == keyword
    );

    setFilteredRows(filteredData);
  };
  const handleRowClick = (params) => {
    const { id } = params.row;

    navigate("/viewDetails/" + id);
  };
  const [filteredRows, setFilteredRows] = useState(rows);
  return (
    <div className="request-types-container pb-4 w-full h-full bg-[#3E5481] bg-blend-lighten">
      <div className="request-types-section mx-auto max-w-7xl ">
        {/* HEADER SECTION*/}
        <div className="request-types-header w-full text-white ">
          <nav className="request-types-header-nav pt-3 pb-1 ">
            <ul className="header-nav-content flex items-center text-[18px]">
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url" to="/">
                  <UnderlineAnimation className="">Home</UnderlineAnimation>
                </Link>
              </li>

              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url ">
                  <UnderlineAnimation>Service Requests</UnderlineAnimation>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="request-types-header-content pb-2 flex items-center">
            <div className="request-types-header-icon">
              <Icon.BsFillInfoSquareFill className="h-[50px] w-[50px]" />
            </div>
            <div className="request-types-header-description ml-5 w-1/2">
              <h4 className="text-2xl font-bold">Service Requests</h4>
              <span className="">
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
              <div className="search-section  w-1/3">
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
                      className="block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
                    className="bg-gray-50 px-4 py-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option value="">Choose Request Type</option>
                    {requestTypes.map((item, i) => {
                      return (
                        <option key={i} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="request-type-add w-1/3 self-center">
                  <Link to={"/createRequestType"}>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2"
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
              pageSize={5}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewRequestTypes;
