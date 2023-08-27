import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GeneralInfo from "./GeneralInfo";
import TextInfo from "./TextInfo";
import DiagramInfo from "./DiagramInfo";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../../utils/Url";
import Swal from "sweetalert2";

const ViewWorkflow = () => {
  const { flowId } = useParams();
  const [activeTextDiagram, setActiveTextDiagram] = useState(true);
  const axiosInstance = useAxiosPrivate();
  const [listActivity, setListActivity] = useState([]);
  const [checkEdit, setCheckEdit] = useState(true);

  const handleClickText = () => {
    if (activeTextDiagram) return;
    setActiveTextDiagram(true);
  };

  const handleClickDiagram = () => {
    if (!activeTextDiagram) return;
    setActiveTextDiagram(false);
  };

  let listInitialActivity = [];

  useEffect(() => {
    const fetchWorkFlowTask = async () => {
      try {
        const response = await Promise.all([
          axiosInstance.get(`${URL.WORKFLOW_TASK_URL}/get/${flowId}`),
          axiosInstance.get(`${URL.WORKFLOW_URL}/checkedit/${flowId}`)
        ]);
        listInitialActivity = response[0].data.map((item) => ({
          id: item.workflowTaskId,
          activityName: item.workflowTaskName,
          linkStatus: item.status,
          role: item.groupEntity,
          agent: item.userEntity,
          description: item.description,
          listStatusTrans: item.workflowTransitionDTOFroms.map(
            (transition) => ({
              statusTran: transition.workflowTransitionName,
              checkCondition: transition.condition,
              destination: transition.toWorkflowTask,
            })
          ),
        }));
        setListActivity(listInitialActivity);
        setCheckEdit(response[1].data.condition);
      } catch (err) {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator: ",
          confirmButtonText: "OK",
        });
      }
    };
    fetchWorkFlowTask();
  }, [axiosInstance]);

  // if (mode === "edit") {
  //   listInitialActivity = [
  //     {
  //       id: 1,
  //       activityName: "Close Activity",
  //       linkStatus: 6,
  //       role: 0,
  //       agent: null,
  //       description:
  //         "The last activity if this workflow",
  //       listStatusTrans: [],
  //     },
  //     {
  //       id: 2,
  //       activityName: "Requirement accepted and evaluated",
  //       linkStatus: 1,
  //       role: 1,
  //       agent: null,
  //       description:
  //         "Define the scope of the request and request detailed information from the customer",
  //       listStatusTrans: [
  //         {
  //           id: 1,
  //           statusTran: "Done",
  //           checkCondition: true,
  //           destination: 3,
  //         },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       activityName: "Planning and implementing:",
  //       linkStatus: 3,
  //       role: 3,
  //       agent: null,
  //       description:
  //         "Based on the requirements and information collected, plan the deployment for the server infrastructure management service.",
  //       listStatusTrans: [],
  //     },
  //   ];
  // } else {
  //   listInitialActivity = [
  //     {
  //       id: 1,
  //       activityName: "Close Activity",
  //       linkStatus: 6,
  //       role: 0,
  //       agent: null,
  //       description:
  //         "The last activity if this workflow",
  //       listStatusTrans: [],
  //     }
  //   ]
  // }

  const addNewActivity = (name, status, role, agent, roleDTO, agentDTO) => {
    const addActivity = async () => {
      try {
        const response = await axiosInstance.post(
          `${URL.WORKFLOW_TASK_URL}/create`,
          {
            WorkflowTaskName: name.trim(),
            Status: status,
            Description: `Description for task ${name}`,
            WorkflowId: flowId,
            AssignerId: agent,
            GroupId: role !== -1 ? role : null,
          }
        );
        setListActivity([
          ...listActivity,
          {
            id: response.data.workflowTaskId,
            activityName: name,
            linkStatus: status,
            role: role === -1 ? null : roleDTO,
            listStatusTrans: [],
            description: `Description for task ${name}`,
            agent: agent ? agentDTO : null,
          },
        ]);
      } catch (err) {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator: ",
          confirmButtonText: "OK",
        });
      }
    };
    addActivity();
  };

  const deleteActivity = (id) => {
    const deleteWorkflowTask = async () => {
      try {
        const response = await axiosInstance.delete(
          `${URL.WORKFLOW_TASK_URL}/delete?workflowTaskId=${id}`
        );
        setListActivity(listActivity.filter((item) => item.id !== id));
      } catch (err) {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator: ",
          confirmButtonText: "OK",
        });
      }
    };
    deleteWorkflowTask();
  };

  const EditActivity = (
    id,
    activityNameInput,
    statusInput,
    roleInput,
    agentInput,
    activityDes,
    roleDTO,
    agentDTO
  ) => {
    const statusValue = parseInt(statusInput);
    const roleValue = parseInt(roleInput);
    // Tạo một bản sao của mảng activities để không thay đổi trực tiếp state
    const updatedActivities = [...listActivity];

    // Tìm index của activity có id tương ứng trong mảng activities
    const index = updatedActivities.findIndex((activity) => activity.id === id);

    // Kiểm tra nếu không tìm thấy activity với id tương ứng, thì kết thúc hàm
    if (index === -1) {
      Swal.fire({
        icon: "Error",
        title: "Error!",
        text: "The activity with the corresponding id could not be found.",
        confirmButtonText: "OK",
      });
      return;
    }
    const updateTask = async () => {
      try {
        const response = await axiosInstance.put(
          `${URL.WORKFLOW_TASK_URL}/update?workflowTaskId=${id}`,
          {
            WorkflowTaskName: activityNameInput,
            Status: statusInput,
            Description: activityDes,
            WorkflowId: flowId,
            AssignerId: agentInput,
            GroupId: roleInput,
          }
        );
        updatedActivities[index] = {
          ...updatedActivities[index],
          activityName: activityNameInput,
          linkStatus: statusInput,
          role: roleDTO,
          agent: agentDTO,
          description: activityDes,
        };
        console.log(updatedActivities);
        setListActivity(updatedActivities);
      } catch (err) {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator: ",
          confirmButtonText: "OK",
        });
      }
    };
    updateTask();
  };

  const addStatusTransition = (
    id,
    statusTranInput,
    destinationInput,
    checkCondition
  ) => {
    console.log(id);
    // Tạo một bản sao của mảng listActivity để không thay đổi trực tiếp state
    const updatedListActivity = [...listActivity];
    // Tìm index của activity có id tương ứng trong mảng listActivity
    const index = updatedListActivity.findIndex(
      (activity) => activity.id === id
    );
    // Kiểm tra nếu không tìm thấy activity với id tương ứng, thì kết thúc hàm
    if (index === -1) {
      Swal.fire({
        icon: "Error",
        title: "Error!",
        text: "The activity with the corresponding id could not be found.",
        confirmButtonText: "OK",
      });
      return;
    }
    const createTransition = async () => {
      try {
        const response = await axiosInstance.post(
          `${URL.WORKFLOW_TRANSITION_URL}/create`,
          {
            FromWorkflowTask: id,
            ToWorkflowTask: destinationInput,
            WorkflowTransitionName: statusTranInput,
            Condition: checkCondition,
          }
        );
        console.log(checkCondition);
        const newStatusTrans = {
          statusTran: statusTranInput,
          checkCondition: checkCondition,
          destination: destinationInput,
        };
        // Thêm đối tượng mới vào listStatusTrans của activity tìm thấy
        updatedListActivity[index].listStatusTrans.push(newStatusTrans);
        setListActivity(updatedListActivity);
      } catch (err) {
        Swal.fire({
          icon: "Error",
          title: "Error!",
          text: "System error, sorry, please contact administrator: ",
          confirmButtonText: "OK",
        });
      }
    };
    createTransition();
  };
  const deleteStatusTrans = (activityID, destination) => {
    const newArray = [...listActivity];
    const activity = newArray.find((item) => item.id === activityID);

    if (activity) {
      const deleteTransition = async () => {
        const response = await axiosInstance.delete(
          `${URL.WORKFLOW_TRANSITION_URL}/delete?fromWorkflowTaskId=${activityID}&toWorkflowTaskId=${destination}`
        );
        const filteredListStatusTrans = activity.listStatusTrans.filter(
          (statusTrans) => statusTrans.destination !== destination
        );
        activity.listStatusTrans = filteredListStatusTrans;
        setListActivity(newArray);
      };
      deleteTransition();
    }
  };

  const getTaskNameById = (id)=>{
    return listActivity.find(e=>e.id === id).activityName;
  }
  return (
    <div className="h-full overflow-y-scroll">
      <GeneralInfo flowId={flowId} checkEdit={checkEdit}/>
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
          <TextInfo
            listActivity={listActivity}
            handleAddNewActivity={addNewActivity}
            handleDeleteActivity={deleteActivity}
            handleEditActivity={EditActivity}
            handleAddStatusTransition={addStatusTransition}
            handleDeleteStatusTransition={deleteStatusTrans}
            getTaskNameById={getTaskNameById}
            checkEdit={checkEdit}
          />
        ) : (
          <DiagramInfo data={listActivity} />
        )}
      </div>
    </div>
  );
};

export default ViewWorkflow;
