import React, { useState, useEffect, useRef } from "react";
import IconTag from "../IconTag";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import Tippy from "@tippyjs/react/headless";
import ModalDialog from "../PopupModal";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDone } from "react-icons/md";

const createServiceURL = "/create";

const ServiceGroup = ({ service, onDeleteService, updateServiceGroup }) => {
  //List tất cả các request Type theo ID truyền vào/ Lấy từ API
  const allServiceRequestType = service.serviceItemEntities.filter(
    (item) => item.status !== "Published"
  );
  //Check xem có show detail của Service hay không?
  const [detailService, setDetailService] = useState(false);

  //Check xem có đang Edit không?
  const [isDelete, setIsDelete] = useState(false);
  //Data for ServiceName
  const [serviceName, setServiceName] = useState(service.serviceCategoryName);
  const handleChangeName = (e) => {
    setServiceName(e.target.value);
  };

  //Data for Service Description
  const [serviceDes, setServiceDes] = useState(service.description);
  const handleChangeDes = (e) => {
    setServiceDes(e.target.value);
  };

  //Data For Request Type
  const [listRequestType, setListRequestType] = useState(
    service.serviceItemEntities.filter((item) => item.status === "Published")
  );
  const handleDeleteRequestType = (selectedItem) => {
    const updatedList = listRequestType.filter(
      (item) => item.serviceItemId !== selectedItem.serviceItemId
    );
    const removeRequestType = listRequestType.find(item => item.serviceItemId === selectedItem.serviceItemId);
    SetAvailableService((prev) => ([
      ...prev,
      removeRequestType
    ]))
    setListRequestType(updatedList);
  };

  //Các request Type available(được phép add) cho Service Group
  const filteredServices = allServiceRequestType.filter((requestType) => {
    return !listRequestType.some(
      (item) => item.serviceItemId === requestType.serviceItemId
    );
  });
  const [availableService, SetAvailableService] = useState(filteredServices);

  //Giá trị của input available request Type
  const [requestSearch, setRequestSearch] = useState("");

  //Kết quả Search của input
  const [searchResult, setSearchResult] = useState(availableService);

  //Check mỗi khi giá trị Request Search thay đổi thì sẽ lọc ra list Request thích hợp
  useEffect(() => {
    const filteredArray = availableService.filter((item) =>
      item.serviceItemName.toLowerCase().includes(requestSearch.toLowerCase())
    );
    setSearchResult(filteredArray);
  }, [requestSearch]);

  //Khi chọn Request Type trong Tippy thì add thêm item đó vào listRequest và sau đó xóa item đó
  //ra khỏi list Available
  const handleAddRequestType = (selectedItem) => {
    const filterAvailable = availableService.filter(
      (item) => item.serviceItemId !== selectedItem.serviceItemId
    );
    console.log(filterAvailable);
    SetAvailableService(filterAvailable);
    setSearchResult(filterAvailable);
    setRequestSearch("");

    setListRequestType((prev) => [...prev, selectedItem]);
  };

  //Check Xem có ở trạng thái có thể add service không
  const [isAddRequestType, setIsAddRequestType] = useState(false);

  const handleDeleteServiceGroup = () => {};

  const handleServiceGroup = () => {
    updateServiceGroup(serviceName, serviceDes, service.serviceCategoryId);
    setIsDelete(false);
  }

  return (
    <div className="bg-[#fff] w-[45vw] px-[2rem] py-[0.75rem] rounded-sm border border-[#abadb0] mt-[0.5rem]">
      {/* Div này là header của thẻ Service */}
      <div className="flex justify-between items-center">
        {isDelete ? (
          <input
            value={serviceName}
            onChange={handleChangeName}
            className="text-[1.4rem] text-[#42526E]"
          />
        ) : (
          <h3
            value={serviceName}
            onChange={handleChangeName}
            className="text-[1.4rem] text-[#42526E]"
          >{serviceName}</h3>
        )}
        <div className="flex text-[#42526E]">
          {!isDelete ? (
            <CiEdit onClick={() => setIsDelete(true)} />
          ) : (
            <MdOutlineDone onClick={() => handleServiceGroup()} />
          )}
          {service.serviceItemEntities.length === 0 && (
            <ModalDialog
              title={"Delete Service Group"}
              actionText={"Delete"}
              actionHandler={() => {
                onDeleteService(service.serviceCategoryId);
              }}
              triggerComponent={
                <IconTag
                  className="text-[1.1rem] cursor-pointer"
                  name="AiFillDelete"
                />
              }
            >
              <div>
                <h1 className="text-[0.8rem] text-[#42526E]">
                  The following Request Type will no longer be visible in your
                  customer catalog:
                </h1>
                <div className="ml-[2rem] text-[0.75rem] text-[#42526E] mt-[1rem]">
                  {listRequestType.map((item) => (
                    <h3 className="mt-[0.3rem]" key={item.serviceItemId}>
                      - {item.serviceItemName}
                    </h3>
                  ))}
                </div>
              </div>
            </ModalDialog>
          )}

          {!detailService ? (
            <SlArrowUp
              onClick={(e) => setDetailService(true)}
              className="ml-[1rem] cursor-pointer"
            />
          ) : (
            <SlArrowDown
              onClick={(e) => setDetailService(false)}
              className="ml-[1rem] cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Div này là phần sẽ toggle */}
      {detailService && (
        <div>
          {isDelete ? (
            <textarea
              value={serviceDes}
              onChange={handleChangeDes}
              className="text-[#42526E] mt-[0.75rem] mb-[1rem] w-full h-[9vh] resize-none px-[0.5rem] py-[0.25rem]"
            ></textarea>
          ) : (
            <p className="text-[#42526E] mt-[0.75rem] mb-[1rem] w-full h-[9vh] resize-none px-[0.5rem] py-[0.25rem]">
              {serviceDes}
            </p>
          )}
          <div>
            {listRequestType.map((item) => (
              <div
                key={item.serviceItemId}
                className="flex pl-[2rem] py-[0.5rem] text-[#42526E] items-center hover:bg-[#ebecf0] cursor-grab"
              >
                <IconTag name={item.iconDisplay} />
                <h3 className="ml-[1rem]">{item.serviceItemName}</h3>
                {/* <IconTag
                  onClickHandle={() => handleDeleteRequestType(item)}
                  className="ml-auto cursor-pointer"
                  name="AiOutlineClose"
                /> */}
              </div>
            ))}
          </div>

          {/* Div này để thêm Request Type */}
          {/* {!isAddRequestType ? (
            <h3
              onClick={(e) => setIsAddRequestType(true)}
              className="ml-[2rem] mt-[1rem] cursor-pointer text-[#054ca3]"
            >
              Add Request Type
            </h3>
          ) : (
            <Tippy
              interactive
              visible={searchResult.length > 0}
              placement="bottom"
              render={(attrs) => (
                <div className="w-[41vw] rounded-sm bg-[#fff] border border-[#42526E] shadow-sm">
                  {searchResult.map((item) => (
                    <div
                      onClick={() => handleAddRequestType(item)}
                      key={item.serviceItemId}
                      className="flex pl-[2rem] py-[0.5rem] text-[#42526E] items-center hover:bg-[#ebecf0] cursor-pointer"
                    >
                      <IconTag name={item.iconDisplay} />
                      <h3 className="ml-[1rem]">{item.serviceItemName}</h3>
                    </div>
                  ))}
                </div>
              )}
            >
              <div className="relative">
                <input
                  onChange={(e) => setRequestSearch(e.target.value)}
                  type="text"
                  className="w-[41vw] px-[1rem] py-[0.25rem] mt-[1rem] border-2 border-[#42526E] rounded-md"
                />
                <IconTag
                  onClickHandle={(e) => setIsAddRequestType(false)}
                  className="absolute right-0 top-[50%] cursor-pointer"
                  name="AiOutlineClose"
                />
              </div>
            </Tippy>
          )} */}
        </div>
      )}
    </div>
  );
};

export default ServiceGroup;
