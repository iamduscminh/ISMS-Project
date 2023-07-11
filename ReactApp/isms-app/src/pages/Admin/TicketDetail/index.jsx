import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import image from "../../../assets/images";
import CustomCombobox from "../../../components/Elements/CustomCombobox";
import ServiceTypeItem from "../../../components/Elements/CustomCombobox/ServiceTypeItem";
import { MdKeyboardArrowDown, MdElectricalServices } from "react-icons/md";

const TicketDetail = () => {
  const { ticketId } = useParams();
  const [ticketService, setTicketService] = useState({
    id: 1,
    icon: <MdElectricalServices />,
    serviceName: "Hardware Service",
  });
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
  const handleServiceTypeSelect = (selectedItem) => {
    console.log("Selected Service Type:", selectedItem);
    setTicketService(selectedItem.serviceName);
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
                  src={image.avatar2}
                  alt=""
                />
              </div>
              <a className="text-[1.15rem] mr-[0.5rem] cursor-pointer text-[#043ac5]">
                Tu Doan
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
              ticketService={ticketService}
            />
          </div>
          <div>2</div>
        </div>
        <div className="w-[25%]">
          <div>3</div>
        </div>
        <div className="w-[40%]">
          <div>4</div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
