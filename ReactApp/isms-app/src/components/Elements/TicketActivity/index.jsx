import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TiDocumentDelete } from "react-icons/ti";
import { AiFillPlusCircle } from "react-icons/ai";
import ModalDialog from "../PopupModal";

const TicketActivity = ({
  activity,
  getActivityName,
  statusData,
  roleData,
  listActivityName,
  canDelete,
  handleDeleteActivity,
  handleEditActivity,
  handleAddStatusTransition,
  handleDeleteStatusTransition,
  handleEditStatusTransition
}) => {
  console.log(activity)
  const getStatusNameById = (id) => {
    return statusData.find((item) => item.id === id).text;
  };
  const getRolesNameById = (id) => {
    return roleData.find((item) => item.id === id).text;
  };
  //Đóng mở Activity
  const [isOpenActivity, setIsOpenActivity] = useState(false);

  const [activityNameInput, setActivityNameInput] = useState(
    activity.activityName
  );
  const [statusInput, setStatusInput] = useState(activity.linkStatus);
  const [roleInput, setRoleInput] = useState(activity.role);
  const [activityDes, setActivityDes] = useState(activity.description);

  const [statusTranInput, setStatusTranInput] = useState("");
  const [destinationInput, setDestinationInput] = useState(0);
  const [checkCondition, setCheckCondition] = useState(false);

  const listDestination = listActivityName.filter(
    (item) => item.id !== activity.id
  );
  return (
    <div className="border border-slate-200 mb-[0.5rem]">
      {/* Phần Header của activity */}
      <div className="w-full bg-slate-200 px-[1.5rem] py-[0.75rem] rounded-sm flex justify-between items-center">
        <div className="text-[1.25rem] text-[#42526E] ">
          <span className="font-medium mr-[2rem]">Activity:</span>
          {activity.activityName}
        </div>
        <div className="flex items-center">
          <ModalDialog
            title={"Edit New Workflow"}
            actionText={"Edit"}
            triggerComponent={<CiEdit className="mr-[0.5rem] cursor-pointer" />}
            customSize="lg"
            actionHandler={() =>
              handleEditActivity(
                activity.id,
                activityNameInput,
                statusInput,
                roleInput,
                activityDes
              )
            }
          >
            <div className="w-[80%] ml-auto">
              <div>
                <label className="text-[#42526E] font-medium w-[5rem]">
                  Activity
                </label>
                <input
                  type="text"
                  className="border border-[#42526E] rounded-sm w-[20rem] px-[0.5rem]"
                  value={activityNameInput}
                  onChange={(e) => setActivityNameInput(e.target.value)}
                />
              </div>
              <div className="mt-[1rem]">
                <label className="text-[#42526E] font-medium w-[5rem]">
                  Status
                </label>
                <select
                  className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                >
                  {statusData.map((item) => (
                    <option
                      className="bg-white text-[#42526E]"
                      key={item.id}
                      value={item.id}
                    >
                      {item.text}
                    </option>
                  ))}
                </select>
                <label className="text-[#42526E] font-medium ml-[3rem]">
                  Role
                </label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff] ml-[3rem]"
                >
                  {roleData.map((item) => (
                    <option
                      className="bg-white text-[#42526E]"
                      key={item.id}
                      value={item.id}
                    >
                      {item.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-[1rem] flex items-center">
                <label className="text-[#42526E] font-medium w-[5rem]">
                  Descrip
                </label>
                <textarea
                  value={activityDes}
                  onChange={(e) => setActivityDes(e.target.value)}
                  className="w-[20rem] h-[5rem] px-[0.5rem] border border-[#42526E] rounded-sm"
                ></textarea>
              </div>
            </div>
          </ModalDialog>
          {canDelete && (
            <TiDocumentDelete
              onClick={() => handleDeleteActivity(activity.id)}
              className="cursor-pointer"
            />
          )}
          {!isOpenActivity && (
            <MdArrowDropDown
              onClick={() => setIsOpenActivity(!isOpenActivity)}
              className="text-[2rem] cursor-pointer"
            />
          )}
          {isOpenActivity && (
            <MdArrowDropUp
              onClick={() => setIsOpenActivity(!isOpenActivity)}
              className="text-[2rem] cursor-pointer"
            />
          )}
        </div>
      </div>
      {/* Phần Body của activity */}
      {isOpenActivity && (
        <div className="w-full px-[1.5rem] py-[0.75rem] bg-white">
          <div className="flex justify-start">
            <div className="mr-[1rem]">
              <h2 className="text-[#42526E] font-medium min-w-[7rem]">
                Link Status
              </h2>
            </div>
            {/* <select
                value={activity.linkStatus}
                className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
              >
                {statusData.map((item) => (
                  <option
                    className="bg-white text-[#42526E]"
                    key={item.id}
                    value={item.id}
                  >
                    {item.text}
                  </option>
                ))}
              </select> */}
            <div className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff] mr-[5rem]">
              {getStatusNameById(activity.linkStatus)}
            </div>

            <div className="mr-[2rem]">
              <h2 className="text-[#42526E] font-medium">Role</h2>
            </div>
            {/* <select
                value={activity.role}
                className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
              >
                {roleData.map((item) => (
                  <option
                    className="bg-white text-[#42526E]"
                    key={item.id}
                    value={item.id}
                  >
                    {item.text}
                  </option>
                ))}
              </select> */}
            <div className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]">
              {getRolesNameById(activity.role)}
            </div>
          </div>

          <div className="w-full flex mt-[2rem] ">
            <div className="mr-[1rem] flex min-w-[7rem]">
              <h2 className="text-[#42526E] font-medium mr-[0.5rem]">
                Status Trans
              </h2>
              <ModalDialog
                title={"Add New Status Trans"}
                actionText={"Add"}
                actionHandler={() =>
                  handleAddStatusTransition(
                    activity.id,
                    statusTranInput,
                    destinationInput,
                    checkCondition
                  )
                }
                triggerComponent={
                  <AiFillPlusCircle className="text-[1rem] text-[#42526E] cursor-pointer" />
                }
                customSize="lg"
              >
                <div className="w-[70%] m-auto flex flex-col">
                  <div>
                    <label className="w-[40%] text-[#42526E] font-medium">
                      Status Name
                    </label>
                    <input
                      value={statusTranInput}
                      onChange={(e) => setStatusTranInput(e.target.value)}
                      type="text"
                      className="px-[0.5rem] w-[45%] border border-[#42526E] rounded-md"
                    />
                  </div>
                  <div className="mt-[0.5rem]">
                    <label className="w-[40%] text-[#42526E] font-medium">
                      Destination
                    </label>
                    <select
                      value={destinationInput}
                      onChange={(e) => setDestinationInput(e.target.value)}
                      className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
                    >
                      {listDestination.map((item) => (
                        <option
                          className="bg-white text-[#42526E]"
                          key={item.id}
                          value={item.id}
                        >
                          {item.activityName}
                        </option>
                      ))}
                      <option
                        className="bg-white text-[#42526E]"
                        key={listDestination.length + 1}
                        value={0}
                      >
                        None
                      </option>
                    </select>
                  </div>
                  <div className="mt-[0.5rem]">
                    <label className="w-[40%] text-[#42526E] font-medium">
                      Condition
                    </label>
                    <input
                      value={checkCondition}
                      onChange={(e) => setCheckCondition(e.target.value)}
                      type="checkbox"
                    />
                  </div>
                </div>
              </ModalDialog>
            </div>
            <div>
              {activity.listStatusTrans.map((item) => (
                <div className="flex mb-[0.75rem]" key={item.id}>
                  <div className="w-[100%]">
                    <span className="text-[#42526E] font-medium mr-[0.5rem]">
                      {item.statusTran}
                    </span>
                    Transition to
                    <span className="text-[#42526E] font-medium ml-[0.5rem]">
                      {item.destination === 0
                        ? "None"
                        : getActivityName(item.destination)}
                    </span>
                  </div>
                  <div className="ml-[3rem] flex items-center">
                    <span className="mr-[1rem]">Condition</span>
                    {item.checkCondition ? (
                      <input type="checkbox" checked disabled />
                    ) : (
                      <input type="checkbox" disabled />
                    )}
                  </div>
                  <div className="ml-[3rem] text-[#043AC5] flex items-center">
                    {/* <span className="mr-[0.5rem] cursor-pointer">
                      Edit
                    </span> */}
                    <ModalDialog
                      title={"Delete Status Trans"}
                      actionText={"Delete"}
                      actionHandler={()=>handleDeleteStatusTransition(activity.id, item.id)}
                      triggerComponent={
                        <span className="cursor-pointer">Delete</span>
                      }
                      customSize="md"
                    >
                      <div className="m-auto text-[1.25rem] w-[80%]">Are you sure to delete this Transition?</div>                     
                    </ModalDialog>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[1rem] flex w-[80%]">
            <div className="mr-[1rem]">
              <h2 className="text-[#42526E] font-medium min-w-[7rem]">
                Description
              </h2>
            </div>
            <p className="flex-grow">{activity.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketActivity;
