import React, { useState, useLayoutEffect } from "react";
import classNames from "classnames/bind";
import styles from "./FilterCondition.module.scss";
import OrderCombobox from "./OrderCombobox";
import CustomCombobox from "../CustomCombobox";
import PriorityItem from "../CustomCombobox/PriorityItem";
import UserItem from "../CustomCombobox/UserItem";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import TicketStatus from "../TicketStatus";
import ServiceTypeItem from "../CustomCombobox/ServiceTypeItem";
import { MdElectricalServices } from "react-icons/md";
import image from "../../../assets/images";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import PrioritySelection from "./PrioritySelection";
import RequestTypeSelection from "./RequestTypeSelection";
import ServiceSelection from "./ServiceSelection";
import StatusSelection from "./StatusSelection";
import UserSelection from "./UserSelection";
import GroupSelection from "./GroupSelection";
import Swal from "sweetalert2";
const priorityData = [
  {
    id: 1,
    icon: <FcHighPriority />,
    priority: "High",
  },
  {
    id: 2,
    icon: <FcMediumPriority />,
    priority: "Medium",
  },
  {
    id: 3,
    icon: <FcLowPriority />,
    priority: "Low",
  },
];

const statusData = [
  {
    id: 1,
    status: "Open",
  },
  {
    id: 2,
    status: "Inprogress",
  },
  {
    id: 3,
    status: "Pending",
  },
  {
    id: 4,
    status: "Resolved",
  },
  {
    id: 5,
    status: "Closed",
  },
  {
    id: 6,
    status: "Canceled",
  },
];
const customStylePriority = {
  marginTop: "mt-[0rem]",
  height: "h-[1rem]",
  fontSize: "text-[1rem]",
  borderRadius: "rounded-none",
};
const customStylesStatus = {
  paddingX: "py-[0rem]",
};
const cx = classNames.bind(styles);
const FilterCondition = ({ queryCondition, setQueryCondition }) => {
  //console.log(queryCondition);
  const [orderValue, setOrderValue] = useState({
    isAsc: true,
    orderBy: "none",
  });

  const [priority, setPriority] = useState({
    id: 1,
    icon: <FcHighPriority />,
    priority: "High",
  });

  const [status, setStatus] = useState({
    id: 1,
    text: "Work in progress",
  });

  const [ticketService, setTicketService] = useState({
    id: 1,
    icon: <MdElectricalServices />,
    serviceName: "Hardware Service",
  });

  const [assignee, setAssignee] = useState({
    id: 2,
    avatar: image.avatar2,
    username: "Calyrex",
  });

  const [reporter, setReporter] = useState({
    id: 3,
    avatar: image.avatar4,
    username: "Spectrier",
  });

  const [createdDate, setCreatedDate] = useState({
    from: null,
    to: null,
  });

  const [summary, setSummary] = useState("");

  const handleChangeOrder = (orderBy, isAsc) => {
    //console.log(orderBy);
    if (orderBy === "None") orderBy = null;
    setQueryCondition((prev) => ({
      ...prev,
      orderBy: orderBy,
      orderASC: isAsc,
    }));
  };

  const handleFromDateChange = (event) => {
    const newFromDate = event.target.value;
    setQueryCondition((prev) => ({ ...prev, createdFrom: newFromDate }));
  };

  const handleToDateChange = (event) => {
    const newToDate = event.target.value;
    setQueryCondition((prev) => ({ ...prev, createdTo: newToDate }));
  };

  const handlePrioritySelect = (selectedItem) => {
    setQueryCondition((prev) => ({ ...prev, priority: selectedItem }));
  };

  const handleStatusSelect = (selectedItem) => {
    setQueryCondition((prev) => ({ ...prev, status: selectedItem }));
  };

  const handleRequestTypeSelect = (selectedItem) => {
    setQueryCondition((prev) => ({
      ...prev,
      requestType: selectedItem.map((obj) => obj["serviceItemId"]),
    }));
  };

  const handleServiceSelect = (selectedItem) => {
    setQueryCondition((prev) => ({
      ...prev,
      service: selectedItem.map((obj) => obj["serviceCategoryId"]),
    }));
  };

  const handleAssigneeSelect = (selectedItem) => {
    setQueryCondition((prev) => ({
      ...prev,
      assignee: selectedItem.map((obj) => obj["userId"]),
    }));
  };

  const handleReporterSelect = (selectedItem) => {
    setQueryCondition((prev) => ({
      ...prev,
      reporter: selectedItem.map((obj) => obj["userId"]),
    }));
  };

  const handleGroupSelect = (selectedItem) => {
    setQueryCondition((prev) => ({
      ...prev,
      group: selectedItem.map((obj) => obj["groupId"]),
    }));
  };

  const handleChangeSummary = (e) => {
    setQueryCondition((prev) => ({ ...prev, titleSearch: e.target.value }));
  };
  const renderQueryStatement = () => {
    return `pri = (${priority.priority}) AND sts = (${status.text}) AND sv = (${ticketService.serviceName}) AND sum = ${summary} AND rp = ${reporter.id} AND as = ${assignee.id} from ${createdDate.from} to ${createdDate.to} ${orderValue.orderBy} ${orderValue.isAsc}`;
  };

  function getCurrentDate(subtractMonth) {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1 - subtractMonth)
      .toString()
      .padStart(2, "0"); // Tháng bắt đầu từ 0
    const day = today.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="mt-[0.75rem]">
      <div className="flex">
        <h3 className="text-[#42526E] font-medium text-[1rem] mr-[3rem]">
          Order by
        </h3>
        <OrderCombobox onSelect={handleChangeOrder} data={queryCondition} />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-[0.8rem]">
        {/*Priority Condition*/}
        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Priority
          </div>
          <div className="m-auto w-[70%] ">
            <PrioritySelection
              priorityData={priorityData}
              data={queryCondition}
              onSelect={handlePrioritySelect}
            />
          </div>
        </div>

        {/*Status Condition*/}
        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Status
          </div>
          <div className="m-auto w-[70%] ">
            <StatusSelection
              statusData={statusData}
              data={queryCondition}
              onSelect={handleStatusSelect}
            />
          </div>
        </div>

        {/*RequestType Condition */}
        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Request Type
          </div>
          <div className="m-auto w-[70%] ">
            <RequestTypeSelection
              data={queryCondition}
              onSelect={handleRequestTypeSelect}
            />
          </div>
        </div>

        {/*Service Condition */}
        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Service
          </div>
          <div className="m-auto w-[70%] ">
            <ServiceSelection
              data={queryCondition}
              onSelect={handleServiceSelect}
            />
          </div>
        </div>

        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Assignee
          </div>
          <div className="m-auto w-[70%] ">
            <UserSelection
              data={queryCondition.assignee}
              onSelect={handleAssigneeSelect}
            />
          </div>
        </div>

        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Reporter
          </div>
          <div className="m-auto w-[70%] ">
            <UserSelection
              data={queryCondition.reporter}
              onSelect={handleReporterSelect}
            />
          </div>
        </div>

        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Group
          </div>
          <div className="m-auto w-[70%] ">
            <GroupSelection
              data={queryCondition}
              onSelect={handleGroupSelect}
            />
          </div>
        </div>

        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Summary
          </div>
          <div className="m-auto w-[70%] flex items-center justify-center">
            <span className="font-medium mr-[1rem]">Contain</span>
            <input
              defaultValue={queryCondition.titleSearch}
              className="rounded-md border-2 border-[#D9D9D9] px-[1rem] text-[0.7rem] py-[0.1rem]"
              type="text"
              onChange={handleChangeSummary}
            />
          </div>
        </div>

        <div className="w-[90%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Created
          </div>
          <div className="m-auto w-[70%] items-center pl-[1rem]">
            <input
              onChange={handleFromDateChange}
              value={queryCondition.createdFrom || getCurrentDate(1)}
              className="w-[40%] rounded-md border-2 border-[#D9D9D9] px-[1rem] text-[0.7rem] py-[0.1rem]"
              type="date"
            />
            <span>-</span>
            <input
              onChange={handleToDateChange}
              value={queryCondition.createdTo || getCurrentDate(0)}
              className="w-[40%] rounded-md border-2 border-[#D9D9D9] px-[1rem] text-[0.7rem] py-[0.1rem]"
              type="date"
            />
          </div>
        </div>
      </div>
      {/* <div className="flex mt-[1rem]">
        <h2 className="text-[#42526E] font-medium text-[1rem] mr-[1rem]">
          Query Statement
        </h2>
        <input
          type="text"
          className="w-[80%] rounded-md border-2 border-[#D9D9D9] px-[1rem] text-[0.7rem] py-[0.1rem]"
          value={renderQueryStatement()}
          readOnly
        />
      </div> */}
    </div>
  );
};

export default FilterCondition;
