import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import image from "../../../assets/images";
import CustomCombobox from "../../../components/Elements/CustomCombobox";
import ServiceTypeItem from "../../../components/Elements/CustomCombobox/ServiceTypeItem";
import PriorityItem from "../../../components/Elements/CustomCombobox/PriorityItem";
import TicketStatus from "../../../components/Elements/TicketStatus";
import { MdKeyboardArrowDown, MdElectricalServices } from "react-icons/md";
import { RiComputerLine } from 'react-icons/ri';
import{SiMicrosoftword, SiMicrosoftexcel} from 'react-icons/si';
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";

const TicketDetail = () => {
  const { ticketId } = useParams();

  //Value cho Service của Ticket
  const [ticketService, setTicketService] = useState({
    id: 1,
    icon: <MdElectricalServices />,
    serviceName: "Hardware Service",
  });

  //Value cho Service của Ticket
  const [priority, setPriority] = useState({
    id: 1,
    icon: <FcHighPriority />,
    priority: "High",
  });

  //Data cho Service Combobox
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

  //Data cho priority Combobox
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

  const handleServiceTypeSelect = (selectedItem) => {
    console.log("Selected Service Type:", selectedItem);
    setTicketService(selectedItem.serviceName);
  };

  const handlePrioritySelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setPriority(selectedItem.priority);
  };
  return (
    <div className="flex flex-col w-[full] h-[90vh]">
      <div className="h-[5%] bg-[#42526E] flex text-[#ffF] font-medium text-[1rem] justify-start items-center pl-[3rem]">
        <IoIosArrowBack className="text-[1.25rem] mr-[0.75rem] cursor-pointer" />
        <div>
          <span className="mr-[3rem]">Back</span>
        </div>
        <div>
          <span className="mr-[0.5rem]">TICKET-1:</span>
          <span>Demo test Service Ticket</span>
        </div>
      </div>
      <div className="w-[full] px-[1rem] py-[1rem] flex">
        <div className="w-[35%]">
          <div className="w-[full] bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
            <div className="w-[full] flex items-center justify-start">
              <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden mr-[1rem]">
                <img
                  className="w-full h-full object-cover object-center"
                  src={image.avatar3}
                  alt=""
                />
              </div>
              <a className="text-[1.15rem] mr-[0.5rem] cursor-pointer text-[#043ac5]">
                Calyrex
              </a>
              <h3 className="text-[1.15rem]">create this Request</h3>
            </div>

            <div className="mt-[1.75rem]">
              <h3 className="text-[1.25rem] font-medium text-[#42526E] mb-[0.75rem]">
                Description
              </h3>
              <p className="text-[#747272] text-[1rem]">
                My computer is broken, I want a new computer with the same
                configuration as the old one
              </p>
            </div>

            <CustomCombobox
              component={ServiceTypeItem}
              data={serviceData}
              onSelect={handleServiceTypeSelect}
              value={ticketService}
              overlay={3}
              showProp1="icon"
              showProp2="serviceName"
              wrapper="FF7452"
            />
          </div>
          <div className="mt-[1.5rem] w-[full] bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
            <div className="flex justify-between items-center">
              <h4 className="text-[#42526E] text-[1.25rem] font-medium">Priority</h4>
              <div className="w-[50%]">
                <CustomCombobox
                  component={PriorityItem}
                  data={priorityData}
                  onSelect={handlePrioritySelect}
                  value={priority}
                  overlay={2}
                  showProp1="icon"
                  showProp2="priority"
                />
              </div>
            </div>

            <div className="mt-[1.5rem] flex flex-col">
              <div>
                <h4 className="text-[1.1rem] text-[#42526E] font-medium">Time to Resolution SLA</h4>
                <div className="flex items-center justify-start text-[#747272] mt-[0.5rem]">
                  <span>July 12 2023 04:20 AM</span>
                  <span className="ml-[1rem]">4h00 to due</span>
                </div>
              </div>
            </div>

            <div className="mt-[1.5rem] flex flex-col">
              <div>
                <h4 className="text-[1.1rem] text-[#42526E] font-medium">Time to first response SLA</h4>
                <div className="flex items-center justify-start text-[#747272] mt-[0.5rem]">
                  <span>July 12 2023 02:20 AM</span>
                  <span className="ml-[1rem]">2h00 to due</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="w-[25%] ml-[1rem]">
          <div className="w-[full] bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
            <div>

              <div className="flex items-center mt-[1rem]">
                <h3 className="text-[#42526E] w-[40%] font-medium">Assignee</h3>
                <div style={{ display: "flex", alignItems: "center", marginLeft: '0.5rem' }}>
                  <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden cursor-pointer"><img className="w-full h-full object-cover object-center" src={image.avatar3} alt="" /></div>
                  <div className="ml-[0.5rem]"><span className="text-[#747272]"><a href="#">Calyrex</a></span></div>
                </div>
              </div>

              <div className="flex items-center mt-[1rem]">
                <h3 className="text-[#42526E] w-[40%] font-medium">Reporter</h3>
                <div style={{ display: "flex", alignItems: "center", marginLeft: '0.5rem' }}>
                  <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden cursor-pointer"><img className="w-full h-full object-cover object-center" src={image.avatar4} alt="" /></div>
                  <div className="ml-[0.5rem]"><span className="text-[#747272]"><a href="#">Spectrier</a></span></div>
                </div>
              </div>

              <div className="flex items-center mt-[1rem]">
                <h3 className="text-[#42526E] w-[40%] font-medium">Request Type</h3>
                <div style={{ display: "flex", alignItems: "center", marginLeft: '0.5rem' }}>
                  <RiComputerLine className="cursor-pointer" />
                  <div className="ml-[0.5rem]"><span className="text-[#747272]"><a href="#">Laptop Broken Problem</a></span></div>
                </div>
              </div>

              <div className="flex mt-[1rem]">
                <h3 className="text-[#42526E] w-[40%] font-medium">Related Docs</h3>
                <div className="flex flex-col">
                  <div style={{ display: "flex", alignItems: "center", marginLeft: '0.5rem' }}>
                    <SiMicrosoftword className="cursor-pointer text-[#295296]" />
                    <div className="ml-[0.5rem]"><span className="text-[#747272]"><a href="#">document1.docx</a></span></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", marginLeft: '0.5rem', marginTop: '0.5rem'  }}>
                    <SiMicrosoftword className="cursor-pointer text-[#295296]" />
                    <div className="ml-[0.5rem]"><span className="text-[#747272]"><a href="#">document2.docx</a></span></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", marginLeft: '0.5rem', marginTop: '0.5rem' }}>
                    <SiMicrosoftexcel className="cursor-pointer text-[#005b38]" />
                    <div className="ml-[0.5rem]"><span className="text-[#747272]"><a href="#">document3.xlsx</a></span></div>
                  </div>
                </div>
              </div>

            </div>
            <div className="w-[full] mt-[3rem] mb-[1rem]">
              <TicketStatus/>
            </div>
          </div>
        </div>
        <div className="w-[40%]">
          <div>4</div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
