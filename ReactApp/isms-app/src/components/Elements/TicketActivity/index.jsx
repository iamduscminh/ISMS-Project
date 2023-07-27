import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {TiDocumentDelete} from "react-icons/ti";

const TicketActivity = ({
  activity,
  getActivityName,
  statusData,
  roleData,
  handleDeleteActivity,
  canDelete
}) => {
  //Đóng mở Activity
  const [isOpenActivity, setIsOpenActivity] = useState(false);
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
          <CiEdit className="mr-[0.5rem] cursor-pointer"/>
          {canDelete && <TiDocumentDelete onClick={()=>handleDeleteActivity(activity.id)} className="cursor-pointer"/>}
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
          <div className="flex">
            <div className="flex mr-[5rem]">
              <div className="w-[100%] mr-[2.5rem]">
                <h2 className="text-[#42526E] font-medium">Link Status</h2>
              </div>
              <select
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
              </select>
            </div>

            <div className="flex ">
              <div className="w-[100%] mr-[2.5rem]">
                <h2 className="text-[#42526E] font-medium">Role</h2>
              </div>
              <select
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
              </select>
            </div>
          </div>

          <div className="w-full flex mt-[2rem]">
            <div className="w-[12.5%]">
              <h2 className="text-[#42526E] font-medium">Status Trans</h2>
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
        </div>
      )}
    </div>
  );
};

export default TicketActivity;
