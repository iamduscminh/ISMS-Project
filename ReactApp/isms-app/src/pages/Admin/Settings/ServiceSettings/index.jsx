import React, {useState} from "react";
import ServiceGroup from "../../../../components/Elements/ServiceGroup";
import {AiFillPlusCircle} from 'react-icons/ai';

const ServiceSettings = () => {
  //Data cho List Service được lấy từ DB lên
  const [listService, setListService] = useState([
    {
      id: 1,
      serviceName: 'Logins and Accounts',
      serviceDes: 'Service Login and Account is a comprehensive system that enables users to access and manage their accounts on a particular platform or website',
      requestType: [
        {
          id: 1,
          name: "Request a new account",
          icon: "AiFillCustomerService",
        },
        {
          id: 2,
          name: "Fix an Account Problem",
          icon: "AiFillCustomerService",
        },
      ]
    },
    {
      id: 2,
      serviceName: 'Computers',
      serviceDes: 'Service Computers is a comprehensive system that offers a wide range of solutions and support for computer-related issues and tasks',
      requestType: [
        {
          id: 3,
          name: "Report broken Hardware",
          icon: "AiFillCustomerService",
        }
      ]
    }
  ])


  return (
    <div>
      <div className="relative w-full h-[5vh] bg-[#42526E] pl-[3rem] flex items-center">
        <h1 className="text-[1.25rem] text-[#fff] font-medium">
          Service Groups Setting
        </h1>
      </div>
      <div className="w-full mt-[1rem] flex items-center justify-center">
        <div className="">
          <p className=" w-[45vw] text-[#42526E] cursor-default">
            Help customers find the right forms quickly by organizing your
            portal groups. Forms that aren't assigned to a group will be hidden
            from your customer portal.
          </p>
          <div className="mt-[3rem]">
            {listService.map((item)=>(
              <ServiceGroup key={item.id} service={item}/>
            ))}
          </div>
          <div className="bg-[#f0f0f0] w-[45vw] px-[2rem] py-[0.75rem] rounded-sm border border-[#abadb0] mt-[0.5rem] flex items-center justify-center cursor-pointer">
            <div className="flex items-center text-[1rem] text-[#42526E]">
              <AiFillPlusCircle/>
              <span className="ml-[1rem]">Create Service Group</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSettings;
