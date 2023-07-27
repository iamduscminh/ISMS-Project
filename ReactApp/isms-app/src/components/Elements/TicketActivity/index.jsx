import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TiDocumentDelete } from "react-icons/ti";
import ModalDialog from "../PopupModal";

const TicketActivity = ({
  activity,
  getActivityName,
  statusData,
  roleData,
  canDelete,
  handleDeleteActivity,
  handleEditActivity
}) => {
  const getStatusNameById = (id) =>{  
    return statusData.find(item=>item.id === id).text;
  }
  const getRolesNameById = (id) =>{
    return roleData.find(item=>item.id === id).text;
  }
  //Đóng mở Activity
  const [isOpenActivity, setIsOpenActivity] = useState(false);

  const [activityNameInput, setActivityNameInput] = useState(activity.activityName);
  const [statusInput, setStatusInput] = useState(activity.linkStatus);
  const [roleInput, setRoleInput] = useState(activity.role);
  const [activityDes, setActivityDes] = useState(activity.description);

  return (
    <div className="border border-slate-200 mb-[0.5rem]">
      {/* Phần Header của activity */}
      <div className="w-full bg-slate-200 px-[1.5rem] py-[0.75rem] rounded-sm flex justify-between items-center">
        <div className="text-[1.25rem] text-[#42526E] ">
          <span className="font-medium mr-[2rem]">
            Activity:
          </span>
          {activity.activityName}
        </div>
        <div className="flex items-center">
          <ModalDialog
            title={"Edit New Workflow"}
            actionText={"Edit"}
            triggerComponent={
              <CiEdit className="mr-[0.5rem] cursor-pointer" />
            }
            customSize="lg"
            actionHandler={()=>handleEditActivity(activity.id, activityNameInput, statusInput, roleInput, activityDes)}
          >
            <div className="w-[80%] ml-auto">
              <div>
                <label className="text-[#42526E] font-medium w-[5rem]">Activity</label>
                <input type="text" className="border border-[#42526E] rounded-sm w-[20rem] px-[0.5rem]" value={activityNameInput} onChange={(e)=> setActivityNameInput(e.target.value)}/>
              </div>
              <div className="mt-[1rem]">
                <label className="text-[#42526E] font-medium w-[5rem]">Status</label>
                <select
                  className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
                  value={statusInput}
                  onChange={(e)=>setStatusInput(e.target.value)}
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
                <label className="text-[#42526E] font-medium ml-[3rem]">Role</label>
                <select
                  value={roleInput}
                  onChange={(e)=>setRoleInput(e.target.value)}
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
                <label className="text-[#42526E] font-medium w-[5rem]">Descrip</label>
                <textarea value={activityDes} onChange={(e=>setActivityDes(e.target.value))} className="w-[20rem] h-[5rem] px-[0.5rem] border border-[#42526E] rounded-sm"></textarea>
              </div>
            </div>
          </ModalDialog>
          {canDelete && <TiDocumentDelete onClick={() => handleDeleteActivity(activity.id)} className="cursor-pointer" />}
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
              <h2 className="text-[#42526E] font-medium min-w-[7rem]">Link Status</h2>
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
            <div className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff] mr-[5rem]">{getStatusNameById(activity.linkStatus)}</div>

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
            <div className="bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]">{getRolesNameById(activity.role)}</div>
          </div>

          <div className="w-full flex mt-[2rem]">
            <div className="mr-[1rem]">
              <h2 className="text-[#42526E] font-medium min-w-[7rem]">Status Trans</h2>
            </div>
            <div>
              {activity.listStatusTrans.map((item) => (
                <div className="flex mb-[0.75rem]" key={item.id}>
                  <div>
                    <span className="text-[#42526E] font-medium mr-[0.5rem]">
                      {item.statusTran}
                    </span>
                    Transition to
                    <span className="text-[#42526E] font-medium ml-[0.5rem]">
                      {getActivityName(item.destination)}
                    </span>
                  </div>
                  <div className="ml-[3rem] flex items-center">
                    <span className="mr-[1rem]">Transition Condition</span>
                    {activity.checkCondition ? (
                      <input type="checkbox" checked />
                    ) : (
                      <input type="checkbox" />
                    )}
                  </div>
                  <div className="ml-[3rem] text-[#043AC5]">
                    <a href="" className="mr-[0.5rem]">
                      Edit
                    </a>
                    <a href="">Delete</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-[1rem] flex w-[80%]">
            <div className="mr-[1rem]">
              <h2 className="text-[#42526E] font-medium min-w-[7rem]">Description</h2>
            </div>
            <p className="flex-grow">{activity.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketActivity;
