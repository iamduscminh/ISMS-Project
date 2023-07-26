import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import ModalDialog from "../../../../../../components/Elements/PopupModal";

const GeneralInfor = () => {
  //Dữ liệu cho WorkflowName
  const [workflowName, setWorkflowName] = useState(
    "Server Infrastructure Management"
  );

  const handleWorkflowNameChange = (e) => {
    setWorkflowName(e.target.value);
  }

  //Dữ liệu cho Workflow Description
  const [workflowDes, setWorkflowDes] = useState(
    "Server Infrastructure Management is an IT service that provides comprehensive support and management for an organization's server infrastructure."
  );

  const handleWorkflowDesChange = (e) => {
    setWorkflowDes(e.target.value);
  }

  //Dữ liệu thể hiện việc workflow active hay không
  const [isActive, setIsActive] = useState(false);

  //Các dữ liệu cho form Edit
  const [RequireMessage, setRequireMessage] = useState(false);

  return (
    <div className="ml-[3rem] mt-[2rem]">
      <div className="flex items-baseline">
        <span className="text-[2rem] font-medium">{workflowName}</span>
        <ModalDialog
          title={"Create New Workflow"}
          actionText={"Create"}
          triggerComponent={
            <CiEdit className="text-[1.5rem] ml-[1rem] cursor-pointer font-medium" />
          }
        >
          <div className="flex flex-col">
            <label>
              Workflow Name
              {RequireMessage && <span className="text-[red]">(required)</span>}
            </label>
            <input
              type="text"
              className="w-[90%] border border-[#42526E] rounded-md px-[1rem] py-[0.5rem]"
              value={workflowName}
              onChange={handleWorkflowNameChange}
            />
            <label>Description</label>
            <input
              type="text"
              className="w-[90%] border border-[#42526E] rounded-md px-[1rem] py-[0.5rem]"
              value={workflowDes}
              onChange={handleWorkflowDesChange}
            />
          </div>
        </ModalDialog>
      </div>
      <div className="flex items-baseline">
        <p className="w-[90%] text-[#42526E]">{workflowDes}</p>
      </div>

      <div className="flex justify-start items-center mt-[1rem] text-[#42526E]">
        {isActive ? (
          <div className="mr-[1rem] px-[1rem] bg-green-500 text-[#fff] rounded-lg font-medium cursor-pointer">
            Active
          </div>
        ) : (
          <div className="mr-[1rem] px-[1rem] bg-red-500 text-[#fff] rounded-lg font-medium cursor-pointer">
            Inactive
          </div>
        )}
        <div>
          This workflow was last edited by{" "}
          <a href="#" className="font-bold">
            Tu Doan
          </a>{" "}
          at 2023/07/25 23:43.
        </div>
      </div>
    </div>
  );
};

export default GeneralInfor;
