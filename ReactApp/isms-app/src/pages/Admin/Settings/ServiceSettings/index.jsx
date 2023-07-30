import React, { useRef, useState, useEffect } from "react";
import ServiceGroup from "../../../../components/Elements/ServiceGroup";
import { AiFillPlusCircle } from "react-icons/ai";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const ServiceSettings = () => {
  const axiosInstance = useAxiosPrivate();
  //Data cho List Service được lấy từ DB lên
  const [listService, setListService] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy danh sách Service Categories từ DB
    const fetchServiceCategories = async () => {
      try {
        const response = await axiosInstance.get("api/ServiceCategories/getallwithserviceitems");
        console.log(response);
        setListService(response.data); // Cập nhật listService với dữ liệu trả về từ API
        setIsLoading(false); // Kết thúc quá trình loading khi đã có dữ liệu
      } catch (error) {
        console.error("Error fetching service categories:", error);
        setIsLoading(false); // Kết thúc quá trình loading nếu có lỗi xảy ra
      }
    };

    fetchServiceCategories();
  }, [axiosInstance]);

  //State này lưu trạng thái có đang insert một Group serice mới không
  const [isInsert, setIsInsert] = useState(false);

  //2 Ref để lấy giá trị Input của Service
  const serviceNameRef = useRef(null);
  const serviceDesRef = useRef(null);

  const handleInsertService = (e) => {
    //Lấy giá trị từ Input
    const serviceName = serviceNameRef.current.value;
    const serviceDes = serviceDesRef.current.value;
    if (serviceName === "") alert("Service Categories is Require");

    // Create the object to be sent to the backend API
    const newServiceGroup = {
      ServiceCategoryName: serviceName,
      Description: serviceDes,
    };

    const controller = new AbortController();

    const createServiceGroup = async () => {
      try {
        const response = await axiosInstance.post(
          "api/ServiceCategories/create",
          JSON.stringify(newServiceGroup),
          {
            signal: controller.signal,
          }
        );
        console.log(response);
        if (response.status === 200) {
          const createdServiceGroup = response.data;
          setListService((prev) => [...prev, createdServiceGroup]);

          // Clear Input
          serviceNameRef.current.value = "";
          serviceDesRef.current.value = "";

          // Đóng trạng thái Insert
          setIsInsert(false);
        }else{
         throw response
        }
      } catch (err) {
        // Optionally, show an error message to the user
        if(err.status === 403){
          alert("You are not allowed to add Service Category");
        }else{
          alert(err.message);
        }
      }
    };
    createServiceGroup();
  };

  //
  const deleteServiceGroup = (selectedService) => {
    console.log(selectedService);
    const filterListService = listService.filter(
      (e) => e.id !== selectedService
    );
    console.log(filterListService);
    setListService(filterListService);
  };
  return (
    <div>
      <div className="relative w-full bg-[#42526E] pl-[5rem] flex justify-start flex-col py-[0.75rem]">
        <h4 className="mb-[0.75rem] text-[#fff] ">
          Project/Settings/ServiceGroups
        </h4>
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
              <ServiceGroup
                key={item.serviceCategoryId}
                service={item}
                onDeleteService={deleteServiceGroup}
              />
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
                  <button
                    onClick={handleInsertService}
                    className="bg-[#0055cc] px-[1rem] py-[0.3rem] font-medium text-[#fff] ml-[1rem]"
                  >
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
