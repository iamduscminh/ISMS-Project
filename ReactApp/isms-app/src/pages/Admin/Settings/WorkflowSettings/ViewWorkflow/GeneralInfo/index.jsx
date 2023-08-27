import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import ModalDialog from "../../../../../../components/Elements/PopupModal";
import { URL } from "../../../../../../utils/Url";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import useAuth from "../../../../../../hooks/useAuth";
import Swal from "sweetalert2";

const GeneralInfo = ({ flowId, checkEdit }) => {
  const { auth } = useAuth();
  const axiosInstance = useAxiosPrivate();
  const [workflowInfo, setWorkflowInfo] = useState();
  const [workflowDesInput, setWorkflowDesInput] = useState();
  const [workflowNameInput, setWorkflowNameInput] = useState();

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.WORKFLOW_URL}/${flowId}`
        );
        console.log(response.data);
        setWorkflowInfo(response.data);
        setWorkflowNameInput(response.data.workflowName);
        setWorkflowDesInput(response.data.description);
      } catch (err) {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator: ",
          confirmButtonText: "OK",
        });
      }
    };
    fetchWorkflow();
  }, [axiosInstance]);

  //Dữ liệu cho WorkflowName
  const handleWorkflowNameChange = (e) => {
    setWorkflowNameInput(e.target.value);
  };

  //Dữ liệu cho Workflow Description
  const handleWorkflowDesChange = (e) => {
    setWorkflowDesInput(e.target.value);
  };

  //Các dữ liệu cho form Edit
  const [RequireMessage, setRequireMessage] = useState(false);

  //Handle Click Thay đổi Name và Des
  const handleChangeNameDes = () => {
    if (workflowNameInput.trim() === "" || workflowDesInput.trim() === "") {
      Swal.fire({
        icon: "Error",
        title: "Error!",
        text: "Workflow name and description are required",
        confirmButtonText: "OK",
      });
      return;
    }
    const updateWorkflow = async () => {
      try {
        const response = await axiosInstance.put(
          `${URL.WORKFLOW_URL}/update?workflowId=${flowId}`,
          {
            WorkflowName: workflowNameInput,
            Description: workflowDesInput,
            CreatedBy: auth.userId,
          }
        );
        setWorkflowInfo((prev) => ({
          ...prev,
          workflowName: workflowNameInput,
          description: workflowDesInput,
        }));
        return response.status;
      } catch (err) {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator: ",
          confirmButtonText: "OK",
        })
      }
    };
    updateWorkflow();
  };
  return (
    <div className="ml-[3rem] mt-[2rem]">
      <div className="flex items-baseline">
        <span className="text-[2rem] font-medium">
          {workflowInfo?.workflowName}
        </span>
        {checkEdit && <ModalDialog
          title={"Change workflow name"}
          actionText={"Change"}
          actionHandler={handleChangeNameDes}
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
              value={workflowNameInput}
              onChange={handleWorkflowNameChange}
            />
            <label>Description</label>
            <input
              type="text"
              className="w-[90%] border border-[#42526E] rounded-md px-[1rem] py-[0.5rem]"
              value={workflowDesInput}
              onChange={handleWorkflowDesChange}
            />
          </div>
        </ModalDialog>}
      </div>
      <div className="flex items-baseline">
        <p className="w-[90%] text-[#42526E]">{workflowInfo?.description}</p>
      </div>

      <div className="flex justify-start items-center mt-[1rem] text-[#42526E]">
        {workflowInfo?.status === "Published" ? (
          <div className="mr-[1rem] px-[1rem] bg-green-500 text-[#fff] rounded-lg font-medium cursor-pointer">
            Published
          </div>
        ) : (
          <div className="mr-[1rem] px-[1rem] bg-red-500 text-[#fff] rounded-lg font-medium cursor-pointer">
            Drafted
          </div>
        )}
        <div>
          This workflow was last edited by{" "}
          <Link
            to={`/profile/${workflowInfo?.createdBy}`}
            className="font-bold"
          >
            {workflowInfo?.user.fullName}
          </Link>{" "}
          at{" "}
          {workflowInfo?.lastUpdate
            ? format(new Date(workflowInfo?.lastUpdate), "yyyy/MM/dd HH:mm:ss")
            : workflowInfo?.createdAt
            ? format(new Date(workflowInfo?.createdAt), "yyyy/MM/dd HH:mm:ss")
            : ""}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
