import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import TextInfo from "./TextInfo";
import DiagramInfo from "./DiagramInfo";

const ViewWorkflow = () => {
  const { mode, flowId } = useParams();
  const [activeTextDiagram, setActiveTextDiagram] = useState(true);

  const handleClickText = () => {
    if (activeTextDiagram) return;
    setActiveTextDiagram(true);
  };

  const handleClickDiagram = () => {
    if (!activeTextDiagram) return;
    setActiveTextDiagram(false);
  };

  //List các activity của Workflow hiện tại
  const [listActivity, setListActivity] = useState([
    {
      id: 1,
      activityName: "Requirement accepted",
      linkStatus: "New",
      role: "Service Owner",
      listStatusTrans: [
        {
          id: 1,
          statusTran: "Done",
          checkCondition: true,
          destination: 1,
        },
      ],
    },
  ]);
  const addNewActivity = (name, status, role) => {
    setListActivity([
      ...listActivity,
      {
        id: listActivity.length + 1,
        activityName: name,
        linkStatus: status,
        role: role,
        listStatusTrans: [],
      },
    ]);
  };

  const deleteActivity = (id) =>{
    console.log(id);
    setListActivity(listActivity.filter(item=>item.id !== id));
  }

  return (
    <div className="h-full overflow-y-scroll">
      <GeneralInfo />
      <div className="ml-[3rem] mt-[2rem]">
        <div>
          {activeTextDiagram ? (
            <button
              onClick={handleClickText}
              className="px-[1rem] bg-[#42526E] text-[#fff] font-medium hover:border-[#fff] mr-[0.1rem]"
            >
              Text
            </button>
          ) : (
            <button
              onClick={handleClickText}
              className="px-[1rem] bg-[#fff] text-[#42526E] font-medium hover:border-[#fff] mr-[0.1rem]"
            >
              Text
            </button>
          )}
          {!activeTextDiagram ? (
            <button
              onClick={handleClickDiagram}
              className="px-[1rem] bg-[#42526E] text-[#fff] font-medium hover:border-[#fff]"
            >
              Diagram
            </button>
          ) : (
            <button
              onClick={handleClickDiagram}
              className="px-[1rem] bg-[#fff] text-[#42526E] font-medium hover:border-[#fff]"
            >
              Diagram
            </button>
          )}
        </div>
        {activeTextDiagram ? (
          <TextInfo listActivity={listActivity} handleAddNewActivity={addNewActivity} handleDeleteActivity={deleteActivity}/>
        ) : (
          <DiagramInfo />
        )}
      </div>
    </div>
  );
};

export default ViewWorkflow;
