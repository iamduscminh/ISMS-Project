import React, { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import image from "../../../assets/images";
import CustomCombobox from "../../../components/Elements/CustomCombobox";
import ServiceTypeItem from "../../../components/Elements/CustomCombobox/ServiceTypeItem";
import PriorityItem from "../../../components/Elements/CustomCombobox/PriorityItem";
import TicketStatus from "../../../components/Elements/TicketStatus";
import {
  MdKeyboardArrowDown,
  MdElectricalServices,
  MdDelete,
  MdSos,
  MdDangerous
} from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { SiMicrosoftword, SiMicrosoftexcel } from "react-icons/si";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { AiOutlineCloudUpload, AiOutlineUpload, AiOutlineFileDone } from "react-icons/ai";
import CommentComponent from "../../../components/Elements/CommentComponent";
import DefaultChange from "../../../components/Elements/ActivityComponent/DefaultChange";
import UserChange from "../../../components/Elements/ActivityComponent/UserChange";
import styled from "styled-components";
import ActivityComponent from "../../../components/Elements/ActivityComponent";
import { BiTask } from "react-icons/bi";
import {
  Button,
  Grid,
  IconButton,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import ModalDialog from "../../../components/Elements/PopupModal";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { URL } from "../../../utils/Url";
import IconTag from "../../../components/Elements/IconTag";
import { parseISO, format } from "date-fns";
import useAuth from "../../../hooks/useAuth";
import CommentTab from "./CommentTab";
import CustomField from "../../../components/Elements/CustomField";
import { useForm } from "react-hook-form";

const TicketDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    criteriaMode: "all",
  });
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { ticketId } = useParams();
  const axiosInstance = useAxiosPrivate();
  const [ticketDetail, setTicketDetail] = useState();
  const [listTask, setListTask] = useState();
  const [task, setTask] = useState();
  const [transition, setTransition] = useState();
  const [requestTicketExts, setRequestTicketExts] = useState([]);
  const [attachment, setAttachment] = useState();
  const [activity, setActivity] = useState();
  const [oldTask, setOldTask] = useState(null);

  const transitionMessageRef = useRef();

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.REQUEST_TICKET_URL}/get/${ticketId}`
        );
        console.log(response.data);
        setTicketDetail(response.data);
        setAttachment({
          fileName: response.data.attachmentEntity?.filename,
          filePath: response.data.attachmentEntity?.filePath,
        });
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };
    fetchTicketDetail();
  }, [axiosInstance]);

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const response = await Promise.all([
          axiosInstance.get(
            `${URL.WORKFLOW_ASSIGNMENT_URL}/get?requestTicketId=${ticketId}`
          ),
          axiosInstance.get(
            `${URL.REQUEST_TICKET_EXT_URL}/getExtForTicket/${ticketId}`
          ),
          axiosInstance.get(
            `${URL.REQUEST_TICKET_HIS_URL}/${ticketId}`
          )
        ]);
        console.log("list task");
        console.log(response[0].data);

        setListTask(response[0].data);
        const thisTask = response[0].data.find((e) => !e.completedTime);
        setTask(thisTask);
        setTransition(
          thisTask?.currentTask?.workflowTransitionDTOFroms[0]?.toWorkflowTask
        );
        if (response[1].data.length > 0) {
          const dataExtRp = response[1].data.map((item, i) => ({
            ticketId: item.ticketId,
            fieldId: item.fieldId,
            fieldValue: item.fieldValue,
            fieldCode: item.fieldEntity.fieldCode,
            fieldName: item.fieldEntity.fieldName,
            fieldType: item.fieldEntity.fieldType,
            valType: item.fieldEntity.valType,
            listOfValue: item.fieldEntity.listOfValue,
            listOfValueDisplay: item.fieldEntity.listOfValueDisplay,
          }));
          setRequestTicketExts(dataExtRp);
        }
        console.log('activity');
        console.log(response[2].data)
        setActivity(response[2].data);
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };
    fetchTicketDetail();
  }, [axiosInstance]);
  const [commentTab, setCommentTab] = useState(true);
  const showCommentTab = (queryCondition) => {
    setCommentTab(queryCondition);
  };

  const serviceData = [
    {
      id: 1,
      icon: <MdElectricalServices />,
      serviceName: "Hardware Service",
    },
    {
      id: 2,
      icon: <MdElectricalServices />,
      serviceName: "Account Service",
    },
  ];

  //Data cho priority Combobox
  const priorityData = [
    {
      id: 1,
      icon: <FcHighPriority />,
      priority: "High",
    },
    {
      id: 2,
      icon: <FcMediumPriority />,
      priority: "Medium",
    },
    {
      id: 3,
      icon: <FcLowPriority />,
      priority: "Low",
    },
  ];

  const priorityDataUrgency = [
    {
      id: 1,
      icon: <FcHighPriority />,
      priority: "High",
    },
    {
      id: 2,
      icon: <FcMediumPriority />,
      priority: "Medium",
    },
    {
      id: 3,
      icon: <FcLowPriority />,
      priority: "Low",
    },
    {
      id: 4,
      icon: <MdDangerous />,
      priority: "Urgency",
    }
  ];

  //Data cho comment

  const [ActivityData, setActivityData] = useState([
    {
      id: 1,
      type: "UserChange",
      image: image.avatar3,
      username: "Calyrex",
      action: "Change assigned user",
      time: "06:06 PM July 13, 2023",
      previous: "",
      update: {
        updateUser: "Gardevoir",
        image: image.avatar,
      },
    },
    {
      id: 2,
      type: "a",
      image: image.avatar3,
      username: "Calyrex",
      action: "Changed status",
      time: "05:06 PM July 13, 2023",
      previous: "Open",
      update: "Work in progress",
    },
  ]);

  const handleServiceTypeSelect = (selectedItem) => {
    console.log("Selected Service Type:", selectedItem);
    setTicketService(selectedItem);
  };

  const handlePrioritySelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setPriority(selectedItem);
  };

  const handleStatusSelect = (selectedItem) => {
    console.log("Selected:", selectedItem);
    setPriority(selectedItem);
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const getPriorityObject = (priority) => {
    return priorityData.find((e) => e.priority === priority);
  };
  const getPriorityUrgencyObject = (priority) => {
    return priorityDataUrgency.find((e) => e.priority === priority);
  };

  const handleCompleteTask = () => {
    if (transitionMessageRef.current.value === "") {
      alert('Need to confirm task completed');
      return;
    }
    if (task.assignee === null) {
      alert('The current task has not been assigned');
      return;
    }
    const formData = new FormData();
    formData.append("WorkflowAssignmentId", task.workflowAssignmentId);
    formData.append("FinisherId", auth.userId);
    formData.append("Message", transitionMessageRef.current.value);
    formData.append("File", selectedFiles[0]);
    formData.append("ToWorkFlowTask", transition);
    formData.append("IsCompleted", true);
    const completeTask = async () => {
      try {
        const response = await axiosInstance.post(
          `${URL.WORKFLOW_ASSIGNMENT_URL}/complete`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Task has been sent successfully");
        navigate("/admin/all/null");
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };
    completeTask();
  };

  const handleFileUpload = () => {
    // Xử lý upload file ở đây
    if (selectedFiles.length > 0) {
      // Gọi API hoặc thực hiện hành động cần thiết với selectedFiles
      console.log("Đã upload các file:", selectedFiles);
    } else {
      console.log("Vui lòng chọn file để upload.");
    }
  };

  const handleFileClear = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  const formatFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.substr(0, maxLength - 3) + "...";
    }
  };

  const handleAssignToMe = () => {
    const assign = async () => {
      try {
        const response = await axiosInstance.post(`${URL.WORKFLOW_ASSIGNMENT_URL}/assign`, {
          WorkflowAssignmentId: task.workflowAssignmentId,
          AssigneeId: auth.userId
        })
        console.log(response);
        setTask(task => ({
          ...task,
          assignee: response.data.userDTO
        }));
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message)
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    }
    assign();
  }

  const handleSetOldTask = (selectTask) => {
    if (task === selectTask) {
      setOldTask(null);
    } else {
      setOldTask(selectTask);
    }
  }


  // Đoạn Code dưới đây dành riêng cho phần Incidents
  const handleChangeStatusIncident = (selectedStatus) => {
    if (!ticketDetail.assignedTo) {
      alert("The current task has not been assigned")
      return;
    }
    const callAPIUpdateStatus = async () => {
      try {
        const response = await axiosInstance.put(`${URL.REQUEST_TICKET_URL}/update`, {
          RequestTicketId: ticketId,
          Status: selectedStatus,
          Impact: ticketDetail.impact,
          Urgency: ticketDetail.urgency,
          AssignedTo: auth.userId
        });
        setTicketDetail(item => ({
          ...item,
          status: selectedStatus
        }));
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message)
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    }
    callAPIUpdateStatus();
  }

  const handleChangeImpactIncident = (selectedImpact) => {
    if (!ticketDetail.assignedTo) {
      alert("The current task has not been assigned")
      return;
    }
    const callAPIUpdateImpact = async () => {
      try {
        const response = await axiosInstance.put(`${URL.REQUEST_TICKET_URL}/update`, {
          RequestTicketId: ticketId,
          Status: ticketDetail.status,
          Impact: selectedImpact,
          Urgency: ticketDetail.urgency,
          AssignedTo: auth.userId
        });
        console.log(response);
        setTicketDetail(item => ({
          ...item,
          impact: selectedImpact,
          priority: response.data.updateRequestTicketDTO.priority
        }));
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message)
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    }
    callAPIUpdateImpact();
  }

  const handleChangeUrgencyIncident = (selectedUrgency) => {
    if (!ticketDetail.assignedTo) {
      alert("The current task has not been assigned")
      return;
    }
    const callAPIUpdateUrgency = async () => {
      try {
        const response = await axiosInstance.put(`${URL.REQUEST_TICKET_URL}/update`, {
          RequestTicketId: ticketId,
          Status: ticketDetail.status,
          Impact: ticketDetail.impact,
          Urgency: selectedUrgency,
          AssignedTo: auth.userId
        });
        setTicketDetail(item => ({
          ...item,
          urgency: selectedUrgency,
          priority: response.data.updateRequestTicketDTO.priority
        }));
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message)
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    }
    callAPIUpdateUrgency();
  }

  const handleAssignToMeIncident = () => {
    const callAPIUpdateAssignee = async () => {
      try {
        const response = await axiosInstance.put(`${URL.REQUEST_TICKET_URL}/update`, {
          RequestTicketId: ticketId,
          Status: ticketDetail.status,
          Impact: ticketDetail.impact,
          Urgency: ticketDetail.urgency,
          AssignedTo: auth.userId
        });
        setTicketDetail(item => ({
          ...item,
          assignedTo: response.data.updateRequestTicketDTO.assignedTo,
          assignedToUserEntity: response.data.updateRequestTicketDTO.assignedToUserEntity
        }));
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message)
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    }
    callAPIUpdateAssignee();
  }


  const maxLength = 20; // Độ dài tối đa của tên file

  const TabSelect = styled.div`
    width: 50%;
    height: 6px;
    background: #42526E;
    position: absolute;
    bottom: 0;
    left: ${commentTab ? "0" : "50%"}
    transition: 350ms;
  `;
  return (
    <div className="flex flex-col w-full h-[90vh]">
      <div className="h-[5%] bg-[#42526E] flex text-[#ffF] font-medium text-[1rem] justify-start items-center pl-[3rem]">
        <Link to={"/admin"}>
          <div className="flex items-center">
            <IoIosArrowBack className="text-[1.25rem] mr-[0.25rem] cursor-pointer" />
            <div>
              <span className="mr-[3rem] hover:underline">Back</span>
            </div>
          </div>
        </Link>
        <div>
          <span className="mr-[0.5rem]">{ticketDetail?.requestTicketId}:</span>
          <span>{ticketDetail?.title}</span>
        </div>
        {ticketDetail?.isIncident &&
          <ModalDialog
            title={"Create Problem/Change"}
            actionText={"Create"}
            triggerComponent={
              <button className="px-[1rem] ml-[1rem] bg-[#043ac5]">Link Issues</button>
            }
            customSize="md"
          >
            <div>
              <div class="mb-4">
                <label for="selectChoice" class="block text-gray-700 font-bold mb-2">Select Choice</label>
                <select id="selectChoice" name="selectChoice" class="w-full px-4 py-2 border rounded-md">
                  <option value="problem">Problem</option>
                  <option value="change">Change</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="title" class="block text-gray-700 font-bold mb-2">Title</label>
                <input type="text" id="title" name="title" class="w-full px-4 py-2 border rounded-md"/>
              </div>
              <div class="mb-4">
                <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
                <textarea id="description" name="description" class="w-full px-4 py-2 border rounded-md"></textarea>
              </div>
              <div class="mb-4">
                <label for="incidents" class="block text-gray-700 font-bold mb-2">Incidents</label>
                <select id="incidents" name="incidents" class="w-full px-4 py-2 border rounded-md" multiple>
                  <option value="incident1">Incident 1</option>
                  <option value="incident2">Incident 2</option>
                  <option value="incident1">Incident 3</option>
                  <option value="incident2">Incident 4</option>
                  <option value="incident1">Incident 5</option>
                  <option value="incident2">Incident 6</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="assignee" class="block text-gray-700 font-bold mb-2">Assignee</label>
                <select id="assignee" name="assignee" class="w-full px-4 py-2 border rounded-md">
                  <option value="assignee1">Assignee 1</option>
                  <option value="assignee2">Assignee 2</option>
                </select>
              </div>
            </div>
          </ModalDialog>
        }
      </div>
      <div className="w-full px-[1rem] py-[1rem] flex">
        <div className="w-[30%]">
          <div className="w-[full] bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
            <div className="w-[full] flex items-center justify-start">
              <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden mr-[1rem]">
                <img
                  className="w-full h-full object-cover object-center"
                  src={ticketDetail?.requesterUserEntity?.avatar}
                  alt=""
                />
              </div>
              <a className="text-[1.15rem] mr-[0.5rem] cursor-pointer text-[#043ac5]">
                {ticketDetail?.requesterUserEntity?.fullName}
              </a>
              <h3 className="text-[1.15rem]">create this Request</h3>
            </div>

            <div className="mt-[1.75rem]">
              <h3 className="text-[1rem] font-medium text-[#42526E] mb-[0.75rem]">
                Description
              </h3>
              <p className="text-[#747272] text-[1rem]">
                {ticketDetail?.description}
              </p>
            </div>

            {!ticketDetail?.isIncident ? <div className="flex items-center mt-[1rem]">
              <h3 className="text-[#42526E] min-w-[40%] font-medium">
                Request Type
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "0.5rem",
                }}
              >
                <IconTag
                  className="text-[1.25rem]"
                  name={
                    ticketDetail?.serviceItemEntity?.iconDisplay ||
                    "AiFillCustomerService"
                  }
                />
                <div className="ml-[0.5rem]">
                  <span className="text-[#747272]">
                    <a href="#">
                      {ticketDetail
                        ? ticketDetail?.serviceItemEntity?.serviceItemName
                        : " "}
                    </a>
                  </span>
                </div>
              </div>
            </div> : ""}

            {!ticketDetail?.isIncident ? <div className="flex items-center mt-[1rem]">
              <h3 className="text-[#42526E] min-w-[40%] font-medium">
                Service Categories
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "0.5rem",
                }}
              >
                <div className="ml-[0.5rem]">
                  <span className="text-[#747272]">
                    <a href="#">
                      {ticketDetail
                        ? ticketDetail.serviceItemEntity?.serviceCategoryEntity
                          ?.serviceCategoryName
                        : " "}
                    </a>
                  </span>
                </div>
              </div>
            </div> : ""}

            <div className="detail-content-custom mt-[0.5rem]">
              {requestTicketExts.length > 0 &&
                requestTicketExts.map((item, i) => (
                  <CustomField
                    key={i}
                    fieldId={item.fieldId}
                    fieldCode={item.fieldCode}
                    fieldName={item.fieldName}
                    fieldType={item.fieldType}
                    valType={item.valType}
                    fieldValue={item.fieldValue}
                    listOfValue={item.listOfValue}
                    listOfValueDisplay={item.listOfValueDisplay}
                    register={register}
                  />
                ))}
            </div>
            {console.log("file")}
            {console.log(attachment)}
            {attachment?.fileName && (
              <div className="mb-6">
                <label
                  htmlFor="rqtFile"
                  className="block mb-2 text-lg font-medium text-[#42526E] "
                >
                  File Attachment
                </label>
                <div className="file-attachment flex items-center">
                  <IconTag name={"AiFillFile"} className={"mr-2"} />
                  <a
                    href={attachment?.filePath}
                    className="hover:text-blue-500 text-[#747272]"
                  >
                    {attachment?.fileName}
                  </a>
                </div>
                <p className="mt-2 text-sm text-red-600 ">
                  {errors.rqtFile && errors.rqtFile.message}
                </p>
              </div>
            )}
            {/* <CustomCombobox
              component={ServiceTypeItem}
              data={serviceData}
              onSelect={handleServiceTypeSelect}
              value={ticketService}
              overlay={3}
              showProp1="icon"
              showProp2="serviceName"
              wrapper="FF7452"
            /> */}
            <div className="w-[full] mt-[0rem] mb-[1rem]">
              <TicketStatus
                isServiceRequest={!ticketDetail?.isIncident}
                currentStatus={ticketDetail ? ticketDetail?.status : " "}
                onSelect={handleChangeStatusIncident}
                customStyles={{
                  paddingY: "py-[0.5rem]",
                  zIndex: "z-50",
                }}
              />
            </div>
          </div>
          <div className="mt-[1.5rem] w-[full] bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
            <div className="flex justify-between items-center">
              <h4 className="text-[#42526E] text-[1.25rem] font-medium">
                Priority
              </h4>
              <div className="w-[50%]">
                <CustomCombobox
                  isServiceRequest={true}
                  component={PriorityItem}
                  data={priorityDataUrgency}
                  onSelect={handlePrioritySelect}
                  value={getPriorityUrgencyObject(ticketDetail?.priority)}
                  overlay={2}
                  showProp1="icon"
                  showProp2="priority"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h4 className="text-[#42526E] text-[1.25rem] font-medium">
                Impact
              </h4>
              <div className="w-[50%]">
                <CustomCombobox
                  isServiceRequest={!ticketDetail?.isIncident}
                  component={PriorityItem}
                  data={priorityData}
                  onSelect={handleChangeImpactIncident}
                  value={getPriorityObject(ticketDetail?.impact)}
                  overlay={3}
                  showProp1="icon"
                  showProp2="priority"
                />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h4 className="text-[#42526E] text-[1.25rem] font-medium">
                Urgency
              </h4>
              <div className="w-[50%]">
                <CustomCombobox
                  isServiceRequest={!ticketDetail?.isIncident}
                  component={PriorityItem}
                  data={priorityData}
                  onSelect={handleChangeUrgencyIncident}
                  value={getPriorityObject(ticketDetail?.urgency)}
                  overlay={2}
                  showProp1="icon"
                  showProp2="priority"
                />
              </div>
            </div>

            <div className="mt-[1.5rem] flex flex-col">
              <div>
                <h4 className="text-[1.1rem] text-[#42526E] font-medium">
                  Time to Resolution SLA
                </h4>
                <div className="flex items-center justify-start text-[#747272] mt-[0.5rem]">
                  <span>
                    {ticketDetail
                      ? format(
                        parseISO(ticketDetail?.firstResolutionDue),
                        "MMM-dd-yyyy HH:mm"
                      )
                      : " "}
                  </span>
                  {/* <span className="ml-[1rem]">4h00 to due</span> */}
                </div>
              </div>
            </div>

            <div className="mt-[1.5rem] flex flex-col">
              <div>
                <h4 className="text-[1.1rem] text-[#42526E] font-medium">
                  Time to first response SLA
                </h4>
                <div className="flex items-center justify-start text-[#747272] mt-[0.5rem]">
                  <span>
                    {ticketDetail
                      ? format(
                        parseISO(ticketDetail?.firstResponseDue),
                        "MMM-dd-yyyy HH:mm"
                      )
                      : " "}
                  </span>
                  {/* <span className="ml-[1rem]">2h00 to due</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!ticketDetail?.isIncident ? <div className="w-[33%] ml-[1rem]">
          <div className="w-full bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">

            {oldTask ? <div>
              <h1 className="text-[1.25rem] font-semibold text-[#42526E]">
                {oldTask?.currentTask?.workflowTaskName}
              </h1>
              <p className="text-[#747272]">
                {oldTask?.currentTask?.description}
              </p>
            </div> : <div>
              <h1 className="text-[1.25rem] font-semibold text-[#42526E]">
                {task ? task?.currentTask?.workflowTaskName : " "}
              </h1>
              <p className="text-[#747272]">
                {task ? task?.currentTask?.description : " "}
              </p>
            </div>
            }

            <div>
              <div className="flex items-center mt-[1rem]">
                <h3 className="text-[#42526E] min-w-[40%] font-medium">
                  Assignee
                </h3>
                {
                  oldTask ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden cursor-pointer">
                        <img
                          className="w-full h-full object-cover object-center"
                          src={oldTask?.assignee?.avatar}
                          alt=""
                        />
                      </div>
                      <div className="ml-[0.5rem]">
                        <span className="text-[#747272]">
                          <Link to={`/profile/${oldTask?.assignee?.userId}`}>
                            {oldTask?.assignee?.fullName}
                          </Link>
                        </span>
                      </div>
                    </div>
                  ) : task?.assignee ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden cursor-pointer">
                        <img
                          className="w-full h-full object-cover object-center"
                          src={task?.assignee?.avatar}
                          alt=""
                        />
                      </div>
                      <div className="ml-[0.5rem]">
                        <span className="text-[#747272]">
                          <Link to={`/profile/${task?.assignee?.userId}`}>
                            {task?.assignee?.fullName}
                          </Link>
                        </span>
                      </div>
                    </div>
                  ) : task?.currentTask?.status === "Resolved" ? (
                    <></>
                  ) : (
                    <div>
                      <button onClick={handleAssignToMe} className="text-[#fff] font-medium px-[0.75rem] bg-[#043AC5]">
                        Assign to me
                      </button>
                    </div>
                  )
                }
              </div>

              {/* <div className="flex items-center mt-[1rem]">
                <h3 className="text-[#42526E] min-w-[40%] font-medium">
                  Reporter
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "0.5rem",
                  }}
                >
                  <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden cursor-pointer">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={image.avatar4}
                      alt=""
                    />
                  </div>
                  <div className="ml-[0.5rem]">
                    <span className="text-[#747272]">
                      <a href="#">Spectrier</a>
                    </span>
                  </div>
                </div>
              </div> */}
              {oldTask && <div>
                <h3 className="text-[#42526E] min-w-[40%] font-medium">
                  Complete confirmation
                </h3>
                <div className="w-[full] mx-[0.25rem]">
                  <p
                    className="w-full h-full resize-none py-[0.5rem] italic"
                  >{oldTask?.message}</p>
                </div>
              </div>}
              <div className="flex mt-[1rem]">
                {oldTask ? <>
                  <h3 className="text-[#42526E] min-w-[40%] font-medium">
                    Related Docs
                  </h3>
                  <div className="flex flex-col">

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <AiOutlineFileDone className="cursor-pointer text-[#295296]" />
                      <div className="ml-[0.5rem]">
                        <span className="text-[#747272]">
                          {oldTask.attachment ? <a href={oldTask.attachment.filePath}>{oldTask.attachment.filename}</a> : ""}
                        </span>
                      </div>

                    </div>
                  </div></>
                  : ""}


              </div>
              {(task?.currentTask?.status !== "Resolved" && oldTask === null) && (
                <div>
                  <h3 className="text-[#42526E] min-w-[40%] font-medium">
                    Check Transition
                  </h3>
                  <div className="mt-[1rem] translate-x-[-1rem]">
                    <div className="w-[full] mx-[0.25rem] ml-[1rem]">
                      <textarea
                        ref={transitionMessageRef}
                        rows={2}
                        className="w-full h-full resize-none px-[0.75rem] py-[0.5rem] border-2 border-[#747272] rounded-md"
                        placeholder="@ to tag someone"
                      ></textarea>
                    </div>
                    <div className="mt-[0.25rem]">
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="self-start"
                          >
                            <Input
                              type="file"
                              onChange={handleFileChange}
                              inputProps={{
                                accept:
                                  "image/*, .pdf, .doc, .docx, .xls, .xlsx, .txt, .csv",
                                multiple: true,
                              }}
                              style={{ display: "none" }}
                              id="file-input"
                            />
                            <label htmlFor="file-input">
                              <Button
                                variant="contained"
                                component="span"
                                startIcon={<AiOutlineUpload />}
                              >
                                Upload
                              </Button>
                            </label>
                            <div className="flex flex-col items-start">
                              {selectedFiles.length > 0 &&
                                selectedFiles.map((file, index) => (
                                  <React.Fragment key={index}>
                                    <div className="flex ">
                                      <Typography>
                                        {formatFileName(file.name, maxLength)}
                                      </Typography>
                                      <IconButton
                                        onClick={() => handleFileClear(index)}
                                        size="small"
                                      >
                                        <MdDelete />
                                      </IconButton>
                                    </div>
                                  </React.Fragment>
                                ))}
                            </div>
                          </Stack>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-[20vh] overflow-y-scroll cursor-default mt-[1rem]">
              {listTask?.map((item, index) => {
                if (item.currentTask.workflowTaskId === task.currentTask.workflowTaskId) {
                  return (
                    <div onClick={() => handleSetOldTask(item)} className="flex items-center font-medium bg-[#043AC5] text-[#fff] px-[1rem] py-[0.5rem] cursor-pointer">
                      <BiTask className="mr-[0.5rem]" />
                      <h3>{item?.currentTask?.workflowTaskName}</h3>
                    </div>
                  );
                } else {
                  return (
                    <div onClick={() => handleSetOldTask(item)} className="flex items-center text-[#42526E] px-[1rem] py-[0.5rem] cursor-pointer">
                      <BiTask className="mr-[0.5rem]" />
                      <h3>{item?.currentTask?.workflowTaskName}</h3>
                    </div>
                  );
                }
              })}
            </div>

            {task?.currentTask?.status !== "Resolved" ? (
              <div className="mt-[1rem] flex">
                <select
                  value={
                    task?.currentTask?.workflowTransitionDTOFroms[0]
                      .toWorkflowTask
                  }
                  onChange={(e) => setTransition(e.target.value)}
                  className="border-2 border-[#42526E] rounded-md px-[0.75rem] mr-[1rem]"
                >
                  {task?.currentTask?.workflowTransitionDTOFroms.map(
                    (item, index) => (
                      <option key={index} value={item.toWorkflowTask}>
                        {item.workflowTransitionName}
                      </option>
                    )
                  )}
                </select>
                <ModalDialog
                  title={"Transition Task"}
                  actionText={"Change"}
                  actionHandler={handleCompleteTask}
                  triggerComponent={
                    <button className="px-[0.75rem] bg-[#043AC5] text-[#fff] font-medium">
                      Change
                    </button>
                  }
                  customSize="md"
                ></ModalDialog>
              </div>
            ) : task?.currentTask?.status === "Resolved" || task?.currentTask?.status === "Closed" || task?.currentTask?.status === "Cancelled" ? (
              task?.currentTask?.status === "Resolved" ? (
                <div className="flex">
                  <div>This Ticket has been Resolved</div>
                  {/* {auth.roletype === "Admin" && <button className="ml-[1rem] px-[1rem] bg-[#043AC5] text-[#fff] font-medium">Closed</button>} */}
                </div>
              ) : 
              "This Ticket has been closed"
            ) : (
              <div>This Task does not has any Transition</div>
            )}
          </div>
        </div> :

          <div className="w-[33%] ml-[1rem]">
            <div className="w-full bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
              <div>
                <div className="flex items-center mt-[1rem]">
                  <h3 className="text-[#42526E] min-w-[40%] font-medium">
                    Assignee
                  </h3>
                  {
                    ticketDetail?.assignedTo === null ?
                      <div>
                        <button onClick={handleAssignToMeIncident} className="text-[#fff] font-medium px-[0.75rem] bg-[#043AC5]">
                          Assign to me
                        </button>
                      </div> :
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "0.5rem",
                        }}
                      >
                        <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden cursor-pointer">
                          <img
                            className="w-full h-full object-cover object-center"
                            src={ticketDetail?.assignedToUserEntity?.avatar}
                            alt=""
                          />
                        </div>
                        <div className="ml-[0.5rem]">
                          <span className="text-[#747272]">
                            <Link to={`/profile/${ticketDetail?.assignedTo}`}>
                              {ticketDetail?.assignedToUserEntity?.fullName}
                            </Link>
                          </span>
                        </div>
                      </div>
                  }
                </div>
                {oldTask && <div>
                  <h3 className="text-[#42526E] min-w-[40%] font-medium">
                    Complete confirmation
                  </h3>
                  <div className="w-[full] mx-[0.25rem]">
                    <p
                      className="w-full h-full resize-none py-[0.5rem] italic"
                    >{oldTask?.message}</p>
                  </div>
                </div>}
                <div className="flex mt-[1rem]">
                  {oldTask ? <>
                    <h3 className="text-[#42526E] min-w-[40%] font-medium">
                      Related Docs
                    </h3>
                    <div className="flex flex-col">

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "0.5rem",
                        }}
                      >
                        <AiOutlineFileDone className="cursor-pointer text-[#295296]" />
                        <div className="ml-[0.5rem]">
                          <span className="text-[#747272]">
                            {oldTask.attachment ? <a href={oldTask.attachment.filePath}>{oldTask.attachment.filename}</a> : ""}
                          </span>
                        </div>

                      </div>
                    </div></>
                    : ""}


                </div>
                {(task?.currentTask?.status !== "Resolved" && oldTask === null) && (
                  // <div>
                  //   <h3 className="text-[#42526E] min-w-[40%] font-medium">
                  //     Check Transition
                  //   </h3>
                  //   <div className="mt-[1rem] translate-x-[-1rem]">
                  //     <div className="w-[full] mx-[0.25rem] ml-[1rem]">
                  //       <textarea
                  //         ref={transitionMessageRef}
                  //         rows={2}
                  //         className="w-full h-full resize-none px-[0.75rem] py-[0.5rem] border-2 border-[#747272] rounded-md"
                  //         placeholder="@ to tag someone"
                  //       ></textarea>
                  //     </div>
                  //     <div className="mt-[0.25rem]">
                  //       <Grid container spacing={2}>
                  //         <Grid item xs={12}>
                  //           <Stack
                  //             direction="row"
                  //             spacing={2}
                  //             alignItems="self-start"
                  //           >
                  //             <Input
                  //               type="file"
                  //               onChange={handleFileChange}
                  //               inputProps={{
                  //                 accept:
                  //                   "image/*, .pdf, .doc, .docx, .xls, .xlsx, .txt, .csv",
                  //                 multiple: true,
                  //               }}
                  //               style={{ display: "none" }}
                  //               id="file-input"
                  //             />
                  //             <label htmlFor="file-input">
                  //               <Button
                  //                 variant="contained"
                  //                 component="span"
                  //                 startIcon={<AiOutlineUpload />}
                  //               >
                  //                 Upload
                  //               </Button>
                  //             </label>
                  //             <div className="flex flex-col items-start">
                  //               {selectedFiles.length > 0 &&
                  //                 selectedFiles.map((file, index) => (
                  //                   <React.Fragment key={index}>
                  //                     <div className="flex ">
                  //                       <Typography>
                  //                         {formatFileName(file.name, maxLength)}
                  //                       </Typography>
                  //                       <IconButton
                  //                         onClick={() => handleFileClear(index)}
                  //                         size="small"
                  //                       >
                  //                         <MdDelete />
                  //                       </IconButton>
                  //                     </div>
                  //                   </React.Fragment>
                  //                 ))}
                  //             </div>
                  //           </Stack>
                  //         </Grid>
                  //       </Grid>
                  //     </div>
                  //   </div>
                  // </div>
                  <div></div>
                )}
              </div>

              <div className="mt-[1rem]">
                <div className="text-[#42526E] font-medium">Related Ticket</div>
                <div className="h-[20vh] overflow-y-scroll cursor-default mt-[1rem]">
                  <div onClick={() => handleSetOldTask()} className="flex items-center text-[#42526E] px-[1rem] py-[0.5rem] cursor-pointer">
                    <BiTask className="mr-[0.5rem]" />
                    <h3>RETK000120: Mất điện thoại rồi</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>}
        <div className="w-[37%] ml-[1rem]">
          <div className="w-full bg-[#fff] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE] overflow-hidden">
            <div className=" relative w-full h-[2.75rem]">
              <div className="w-full flex justify-center items-center">
                <div
                  onClick={() => showCommentTab(true)}
                  className=" cursor-pointer w-[50%] h-full flex justify-center items-center text-[#42526E] text-[1.25rem] font-medium"
                >
                  <span>Comment</span>
                </div>
                <div
                  onClick={() => showCommentTab(false)}
                  className=" cursor-pointer w-[50%] h-full flex justify-center items-center text-[#42526E] text-[1.25rem] font-medium"
                >
                  <span>Activity</span>
                </div>
              </div>
              <TabSelect />
            </div>
            {commentTab ? (
              <CommentTab requestTicketId={ticketId} />
            ) : (
              <div className="px-[1rem] my-[2rem] max-h-[500px] overflow-y-scroll">
                {activity.map((item) => (
                  <ActivityComponent key={item.id} activity={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
