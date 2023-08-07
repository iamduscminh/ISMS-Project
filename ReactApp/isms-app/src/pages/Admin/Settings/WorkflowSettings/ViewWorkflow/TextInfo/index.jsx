import React, { useRef, useState, useEffect } from "react";
import TicketActivity from "../../../../../../components/Elements/TicketActivity";
import SearchAgent from "../SearchAgent";

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
    id: -1,
    text: "None"
  },
  {
    id: 0,
    text: "All Group",
  },
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

const agentData = [
  {
    id: 1,
    name: "Tu Doan",
  },
  {
    id: 2,
    name: "Calyrex",
  },
  {
    id: 3,
    name: "Spectrier",
  },
];
const TextInfo = ({
  listActivity,
  handleAddNewActivity,
  handleDeleteActivity,
  handleEditActivity,
  handleAddStatusTransition,
  handleDeleteStatusTransition,
}) => {
  const activityNameInputRef = useRef();
  const statusInputRef = useRef();
  const roleInputRef = useRef();
  const [roleInputValue, setRoleInputValue] = useState(-1)
  const [agentValue, setAgentValue] = useState(null);

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
    }else if(agentValue===null && roleInputValue === -1){
      alert("You must choose Group or Agent to handle this activity");
    } else {
      handleAddNewActivity(
        activityNameInputRef.current.value.trim(),
        statusInputRef.current.value,
        roleInputValue,
        agentValue
      );
    }
  };

  const getActivityName = (activityId) => {
    return listActivity.find((item) => item.id === activityId).activityName;
  };

  const getAgentName = (agentId)=>{
    return agentData.find(item=>item.id === agentId).name;
  }
  const getListActivityName = () => {
    return listActivity.map((item) => {
      return {
        id: item.id,
        activityName: item.activityName,
      };
    });
  };

  const handleAddAgent = (agent) => {
    setAgentValue(agent)
  }

  useEffect(() => {
    if (agentValue) {
      // Nếu agentValue có giá trị, đặt giá trị của select thành null
      setRoleInputValue(-1);
    }
  }, [agentValue]);

  useEffect(() => {
    if (roleInputValue !== -1) {
      // Nếu agentValue có giá trị, đặt giá trị của select thành null
      setAgentValue(null);
  }}, [roleInputValue]);

  const handleRoleInputChange = (event) => {
    const selectedValue = event.target.value;
    setRoleInputValue(selectedValue);
  };

  return (
    <div className="mt-[2rem] w-[70%]">
      {listActivity.map((activity) => {
        const hasDestination = listActivity.some((item) => {
          return item.listStatusTrans.some(
            (statusTrans) => statusTrans.destination === activity.id
          );
        });
        return (
          <TicketActivity
            key={activity.id}
            getActivityName={getActivityName}
            activity={activity}
            statusData={statusData}
            roleData={roleData}
            agentData={agentData}
            listActivityName={getListActivityName()}
            handleDeleteActivity={handleDeleteActivity}
            handleEditActivity={handleEditActivity}
            handleAddStatusTransition={handleAddStatusTransition}
            handleDeleteStatusTransition={handleDeleteStatusTransition}
            canDelete={!hasDestination}
          />
        );
      })}
      <div className="mt-[2rem]">
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
          <label className="text-[#42526E] text-[1.1rem] ml-[2rem]">
            Status
          </label>
          <select
            ref={statusInputRef}
            className="bg-slate-500 ml-[1rem] text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
            value={null}
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
          <label className="text-[#42526E] text-[1.1rem] ml-[2rem]">
            Group
          </label>
          <select
            ref={roleInputRef}
            className="bg-slate-500 ml-[1rem] text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
            onChange={handleRoleInputChange}
            value={roleInputValue}
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

          <label className="text-[#42526E] text-[1.1rem] ml-[2rem]">
            Agent
          </label>
          <div className="relative">
            <h1
            ref={roleInputRef}
            className="bg-slate-500 ml-[1rem] w-[10rem] text-center rounded-md font-medium px-[0.5rem] text-[#fff]"
            >{agentValue ? getAgentName(agentValue)  : "None"}</h1>
            <div className="absolute left-0 top-[120%]">
              <SearchAgent agentData={agentData} handleAddAgent={handleAddAgent} />
            </div>    
          </div>
          

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
