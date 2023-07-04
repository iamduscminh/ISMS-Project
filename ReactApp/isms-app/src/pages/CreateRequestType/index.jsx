import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlineRight } from "react-icons/ai";
import { BsFillInfoSquareFill } from "react-icons/bs";
import UnderlineAnimation from "../../components/Animation/UnderlineText";

function CreateRequestType() {
  const navigate = useNavigate();

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
                  <AiOutlineRight />
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
              <BsFillInfoSquareFill className="h-[50px] w-[50px]" />
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
          <div className="request-tickets-ctn "></div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequestType;
