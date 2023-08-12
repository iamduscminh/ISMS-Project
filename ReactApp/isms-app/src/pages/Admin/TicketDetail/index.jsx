import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  MdSos
} from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { SiMicrosoftword, SiMicrosoftexcel } from "react-icons/si";
import {
  FcHighPriority,
  FcMediumPriority,
  FcLowPriority,
} from "react-icons/fc";
import { AiOutlineCloudUpload, AiOutlineUpload } from "react-icons/ai";
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
import { parseISO, format } from 'date-fns';

const TicketDetail = () => {
  const { ticketId } = useParams();
  const axiosInstance = useAxiosPrivate();
  const [ticketDetail, setTicketDetail] = useState();
  const [task, setTask] = useState();

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.REQUEST_TICKET_URL}/get/${ticketId}`
        );
        console.log(response.data);
        setTicketDetail(response.data);
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };
    fetchTicketDetail();
  }, [axiosInstance]);

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const response = await axiosInstance.get(
          `${URL.WORKFLOW_ASSIGNMENT_URL}/get?requestTicketId=${ticketId}`
        );
        console.log(1);
        console.log(response.data);
        setTask(response.data);
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
  //Value cho Service của Ticket
  const [ticketService, setTicketService] = useState({
    id: 1,
    icon: <MdElectricalServices />,
    serviceName: "Hardware Service",
  });

  //Value cho Service của Ticket
  const [priority, setPriority] = useState({
    id: 1,
    icon: <FcHighPriority />,
    priority: "High",
  });

  //Value cho Status
  const [status, setStatus] = useState({
    id: 1,
    text: "Inprogress",
  });
  //Data cho Service Combobox
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
    {
      id: 4,
      icon: <MdSos />,
      priority: "Urgent",
    },
  ];

  //Data cho comment
  const [commentData, setCommentData] = useState([
    {
      id: 1,
      username: "Spectrier",
      time: "10 minute",
      isPersonal: false,
      image: image.avatar4,
      content: "I need you to provide some more information",
    },
    {
      id: 2,
      username: "Calyrex",
      time: "25 minute",
      isPersonal: false,
      image: image.avatar3,
      content: "I need you to provide some more information",
    },
    {
      id: 3,
      username: "Calyrex",
      time: "30 minute",
      isPersonal: true,
      image: image.avatar3,
      content: "Temporarily not resolved due to insufficient information",
    },
  ]);

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
  const commentRef = useRef();
  const [checkPersonal, setCheckPersonal] = useState(false);

  const handleAddComment = (e) => {
    if (commentRef.current.value === "") return;
    setCommentData((prev) => [
      {
        id: prev.length + 1,
        username: "Tu Doan",
        time: "Just Now",
        isPersonal: checkPersonal,
        image: image.avatar2,
        content: commentRef.current.value,
      },
      ...prev,
    ]);
  };

  const changeCommentType = (check) => {
    setCheckPersonal(check);
  };

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

  const getPriorityObject = (priority) =>{
    return priorityData.find(e=>e.priority === priority)
  }

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
        <IoIosArrowBack className="text-[1.25rem] mr-[0.75rem] cursor-pointer" />
        <div>
          <span className="mr-[3rem]">Back</span>
        </div>
        <div>
          <span className="mr-[0.5rem]">{ticketDetail?.requestTicketId}:</span>
          <span>{ticketDetail?.title}</span>
        </div>
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
              {/* <h3 className="text-[1rem] font-medium text-[#42526E] mb-[0.75rem]">
                Description
              </h3> */}
              <p className="text-[#747272] text-[1rem]">
                {ticketDetail?.description}
              </p>
            </div>
            <div className="flex items-center mt-[1rem]">
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
                  name={ticketDetail?.serviceItemEntity?.iconDisplay || "AiFillCustomerService"}
                />
                <div className="ml-[0.5rem]">
                  <span className="text-[#747272]">
                    <a href="#">
                      {ticketDetail ? ticketDetail?.serviceItemEntity?.serviceItemName : " "}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-[1rem]">
              <h3 className="text-[#42526E] min-w-[40%] font-medium">
                Service
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
                      {ticketDetail ? ticketDetail.serviceItemEntity?.serviceCategoryEntity?.serviceCategoryName : " "}
                    </a>
                  </span>
                </div>
              </div>
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
            <div className="w-[full] mt-[3rem] mb-[1rem]">
              <TicketStatus
                currentStatus={ticketDetail ? ticketDetail?.status : " "}
                onSelect={handleStatusSelect}
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
                  component={PriorityItem}
                  data={priorityData}
                  onSelect={handlePrioritySelect}
                  value={getPriorityObject(ticketDetail?.priority)}
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
                  <span>{ticketDetail ? format(parseISO(ticketDetail?.firstResolutionDue), 'MMM-dd-yyyy HH:mm') : " "}</span>
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
                <span>{ticketDetail ? format(parseISO(ticketDetail?.firstResponseDue), 'MMM-dd-yyyy HH:mm') : " "}</span>
                  {/* <span className="ml-[1rem]">2h00 to due</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[33%] ml-[1rem]">
          <div className="w-full bg-[#fff] px-[1.25rem] py-[1rem] flex flex-col rounded-lg shadow-md border-2 border-[#E1DEDE]">
            <div>
              <h1 className="text-[1.25rem] font-semibold text-[#42526E]">
                {task ? task?.currentTask?.workflowTaskName : " "}
              </h1>
              <p className="text-[#747272]">
                {task ? task?.currentTask?.description : " "}
              </p>
            </div>
            <div>
              <div className="flex items-center mt-[1rem]">
                <h3 className="text-[#42526E] min-w-[40%] font-medium">
                  Assignee
                </h3>

                {ticketDetail?.assignedTo ? (
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
                        src={image.avatar}
                        alt=""
                      />
                    </div>
                    <div className="ml-[0.5rem]">
                      <span className="text-[#747272]">
                        <a href="#">Gardevoir</a>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button className="text-[#fff] font-medium px-[0.75rem] bg-[#043AC5]">Assign</button>
                  </div>
                )}
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

              <div className="flex mt-[1rem]">
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
                    <SiMicrosoftword className="cursor-pointer text-[#295296]" />
                    <div className="ml-[0.5rem]">
                      <span className="text-[#747272]">
                        <a href="#">document1.docx</a>
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <SiMicrosoftword className="cursor-pointer text-[#295296]" />
                    <div className="ml-[0.5rem]">
                      <span className="text-[#747272]">
                        <a href="#">document2.docx</a>
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    <SiMicrosoftexcel className="cursor-pointer text-[#005b38]" />
                    <div className="ml-[0.5rem]">
                      <span className="text-[#747272]">
                        <a href="#">document3.xlsx</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-[#42526E] min-w-[40%] font-medium">
                  Check Transition
                </h3>
                <div className="mt-[1rem] translate-x-[-1rem]">
                  <div className="w-[full] mx-[0.25rem] ml-[1rem]">
                    <textarea
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
            </div>
            <div className="h-[20vh] overflow-y-scroll cursor-default mt-[1rem]">
              <div className="flex items-center text-[#42526E] px-[1rem] py-[0.5rem]">
                <BiTask className="mr-[0.5rem]" />
                <h3>Workflow task name</h3>
              </div>
              <div className="flex items-center font-medium bg-[#043AC5] text-[#fff] px-[1rem] py-[0.5rem]">
                <BiTask className="mr-[0.5rem]" />
                <h3>Workflow task name</h3>
              </div>
              <div className="flex items-center text-[#42526E] px-[1rem] py-[0.5rem]">
                <BiTask className="mr-[0.5rem]" />
                <h3>Workflow task name</h3>
              </div>
              <div className="flex items-center text-[#42526E] px-[1rem] py-[0.5rem]">
                <BiTask className="mr-[0.5rem]" />
                <h3>Workflow task name</h3>
              </div>
              <div className="flex items-center text-[#42526E] px-[1rem] py-[0.5rem]">
                <BiTask className="mr-[0.5rem]" />
                <h3>Workflow task name</h3>
              </div>
              <div className="flex items-center text-[#42526E] px-[1rem] py-[0.5rem]">
                <BiTask className="mr-[0.5rem]" />
                <h3>Workflow task name</h3>
              </div>
            </div>
            <div className="mt-[1rem] flex">
              <select
                name=""
                id=""
                className="border-2 border-[#42526E] rounded-md px-[0.75rem] mr-[1rem]"
              >
                <option value="">Done</option>
                <option value="">Return</option>
                <option value="">Pending</option>
              </select>
              <ModalDialog
                title={"Transition Task"}
                actionText={"Change"}
                triggerComponent={
                  <button className="px-[0.75rem] bg-[#043AC5] text-[#fff] font-medium">
                    Change
                  </button>
                }
                customSize="md"
              ></ModalDialog>
            </div>
          </div>
        </div>
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
              <div>
                <div>
                  <div className="w-[full] flex justify-center mt-[1rem]">
                    <div
                      onClick={(e) => {
                        changeCommentType(false);
                      }}
                      className="cursor-pointer w-[25%] bg-[#42526E] text-center font-medium text-[#fff] rounded-md"
                    >
                      Customer
                    </div>
                    <div
                      onClick={(e) => {
                        changeCommentType(true);
                      }}
                      className="cursor-pointer ml-[3rem] w-[25%] bg-[#D4DAE4] text-center font-medium text-[#000000] rounded-md"
                    >
                      Personal
                    </div>
                  </div>
                </div>
                <div className="w-[full] px-[2rem] py-[0.75rem] ">
                  <textarea
                    ref={commentRef}
                    rows={4}
                    className="w-full h-full resize-none px-[0.75rem] py-[0.5rem] border-2 border-[#747272] rounded-md"
                    placeholder="@ to tag someone"
                  ></textarea>
                </div>

                <div className="flex justify-end px-[2rem]">
                  {checkPersonal ? (
                    <button
                      onClick={handleAddComment}
                      className="px-[1rem] py-[0.25rem] bg-[#043AC5] font-medium text-[#fff]"
                    >
                      Add Personal
                    </button>
                  ) : (
                    <button
                      onClick={handleAddComment}
                      className="px-[1rem] py-[0.25rem] bg-[#043AC5] font-medium text-[#fff]"
                    >
                      Add Public
                    </button>
                  )}
                  <button className="px-[1rem] py-[0.25rem] bg-[#fff] font-medium text-[#043AC5]">
                    Cancel
                  </button>
                </div>
                <div className="w-full mt-[1rem] px-[2rem] max-h-[50vh] overflow-y-scroll">
                  {commentData.map((item) => (
                    <CommentComponent key={item.id} comment={item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-[2rem] my-[2rem]">
                {ActivityData.map((item) => (
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
