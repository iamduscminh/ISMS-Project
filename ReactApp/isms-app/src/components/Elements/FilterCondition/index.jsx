import React, { useState } from "react";
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
import AdminTicketGrid from "../AdminTicketGrid";

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

const serviceData = [
  {
    id: 1,
    icon: <MdElectricalServices />,
    serviceName: "Hardware Service",
  },
  {
    id: 2,
    icon: <MdElectricalServices />,
    serviceName: "Account Service",
  },
];

const userData = [
  {
    id: 1,
    avatar: image.avatar2,
    username: "Tu Doan",
  },
  {
    id: 2,
    avatar: image.avatar3,
    username: "Calyrex",
  },
  {
    id: 3,
    avatar: image.avatar4,
    username: "Spectrier",
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
const FilterCondition = () => {
  const [orderValue, setOrderValue] = useState({
    isAsc: true,
    orderBy :'none'
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
    from: '2023-07-14', 
    to: '2023-07-15'
  });

  const [summary, setSummary] = useState('');

  const handleChangeOrder = ({orderBy, isAsc})=>{
    setOrderValue({
      orderBy: orderBy,
      isAsc: isAsc
    })
  }

  const handleFromDateChange = (event) => {
    const newFromDate = event.target.value;
    console.log(newFromDate)
    setCreatedDate((prevDate) => ({
      ...prevDate,
      from: newFromDate
    }));
  };

  const handleToDateChange = (event) => {
    const newToDate = event.target.value;
    setCreatedDate((prevDate) => ({
      ...prevDate,
      to: newToDate
    }));
  };

  const handlePrioritySelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setPriority(selectedItem);
  };

  const handleStatusSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setPriority(selectedItem);
  };

  const handleServiceTypeSelect = (selectedItem) => {
    console.log("Selected Service Type:", selectedItem);
    setTicketService(selectedItem);
  };

  const handleAssigneeSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setAssignee(selectedItem);
  };

  const handleAssigneeReporter = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setReporter(selectedItem);
  };

  const handleChangeSummary = (e) => {
    setSummary(e.target.value)
  }
  const renderQueryStatement = () =>{
    return `pri = (${priority.priority}) AND sts = (${status.text}) AND sv = (${ticketService.serviceName}) AND sum = ${summary} AND rp = ${reporter.id} AND as = ${assignee.id} from ${createdDate.from} to ${createdDate.to} ${orderValue.orderBy} ${orderValue.isAsc}`
  }
  return (
    <div className="mt-[0.75rem]">
      <div className="flex">
        <h3 className="text-[#42526E] font-medium text-[1rem] mr-[3rem]">
          Order by
        </h3>
        <OrderCombobox onSelect={handleChangeOrder} data={orderValue}/>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-[0.8rem]">
        <div className="w-[70%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Priority
          </div>
          <div className="m-auto w-[70%] ">
            <CustomCombobox
              component={PriorityItem}
              data={priorityData}
              onSelect={handlePrioritySelect}
              value={priority}
              overlay={10}
              showProp1="icon"
              showProp2="priority"
              customStyle={customStylePriority}
            />
          </div>
        </div>

        <div className="w-[70%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Status
          </div>
          <div className="m-auto w-[70%] ">
            <TicketStatus
              currentStatus={status}
              onSelect={handleStatusSelect}
              customStyles={customStylesStatus}
            />
          </div>
        </div>

        <div className="w-[70%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Service
          </div>
          <div className="m-auto w-[70%] ">
            <CustomCombobox
              component={ServiceTypeItem}
              data={serviceData}
              onSelect={handleServiceTypeSelect}
              value={ticketService}
              overlay={3}
              showProp1="icon"
              showProp2="serviceName"
              wrapper="FF7452"
              customStyle={customStylePriority}
            />
          </div>
        </div>

        <div className="w-[70%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Summary
          </div>
          <div className="m-auto w-[70%] flex items-center justify-center">
            <span className="font-medium mr-[1rem]">Contain</span>
            <input
              className="rounded-md border-2 border-[#D9D9D9] px-[1rem] text-[0.7rem] py-[0.1rem]"
              type="text"
              onChange={handleChangeSummary}
            />
          </div>
        </div>

        <div className="w-[70%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Assignee
          </div>
          <div className="m-auto w-[70%] ">
            <CustomCombobox
              component={UserItem}
              data={userData}
              onSelect={handleAssigneeSelect}
              value={assignee}
              overlay={4}
              showProp1="avatar"
              showProp2="username"
              customStyle={customStylePriority}
            />
          </div>
        </div>

        <div className="w-[70%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Reporter
          </div>
          <div className="m-auto w-[70%] ">
            <CustomCombobox
              component={UserItem}
              data={userData}
              onSelect={handleAssigneeReporter}
              value={reporter}
              overlay={4}
              showProp1="avatar"
              showProp2="username"
              customStyle={customStylePriority}
            />
          </div>
        </div>
        <div className="w-[70%] bg-[#DCE4FF] rounded-md flex mt-[0.5rem]">
          <div className="w-[30%] border-r-2 border-r-[#42526E] text-center font-medium text-[#42526E]">
            Created
          </div>
          <div className="m-auto w-[70%] items-center pl-[1rem]">
            <input onChange={handleFromDateChange} value={createdDate.from} className="w-[40%] rounded-md border-2 border-[#D9D9D9] px-[1rem] text-[0.7rem] py-[0.1rem]" type="date" />
            <span>-</span>
            <input onChange={handleToDateChange} value={createdDate.to} className="w-[40%] rounded-md border-2 border-[#D9D9D9] px-[1rem] text-[0.7rem] py-[0.1rem]" type="date" />
          </div>
        </div>
      </div>
      <div className="flex mt-[1rem]">
        <h2 className="text-[#42526E] font-medium text-[1rem] mr-[1rem]">Query Statement</h2>
        <input type="text" className="w-[80%] rounded-md border-2 border-[#D9D9D9] px-[1rem] text-[0.7rem] py-[0.1rem]" value={renderQueryStatement()} readOnly />
      </div>
      <div>
        <AdminTicketGrid/>
      </div>
    </div>
  );
};

export default FilterCondition;
