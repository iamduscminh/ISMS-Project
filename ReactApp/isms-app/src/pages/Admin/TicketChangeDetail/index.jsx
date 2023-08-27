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
  MdDangerous,
} from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { SiMicrosoftword, SiMicrosoftexcel } from "react-icons/si";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import {
  AiOutlineCloudUpload,
  AiOutlineUpload,
  AiOutlineFileDone,
} from "react-icons/ai";
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
import SearchAgent from "../Settings/WorkflowSettings/ViewWorkflow/SearchAgent";

const TicketChangeDetail = () => {
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
  const { changId } = useParams();
  const axiosInstance = useAxiosPrivate();
  const [ticketDetail, setTicketDetail] = useState();
  const [attachment, setAttachment] = useState();
  const [activity, setActivity] = useState();
  const [dataAgentIncident, setDataAgentIncident] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const transitionMessageRef = useRef();

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };
  const handleFileClear = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);
  };

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.CHANGE_URL}/${changId}`
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
          axiosInstance.get(`${URL.REQUEST_TICKET_HIS_URL}/change/${changId}`),
        ]);
        console.log(response[0].data)
        setActivity(response[0].data);
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };
    fetchTicketDetail();
  }, [axiosInstance]);

  useEffect(() => {
    const fetchDataAgentIncident = async () => {
      try {
        const response = await axiosInstance.get(`${URL.USER_URL}/getall`);
        const listUser = response.data.filter(e=>e.role !==null );
        setDataAgentIncident(listUser);
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };
    fetchDataAgentIncident();
  }, [axiosInstance]);

  // useEffect(()=>{
  //   const fetchDataAgentGroup = async () =>{
  //     if(!ticketDetail.assignToGroup){
  //       return;
  //     }
  //     try{
  //       const response = await axiosInstance.get(`${URL.USER_URL}/getall`);
  //       setDataAgentIncident(response.data);
  //     }catch(err){
  //       alert("System error, sorry, please contact administrator: ", err);
  //     }
  //   }
  //   fetchDataAgentGroup();
  // }, [axiosInstance]);

  const handleReAssign = (userId) => {
    console.log(userId);
    const callAPIUpdateAssignee = async () => {
      try {
        const formData = new FormData();
        formData.append("ChangeId", ticketDetail.changeId);
        formData.append("Status", ticketDetail.status);
        formData.append("Priority", ticketDetail.priority);
        formData.append("AttachmentFile", selectedFiles[0]);
        formData.append("Impact", ticketDetail.impact);
        formData.append("ReasonForChange", ticketDetail.reasonForChange);
        formData.append("AssigneeId", userId);
        formData.append("Title", ticketDetail.title);
        formData.append("Description", ticketDetail.description);
        const response = await axiosInstance.put(
          `${URL.CHANGE_URL}/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setTicketDetail((item) => ({
          ...item,
          assignee: response.data.changeDTO.assignee
        }));
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    };
    callAPIUpdateAssignee();
  };

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
    },
  ];

  const getPriorityObject = (priority) => {
    return priorityData.find((e) => e.priority === priority);
  };
  const getPriorityUrgencyObject = (priority) => {
    return priorityDataUrgency.find((e) => e.priority === priority);
  };

  const formatFileName = (fileName, maxLength) => {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.substr(0, maxLength - 3) + "...";
    }
  };

  // Đoạn Code dưới đây dành riêng cho phần Incidents
  const handleChangeStatusIncident = (selectedStatus) => {
    if (!ticketDetail.assignee) {
      alert("The current task has not been assigned");
      return;
    }
    if (ticketDetail.assignee.userId !== auth.userId) {
      alert("The current task has not been assigned to you")
      return;
    }
    const formData = new FormData();
    formData.append("ChangeId", ticketDetail.changeId);
    formData.append("Status", selectedStatus);
    formData.append("Priority", ticketDetail.priority);
    formData.append("AttachmentFile", selectedFiles[0]);
    formData.append("Impact", ticketDetail.impact);
    formData.append("ReasonForChange", ticketDetail.reasonForChange);
    formData.append("AssigneeId", auth.userId);
    formData.append("Title", ticketDetail.title);
    formData.append("Description", ticketDetail.description);

    const callAPIUpdateStatus = async () => {
      try {
        const response = await axiosInstance.put(
          `${URL.CHANGE_URL}/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data)
        setTicketDetail((item) => ({
          ...item,
          status: selectedStatus,
          attachment: response.data.changeDTO.attachment
        }));
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    };
    callAPIUpdateStatus();
  };

  const handleChangeImpactIncident = (selectedImpact) => {
    if (!ticketDetail.assignee) {
      alert("The current task has not been assigned");
      return;
    }
    if (ticketDetail.assignee.userId !== auth.userId) {
      alert("The current task has not been assigned to you")
      return;
    }
    const formData = new FormData();
    formData.append("ChangeId", ticketDetail.changeId);
    formData.append("Status", ticketDetail.status);
    formData.append("Priority", ticketDetail.priority);
    formData.append("AttachmentFile", selectedFiles[0]);
    formData.append("Impact", selectedImpact);
    formData.append("ReasonForChange", ticketDetail.reasonForChange);
    formData.append("AssigneeId", auth.userId);
    formData.append("Title", ticketDetail.title);
    formData.append("Description", ticketDetail.description);
    const callAPIUpdateImpact = async () => {
      try {
        const response = await axiosInstance.put(
          `${URL.CHANGE_URL}/update`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setTicketDetail((item) => ({
          ...item,
          impact: selectedImpact,
          priority: response.data.changeDTO.priority,
        }));
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    };
    callAPIUpdateImpact();
  };

  const handleAssignToMeIncident = () => {
    const callAPIUpdateAssignee = async () => {
      try {
        const response = await axiosInstance.put(
          `${URL.REQUEST_TICKET_URL}/update`,
          {
            RequestTicketId: changId,
            Status: ticketDetail.status,
            Impact: ticketDetail.impact,
            Urgency: ticketDetail.urgency,
            AssignedTo: auth.userId,
          }
        );
        setTicketDetail((item) => ({
          ...item,
          assignedTo: response.data.updateRequestTicketDTO.assignedTo,
          assignedToUserEntity:
            response.data.updateRequestTicketDTO.assignedToUserEntity,
        }));
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    };
    callAPIUpdateAssignee();
  };

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
          <span className="mr-[0.5rem]">{ticketDetail?.changeId}:</span>
          <span>{ticketDetail?.title}</span>
        </div>
        {ticketDetail?.isIncident && (
          <ModalDialog
            title={"Create Problem/Change"}
            triggerComponent={
              <button className="px-[1rem] ml-[1rem] bg-[#043ac5]">
                Link Issues
              </button>
            }
            customSize="md"
          ></ModalDialog>
        )}
      </div>
      <div className="w-full px-[1rem] py-[1rem] flex">
        <div className="w-[30%]">
          <div className="w-[full] bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
            <div className="w-[full] flex items-center justify-start">
              <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden mr-[1rem]">
                <img
                  className="w-full h-full object-cover object-center"
                  src={ticketDetail?.requester?.avatar}
                  alt=""
                />
              </div>
              <a className="text-[1.15rem] mr-[0.5rem] cursor-pointer text-[#043ac5]">
                {ticketDetail?.requester?.fullname}
              </a>
              <h3 className="text-[1.15rem]">create this Change</h3>
            </div>

            <div className="mt-[1.75rem]">
              <h3 className="text-[1rem] font-medium text-[#42526E] mb-[0.75rem]">
                Description
              </h3>
              <p className="text-[#747272] text-[1rem]">
                {ticketDetail?.description}
              </p>
            </div>

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
                isServiceRequest={false}
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
                  // onSelect={handlePrioritySelect}
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
                  isServiceRequest={false}
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

            {/* <div className="flex justify-between items-center">
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
            </div> */}

            <div className="mt-[1.5rem] flex flex-col">
              <div>
                <h4 className="text-[1.1rem] text-[#42526E] font-medium">
                  Time to Resolution SLA
                </h4>
                <div className="flex items-center justify-start text-[#747272] mt-[0.5rem]">
                  <span>
                    {ticketDetail
                      ? format(
                          parseISO(ticketDetail?.resolutionTime),
                          "MMM-dd-yyyy HH:mm"
                        )
                      : " "}
                  </span>
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
                          parseISO(ticketDetail?.responseTime),
                          "MMM-dd-yyyy HH:mm"
                        )
                      : " "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          <div className="w-[33%] ml-[1rem]">
            <div className="w-full bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
              <div>
                <div className="flex items-center mt-[1rem]">
                  <h3 className="text-[#42526E] min-w-[40%] font-medium">
                    Assignee
                  </h3>
                  {ticketDetail?.assignee === null ? (
                    <div>
                      <button
                        onClick={handleAssignToMeIncident}
                        className="text-[#fff] font-medium px-[0.75rem] bg-[#043AC5]"
                      >
                        Assign to me
                      </button>
                    </div>
                  ) : (
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
                          src={ticketDetail?.assignee?.avatar}
                          alt=""
                        />
                      </div>
                      <div className="ml-[0.5rem]">
                        <span className="text-[#747272]">
                          <Link to={`/profile/${ticketDetail?.assignedTo}`}>
                            {ticketDetail?.assignee?.fullName}
                          </Link>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {ticketDetail?.assignee && dataAgentIncident && (
                  <div className="w-full ml-[40%] mt-[1rem]">
                    <SearchAgent
                      agentData={dataAgentIncident}
                      handleAddAgent={handleReAssign}
                    />
                  </div>
                )}
              </div>

              <div className="mt-[1rem]">
                <div className="text-[#42526E] font-medium">Related Ticket</div>
                <div className="h-[20vh] overflow-y-scroll cursor-default mt-[1rem]">
                  {ticketDetail?.requestTickets?.map((item, index) => (
                    <div
                      onClick={() => {
                        navigate(`/admin/ticket/${item.requestTicketId}`);
                      }}
                      key={index}
                      className="flex items-center text-[#42526E] px-[1rem] py-[0.5rem] cursor-pointer"
                    >
                      <BiTask className="mr-[0.5rem]" />
                      <h3>{`${item.requestTicketId}: ${item.title}`}</h3>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex mt-[1rem] mb-[1rem]">
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
                        {ticketDetail ? (
                          <a href={ticketDetail?.attachment?.filePath}>
                            {ticketDetail?.attachment?.filename}
                          </a>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[0.25rem]">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack direction="row" spacing={2} alignItems="self-start">
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
        }
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
              <CommentTab requestTicketId={changId} />
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
export default TicketChangeDetail;
