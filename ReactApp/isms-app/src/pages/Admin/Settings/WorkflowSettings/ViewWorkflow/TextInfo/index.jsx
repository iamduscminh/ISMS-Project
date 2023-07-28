import React, { useRef, useState } from "react";
import TicketActivity from "../../../../../../components/Elements/TicketActivity";

const statusData = [
  {
    id: 1,
    text: "New",
  },
  {
    id: 2,
    text: "Reject",
  },
  {
    id: 3,
    text: "Inprogress",
  },
  {
    id: 4,
    text: "Resolved",
  },
  {
    id: 5,
    text: "Pending",
  },
  {
    id: 6,
    text: "Close",
  },
];

const roleData = [
  {
    id: 1,
    text: "Service Owner",
  },
  {
    id: 2,
    text: "Service Member",
  },
  {
    id: 3,
    text: "Security expert",
  },
  {
    id: 4,
    text: "Infrastructure engineer",
  },
  {
    id: 5,
    text: "Network Engineer",
  },
];
const TextInfo = ({
  listActivity,
  handleAddNewActivity,
  handleDeleteActivity,
  handleEditActivity,
  handleAddStatusTransition
}) => {
  const activityNameInputRef = useRef();
  const statusInputRef = useRef();
  const roleInputRef = useRef();
  const handleAddClick = () => {
    if (activityNameInputRef.current.value.trim() === "") {
      alert("Activity Name cannot be empty.");
    } else if (
      listActivity.find(
        (item) =>
          item.activityName === activityNameInputRef.current.value.trim()
      )
    ) {
      alert("Activity Name is specified");
    } else {
      handleAddNewActivity(
        activityNameInputRef.current.value.trim(),
        statusInputRef.current.value,
        roleInputRef.current.value
      );
    }
  };

  const getActivityName = (activityId) => {
    return listActivity.find((item) => item.id === activityId).activityName;
  };

  const getListActivityName = () => {
    return listActivity.map((item) => {
      return {
        id: item.id,
        activityName: item.activityName,
      };
    });
  }
  return (
    <div className="mt-[2rem] w-[70%]">
      {listActivity.map((activity) => {
        const hasDestination = listActivity.some((item) => {
          return item.listStatusTrans.some(
            (statusTrans) => statusTrans.destination === activity.id
          );
        });
        return(
        <TicketActivity
          key={activity.id}
          getActivityName={getActivityName}
          activity={activity}
          statusData={statusData}
          roleData={roleData}
          listActivityName={getListActivityName()}
          handleDeleteActivity={handleDeleteActivity}
          handleEditActivity={handleEditActivity}
          handleAddStatusTransition={handleAddStatusTransition}
          canDelete={!hasDestination}
        />);
      })}
      <div className="mt-[3rem]">
        <h1 className="text-[1.5rem] text-[#42526E] font-medium">
          Add new Activity
        </h1>
        <div className="mt-[0.75rem] flex items-center">
          <label className="text-[#42526E] text-[1.1rem]">Name</label>
          <input
            type="text"
            ref={activityNameInputRef}
            className="w-[10rem] ml-[1rem] border border-[#42526E] px-[1rem] py-[0.25rem] rounded-md"
          />
          <label className="text-[#42526E] text-[1.1rem] ml-[3rem]">
            Status
          </label>
          <select
            ref={statusInputRef}
            className="bg-slate-500 ml-[1rem] text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
          >
            {statusData.map((item) => (
              <option
                className="bg-white text-[#42526E]"
                key={item.id}
                value={item.text}
              >
                {item.text}
              </option>
            ))}
          </select>
          <label className="text-[#42526E] text-[1.1rem] ml-[3rem]">Role</label>
          <select
            ref={roleInputRef}
            className="bg-slate-500 ml-[1rem] text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
          >
            {roleData.map((item) => (
              <option
                className="bg-white text-[#42526E]"
                key={item.id}
                value={item.text}
              >
                {item.text}
              </option>
            ))}
          </select>
          <div className="ml-[3rem] ">
            <button
              onClick={handleAddClick}
              className="bg-[#043AC5] px-[1rem] text-[#fff] font-medium"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInfo;
