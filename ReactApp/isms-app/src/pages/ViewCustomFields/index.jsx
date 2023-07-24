import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import useAuth from "../../hooks/useAuth";
import IconTag from "../../components/Elements/IconTag";
import { axiosPrivate } from "../../utils/axiosConfig";
function ViewRequestTypes() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const columns = [
    { field: "stt", headerName: "STT", width: 100 },
    { field: "id", headerName: "ID", width: 100 },
    { field: "fieldCode", headerName: "Field Code", width: 200 },
    { field: "fieldName", headerName: "Field Name", width: 300 },
    { field: "fieldType", headerName: "Filed Type", width: 200 },
    { field: "valType", headerName: "Value Type", width: 200 },
  ];

  //API CONFIG
  const apiUrl = "api/CustomFields/getall";
  const headers = {
    Authorization: `Bearer ${auth?.token}`,
    withCredentials: true,
  };
  const [customFieldRows, setCustomFieldRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState(customFieldRows);
  useEffect(() => {
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });

        await axiosPrivate
          .get(apiUrl, { headers })
          .then((response) => {
            const dataRows = response.data.map((item, i) => ({
              stt: i,
              id: item.customFieldId,
              fieldCode: item.fieldCode,
              fieldName: item.fieldName,
              fieldType: item.fieldType,
              valType: item.valType == "N" ? "Number" : "Text",
            }));
            setCustomFieldRows(dataRows);
            setFilteredRows(dataRows);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
            });

            if (result.isConfirmed) {
              console.log("User confirmed!");
            } else {
              console.log(error + "User canceled!");
            }
          });
        Swal.close();
      } catch (error) {
        // Handle errors if needed
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching data.",
        });
      }
    };
    fetchData();
  }, []);

  //Handle search request type
  const handleFilterChange = (e) => {
    const keyword = e.target.value;
    const filteredData = customFieldRows.filter((row) =>
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

    navigate("/updateCustomField/" + id);
  };
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
                  <IconTag name={"AiOutlineRight"} className={""} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link className="header-nav-url ">
                  <UnderlineAnimation>Custom Fields</UnderlineAnimation>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="request-types-header-content pb-2 flex items-center">
            <div className="request-types-header-icon">
              <IconTag
                name={"BsFillInfoSquareFill"}
                className={"h-[50px] w-[50px]"}
              />
            </div>
            <div className="request-types-header-description ml-5 w-1/2">
              <h4 className="text-2xl font-bold">Custom Fields</h4>
              <span className="">
                Customize the form of each Request Ticket in the system, Custom
                Field with any type depend on purpose of each Request Type.
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
                <div className="request-type-add w-1/3 self-center">
                  <Link to={"/updateCustomField/0"}>
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2"
                    >
                      Create CustomField
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
