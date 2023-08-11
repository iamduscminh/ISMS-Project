import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./TicketQuery.module.scss";
import FilterCondition from "../../../components/Elements/FilterCondition";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { URL } from "../../../utils/Url";

const cx = classNames.bind(styles);
const TicketQuery = () => {
  const navigate = useNavigate();
  const { type, mode, queryId } = useParams();
  const axiosInstance = useAxiosPrivate();

  if (!type) navigate("/admin");

  let queryData;

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
      description: null,
      createdFrom: null,
      createdTo: null,
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
      description: null,
      createdFrom: null,
      createdTo: null,
    };
  }
  const [queryCondition, setQueryCondition] = useState(queryData);

  const handleTestQuery = () => {
    const testParam = async () => {
      try {
        const response = await axiosInstance.get(`${URL.QUERY_URL}/getall`, {
          params: {
            Assignee: queryData.assignee,
            CreateFrom: queryData.createdFrom,
            CreateTo: queryData.createdTo,
            Description: queryData.description,
            Group: queryData.group,
            Requester: queryData.reporter,
            RequestType: queryData.requestType,
            Priority: queryData.priority,
            Status: queryData.status,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
      } catch (error) {
        alert("Error for get Data: ", error);
      }
    };
    testParam();
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
            />
          </div>
          <div className="mt-[0.75rem]">
            <input type="checkbox" className="w-[1rem] aspect-square" />
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
              <button onClick={handleTestQuery} className="text-[#fff] font-medium border-2 bg-[#043AC5] px-[1rem]">
                Test{" "}
              </button>
              <button className="ml-[1rem] text-[#fff] font-medium border-2 bg-[#42526E] px-[1rem]">
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
