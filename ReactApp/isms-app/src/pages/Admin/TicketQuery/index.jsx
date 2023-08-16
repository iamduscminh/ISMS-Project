import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./TicketQuery.module.scss";
import FilterCondition from "../../../components/Elements/FilterCondition";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { URL } from "../../../utils/Url";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
const cx = classNames.bind(styles);
const TicketQuery = () => {
  const navigate = useNavigate();
  const { type, mode, queryId } = useParams();
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();
  if (!type) navigate("/admin");
  console.log(type);
  //API CONFIG
  const token = auth?.accessToken;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };
  let queryData;
  function getCurrentDate(subtractMonth) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1 - subtractMonth)
      .toString()
      .padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  if (mode === "edit") {
    queryData = {
      orderBy: null,
      orderASC: true,
      priority: ["High", "Medium"],
      status: [],
      requestType: [],
      service: [],
      assignee: [],
      reporter: [],
      group: [],
      titleSearch: null,
      createdFrom: getCurrentDate(1),
      createdTo: getCurrentDate(0),
    };
  } else {
    queryData = {
      orderBy: null,
      orderASC: true,
      priority: [],
      status: [],
      requestType: [],
      service: [],
      assignee: [],
      reporter: [],
      group: [],
      titleSearch: null,
      createdFrom: getCurrentDate(1),
      createdTo: getCurrentDate(0),
    };
  }
  const [queryCondition, setQueryCondition] = useState(queryData);
  const [isCheckedTeamQuery, setIsCheckedTeamQuery] = useState(false);
  const [titleQuery, setTitleQuery] = useState("");

  const handleTitleQueryChange = (event) => {
    setTitleQuery(event.target.value);
  };
  const handleCheckboxQueryChange = (event) => {
    setIsCheckedTeamQuery(event.target.checked);
  };
  const handleTestQuery = () => {
    console.log(JSON.stringify(queryCondition));
    // const testParam = async () => {
    //   try {
    //     const response = await axiosInstance.get(`${URL.QUERY_URL}/getall`, {
    //       OrderyBy: queryData.orderBy,
    //       OrderASC: queryData.orderASC,
    //       Priority: queryData.priority,
    //       Status: queryData.status,
    //       RequestType: queryData.requestType,
    //       Service: queryData.service,
    //       Assignee: queryData.assignee,
    //       Reporter: queryData.reporter,
    //       Group: queryData.group,
    //       Description: queryData.description,
    //       CreateTo: queryData.createdTo,
    //       CreateFrom: queryData.createdFrom,
    //     });
    //     console.log(response.data);
    //   } catch (error) {
    //     alert("Error for get Data: ", error);
    //   }
    // };
    // testParam();
  };
  const handleUpdateQuery = () => {
    console.log(JSON.stringify(queryCondition));
    const apiUpdateQueryUrl =
      mode === "edit" ? `${URL.QUERY_URL}/update` : `${URL.QUERY_URL}/create`;
    //console.log(reasonCancelRef.current.value);
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const queryDto = {
        queryName: titleQuery,
        queryStatement: JSON.stringify(queryCondition),
        isTeamQuery: isCheckedTeamQuery,
        userId: auth?.userId,
        queryType: type,
      };

      axiosInstance
        .post(apiUpdateQueryUrl, queryDto, headers)
        .then((response) => {
          console.log(response.data);

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Request Ticket was canceled successfully.",
            confirmButtonText: "OK",
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
    <div>
      <div className="w-full h-[18vh] bg-[#42526E]">
        <div className="ml-[8rem] pt-[0.8rem]">
          <div className="text-[1rem] text-[#fff] font-medium">
            {type} Query
          </div>
          <div>
            <input
              type="text"
              placeholder="Query Title"
              className={cx("query-input")}
              onChange={handleTitleQueryChange}
            />
          </div>
          <div className="mt-[0.75rem]">
            <input
              type="checkbox"
              className="w-[1rem] aspect-square"
              onChange={handleCheckboxQueryChange}
            />
            <span className="text-[1rem] text-[#fff] ml-[1rem]">
              Add this queue to Team Important Query
            </span>
          </div>
        </div>
      </div>
      <div>
        {/* filter conditions */}
        <div className="ml-[8rem] mt-[1rem] w-[full]">
          <div className="flex justify-between items-center">
            <h2 className="text-[#42526E] font-medium text-[1.25rem] ">
              Filter Conditions
            </h2>
            <div className="mr-[10rem]">
              <button
                onClick={handleTestQuery}
                className="text-[#fff] font-medium border-2 bg-[#043AC5] px-[1rem]"
              >
                Test
              </button>
              <button
                onClick={handleUpdateQuery}
                className="ml-[1rem] text-[#fff] font-medium border-2 bg-[#42526E] px-[1rem]"
              >
                {mode}
              </button>
              <button
                onClick={() => {
                  navigate("/admin");
                }}
                className="ml-[1rem] text-[#42526E] font-medium border-2 border-[#42526E] px-[1rem]"
              >
                Cancel
              </button>
            </div>
          </div>
          <FilterCondition
            queryCondition={queryCondition}
            setQueryCondition={setQueryCondition}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketQuery;
