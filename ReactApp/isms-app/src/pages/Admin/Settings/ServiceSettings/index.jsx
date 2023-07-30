import React, { useRef, useState } from "react";
import ServiceGroup from "../../../../components/Elements/ServiceGroup";
import { AiFillPlusCircle } from "react-icons/ai";
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';

const ServiceSettings = () => {
  const axiosInstance = useAxiosPrivate();
  //Data cho List Service được lấy từ DB lên
  const [listService, setListService] = useState([
    {
      id: 1,
      serviceName: "Logins and Accounts",
      serviceDes:
        "Service Login and Account is a comprehensive system that enables users to access and manage their accounts on a particular platform or website",
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
      ],
    },
    {
      id: 2,
      serviceName: "Computers",
      serviceDes:
        "Service Computers is a comprehensive system that offers a wide range of solutions and support for computer-related issues and tasks",
      requestType: [
        {
          id: 3,
          name: "Report broken Hardware",
          icon: "AiFillCustomerService",
        },
      ],
    },
  ]);

  //State này lưu trạng thái có đang insert một Group serice mới không
  const [isInsert, setIsInsert] = useState(false);

  //2 Ref để lấy giá trị Input của Service
  const serviceNameRef = useRef(null);
  const serviceDesRef = useRef(null);

  const handleInsertService = (e) => {
    //Lấy giá trị từ Input
    const serviceName = serviceNameRef.current.value;
    const serviceDes = serviceDesRef.current.value;
    console.log(serviceName);
    if(serviceName === '') alert('Service Categories is Require');

    // Create the object to be sent to the backend API
  const newServiceGroup = {
    ServiceCategoryName: serviceName,
    Description: serviceDes,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  
  // Make the API request to insert the new service group
  axiosInstance.post("api/ServiceCategories/create", newServiceGroup)
    .then((response) => {
      // Assuming the API returns the newly created service group data
      const createdServiceGroup = response.data;

      // Update the state with the new service group data
      setListService((prev) => [...prev, createdServiceGroup]);

      // Clear Input
      serviceNameRef.current.value = '';
      serviceDesRef.current.value = '';

      // Đóng trạng thái Insert
      setIsInsert(false);
    })
    .catch((error) => {
      // Handle error if the API request fails
      console.error("Error inserting service group:", error);
      // Optionally, show an error message to the user
    });
  };

  //
  const deleteServiceGroup = (selectedService) =>{
    console.log(selectedService);
    const filterListService = listService.filter(e=>e.id !== selectedService);
    console.log(filterListService);
    setListService(filterListService);
  }
  return (
    <div>
      <div className="relative w-full bg-[#42526E] pl-[5rem] flex justify-start flex-col py-[0.75rem]">
        <h4 className="mb-[0.75rem] text-[#fff] ">Project/Settings/ServiceGroups</h4>
        <h1 className="text-[1.5rem] text-[#fff] font-medium ">
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
            {listService.map((item) => (
              <ServiceGroup key={item.id} service={item} onDeleteService={deleteServiceGroup}/>
            ))}
          </div>
          {!isInsert && (
            <div
              onClick={(e) => setIsInsert(true)}
              className="bg-[#f0f0f0] w-[45vw] px-[2rem] py-[0.75rem] rounded-sm border border-[#abadb0] mt-[0.5rem] flex items-center justify-center cursor-pointer"
            >
              <div className="flex items-center text-[1rem] text-[#42526E]">
                <AiFillPlusCircle />
                <span className="ml-[1rem]">Create Service Group</span>
              </div>
            </div>
          )}

          {/* Div này là insert Serice group mới*/}
          {isInsert && (
            <div className="bg-[#fff] w-[45vw] px-[2rem] py-[0.75rem] rounded-sm border border-[#abadb0] mt-[0.5rem]">
              <div className="flex justify-between items-center">
                <input
                  ref={serviceNameRef}
                  placeholder="Enter Service Group"
                  className="text-[1.4rem] text-[#42526E]"
                />
              </div>

              <div>
                <textarea
                  ref={serviceDesRef}
                  placeholder="Enter Service Group Description"
                  className="outline-none rounded-sm border-2 border-[#7c7c7d] text-[#42526E] mt-[0.75rem] mb-[1rem] w-full h-[9vh] resize-none px-[0.5rem] py-[0.25rem]"
                ></textarea>
                <div className="flex justify-end items-center">
                  <button
                    onClick={(e) => setIsInsert(false)}
                    className="bg-[#bababa] px-[1rem] py-[0.3rem] font-medium"
                  >
                    Cancel
                  </button>
                  <button onClick={handleInsertService} className="bg-[#0055cc] px-[1rem] py-[0.3rem] font-medium text-[#fff] ml-[1rem]">
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceSettings;
