import React, { useRef, useState, useEffect } from "react";
import ServiceGroup from "../../../../components/Elements/ServiceGroup";
import { AiFillPlusCircle } from "react-icons/ai";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
const ServiceSettings = () => {
  const axiosInstance = useAxiosPrivate();
  //Data cho List Service được lấy từ DB lên
  const [listService, setListService] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Gọi API để lấy danh sách Service Categories từ DB
    const fetchServiceCategories = async () => {
      try {
        const response = await axiosInstance.get(
          "api/ServiceCategories/getall"
        );
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
    if (serviceName === "") {
      Swal.fire({
        icon: "Error",
        title: "Error!",
        text: "Service Categories is Require",
        confirmButtonText: "OK",
      });
    }

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
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const createdServiceGroup = response.data;
          setListService((prev) => [...prev, createdServiceGroup]);

          // Clear Input
          serviceNameRef.current.value = "";
          serviceDesRef.current.value = "";

          // Đóng trạng thái Insert
          setIsInsert(false);
        } else {
          throw response;
        }
      } catch (err) {
        // Optionally, show an error message to the user
        if (err.status === 403) {
          Swal.fire({
            icon: "Error",
            title: "Error!",
            text: "You are not allowed to add Service Category",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "Error",
            title: "Error!",
            text: "System error, sorry, please contact administrator:",
            confirmButtonText: "OK",
          });
        }
      }
    };
    createServiceGroup();
  };

  //
  const deleteServiceGroup = (selectedService) => {
    // Gọi API để xóa dữ liệu dưới cơ sở dữ liệu
    axiosInstance
      .delete(
        `api/ServiceCategories/delete?serviceCategoryId=${selectedService}`
      )
      .then((response) => {
        // Nếu xóa thành công, cập nhật lại state bằng cách loại bỏ phần tử đã xóa
        setListService((prevListService) => {
          return prevListService.filter(
            (e) => e.serviceCategoryId !== selectedService
          );
        });

        alert(response.data.message);
      })
      .catch((error) => {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator:",
          confirmButtonText: "OK",
        });
      });
  };

  const updateServiceGroup = (serviceName, serviceDes, serviceCategoryId) => {
    const updatedService = {
      serviceCategoryName: serviceName,
      description: serviceDes,
    };

    axiosInstance
      .put(
        `api/ServiceCategories/update?serviceCategoryId=${serviceCategoryId}`,
        updatedService,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const newData = response.data;
        const updatedData = listService.map((item) =>
          item.serviceCategoryId === newData.serviceCategoryId ? newData : item
        );

        setListService(updatedData);
      })
      .catch((error) => {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator: ",
          confirmButtonText: "OK",
        });
      });
  };
  return (
    <div>
      <div className="relative w-full bg-[#42526E] pl-[5rem] flex justify-start flex-col py-[0.75rem]">
        <h4 className="mb-[0.75rem] text-[#fff] ">
          Project/Settings/ServiceCategory
        </h4>
        <h1 className="text-[1.5rem] text-[#fff] font-medium ">
          Service Category Setting
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
                updateServiceGroup={updateServiceGroup}
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
