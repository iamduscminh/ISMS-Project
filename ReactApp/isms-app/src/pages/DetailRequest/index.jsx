import { React, useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import styled from "styled-components";
import RequestComment from "../../components/Elements/RequestComment";
import ModalDialog from "../../components/Elements/PopupModal";
import CustomField from "../../components/Elements/CustomField";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import IconTag from "../../components/Elements/IconTag";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { URL } from "../../utils/Url";

function CreateRequest() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const { id } = useParams();
  const { auth } = useAuth();

  //Comment
  const commentRef = useRef();
  const [commentValue, setCommentValue] = useState();
  const [isValidComment, setIsValidComment] = useState(true);
  const [errorComment, setErrorComment] = useState();
  const [commentData, setCommentData] = useState([]);
  const [activityData, setActivityData] = useState([
    {
      id: 1,
      type: "UserChange",
      //image:image.avatar3,
      sender: "Calyrex",
      action: "Change assigned user",
      time: "06:06 PM July 13, 2023",
      previous: "",
      update: {
        updateUser: "Gardevoir",
        //image: image.avatar
      },
    },
    {
      id: 2,
      type: "a",
      sender: "Calyrex",
      action: "Changed status",
      time: "05:06 PM July 13, 2023",
      previous: "Open",
      update: "Work in progress",
    },
  ]);

  const [commentTab, setCommentTab] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    criteriaMode: "all",
  });
  const getUserURL = `${URL.USER_URL}`;
  const commentUrl = `${URL.COMMENT_URL}`;
  const ticketUrl = `${URL.REQUEST_TICKET_URL}`;
  const ticketExtUrl = `${URL.REQUEST_TICKET_EXT_URL}`;
  const [requestTicket, setRequestTicket] = useState();
  const [requestTicketExts, setRequestTicketExts] = useState([]);
  const [userName, setUserName] = useState("");
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const headers = {
    Authorization: `Bearer ${auth?.accessToken}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };

  useEffect(() => {
    const apiGetRequestTicketsUrl = `${ticketUrl}/gettickets/${auth?.email}/${id}`;
    const apiGetRequestTicketExtUrl = `${ticketExtUrl}/getExtForTicket/${id}`;
    const apiGetCommentsUrl = `${commentUrl}/getall/${id}`;
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get request tickets
        await axiosInstance
          .get(apiGetRequestTicketsUrl)
          .then((response) => {
            const dataRp = response.data;
            const rqTicket = {
              requestType: {
                requestTypeId: dataRp?.serviceItemEntity?.serviceItemId ?? 0,
                requestTypeName:
                  dataRp?.serviceItemEntity?.serviceItemName ??
                  "Report an issue",
                requestTypeDesc:
                  dataRp?.serviceItemEntity?.description ??
                  "Report an issue when you have abnormal problem",
                requestTypeIcon:
                  dataRp?.serviceItemEntity?.iconDisplay ?? "GoReport",
              },
              isIncident: dataRp.isIncident,
              title: dataRp.title,
              description: dataRp.description,
              createAt: dataRp.createdAt,
              status: dataRp.status,
              fileName: dataRp.attachmentEntity?.filename,
              filePath: dataRp.attachmentEntity?.filePath,
            };
            console.log(response.data);
            setRequestTicket(rqTicket);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          });

        //--------------Get request tickets Ext
        await axiosInstance
          .get(apiGetRequestTicketExtUrl)
          .then((response) => {
            if (response.data.length > 0) {
              const dataExtRp = response.data.map((item, i) => ({
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
            //console.log();
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          });

        //get data comment
        await axiosInstance
          .get(apiGetCommentsUrl, { headers })
          .then((response) => {
            const dataRp = response.data;
            //console.log(dataRp);
            const dataCmts = response.data.map((item, i) => ({
              id: item.commentId,
              senderId: item.commentBy,
              sender: item.commentByUserEntity.fullName,
              content: item.commentText,
              time: new Date(item.commentTime).toLocaleString("en-US", options),
            }));
            setCommentData(dataCmts);
            //console.log(dataCmts);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
            });
          });

        //get data user
        const responseUser = await axiosInstance.post(
          `${getUserURL}/get/${auth?.userId}`
        );
        setUserName(responseUser.data.fullName);
        Swal.close();
      } catch (error) {
        // Handle errors if needed
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    };
    fetchData();
  }, []);

  const reasonCancelRef = useRef(null);
  const cancelRequestDetail = () => {
    const apiCancelTicketUrl = `${ticketUrl}/cancel/${id}`;
    //console.log(reasonCancelRef.current.value);
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      axiosInstance.put(apiCancelTicketUrl, headers).then((response) => {
        console.log(response.data);
        setRequestTicket((prevItem) => ({ ...prevItem, status: "Canceled" }));
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Request Ticket was canceled successfully.",
          confirmButtonText: "OK",
        });
      });
      Swal.close();
    } catch (error) {
      // Handle errors if needed
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };

  const showCommentTab = (queryCondition) => {
    setCommentTab(queryCondition);
  };
  const TabSelect = styled.div`
    width: 50%;
    height: 6px;
    background: #42526E;
    position: absolute;
    bottom: 0;
    left: ${commentTab ? "0" : "50%"}
    transition: 350ms;
  `;
  const handleChangeComment = (e) => {
    const { value } = e.target;
    if (value.length > 1000) {
      setErrorComment("Comment must not exceed 1000 characters");
      setIsValidComment(false);
    } else {
      setErrorComment("");
      setIsValidComment(true);
      setCommentValue(value);
    }
  };
  const handleAddComment = (e) => {
    if (!isValidComment) return;
    try {
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      const apiCreateCommentUrl = `${commentUrl}/create`;
      const commentDto = {
        commentText: commentValue,
        commentBy: auth?.userId,
        requestTicketId: id,
        isInternal: false,
      };
      //console.log(commentDto);
      axiosInstance
        .post(apiCreateCommentUrl, JSON.stringify(commentDto), { headers })
        .then((response) => {
          const dataNewComment = {
            id: response.data.commentId,
            sender: userName,
            senderId: auth?.userId,
            isInternal: response.data.isInternal,
            time: "Just now", //response.data.commentTime,
            content: response.data.commentText,
          };
          setCommentData((prev) => [dataNewComment, ...prev]);
          console.log(commentData);
          commentRef.current.value = "";
        })
        .catch((error) => {
          const result = Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error}`,
          });
        });

      Swal.close();
    } catch (error) {
      // Handle errors if needed
      console.log(error);
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  };
  return (
    <div className="detail-request-container w-full h-full py-5 bg-[#294a8d] mt-3">
      <div className="detail-request-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow">
        {/* HEADER SECTION*/}
        <div className="detail-request-header w-full bg-[#0e3275] text-white">
          <nav className="detail-request-header-nav px-6 pt-3 pb-3">
            <ul className="header-nav-content flex items-center text-[18px]">
              <li className="header-nav-item ml-1">
                <Link
                  className="header-nav-url hover:underline hover:text-white"
                  to="/"
                  title="Home"
                  aria-label="Home"
                >
                  Home
                </Link>
              </li>

              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <Link
                  className="header-nav-url hover:underline hover:text-white"
                  to="/viewRequests"
                  title="Create Request"
                  aria-label="Create Request"
                >
                  Request Tickets
                </Link>
              </li>
              <li className="header-nav-item ml-1">
                <div className="header-nav-arrow">
                  <IconTag name={"AiOutlineRight"} />
                </div>
              </li>
              <li className="header-nav-item ml-1">
                <p className="header-nav-url">
                  <span>{id}</span>
                </p>
              </li>
            </ul>
          </nav>
          <div className="detail-request-header-content px-6 pb-3 flex items-center justify-between">
            <div className="detail-request-header-left  flex items-center">
              <div className="detail-request-header-icon">
                {requestTicket?.requestType?.requestTypeIcon && (
                  <IconTag
                    name={requestTicket?.requestType?.requestTypeIcon}
                    className={"h-[50px] w-[50px]"}
                  />
                )}
              </div>
              <div className="detail-request-header-description ml-5">
                <h4 className="text-2xl font-bold">
                  {requestTicket?.requestType?.requestTypeName}
                </h4>
                <span>{requestTicket?.requestType?.requestTypeDesc}</span>
              </div>
            </div>
            <div className="detail-request-header-right">
              <Link to={"/catalog"}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  New Request
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-5 w-full h-full flex">
          <div className="detail-request-content w-[60%] flex flex-col">
            <div className="detail-request-content">
              <div className="detail-content-main">
                <h2 className="mb-4 text-4xl font-bold text-gray-900">
                  {requestTicket?.title}
                </h2>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-lg font-bold text-gray-800 "
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    rows="6"
                    className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder=""
                    value={requestTicket?.description}
                  ></textarea>
                </div>
                {requestTicket?.fileName && (
                  <div className="mb-6">
                    <label
                      htmlFor="rqtFile"
                      className="block mb-2 text-lg font-bold text-gray-800 "
                    >
                      File Attachment
                    </label>
                    <div className="file-attachment flex">
                      <IconTag name={"AiFillFile"} className={"mr-2"} />
                      <a
                        href={requestTicket?.filePath}
                        className="underline text-blue-500"
                      >
                        {requestTicket?.fileName}
                      </a>
                    </div>
                    <p className="mt-2 text-sm text-red-600 ">
                      {errors.rqtFile && errors.rqtFile.message}
                    </p>
                  </div>
                )}
              </div>
              <div className="detail-content-custom">
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
            </div>
            <div className="detail-request-activity">
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
                    <div className="w-[full] px-[1rem] py-[0.75rem] flex ">
                      <div className="text-3xl">
                        <IconTag name={"FaUserCircle"} />
                      </div>
                      <textarea
                        ref={commentRef}
                        rows={3}
                        className="w-full h-full resize-none mx-2 px-[0.75rem] py-[0.5rem] border-2 border-[#747272] rounded-md"
                        placeholder="Typing your comment"
                        onChange={handleChangeComment}
                      ></textarea>
                    </div>
                    {errorComment && (
                      <p className="w-[full] px-[2rem] py-[0.75rem] mt-2 text-sm text-red-600 ">
                        {errorComment}
                      </p>
                    )}
                    <div className="flex justify-end px-[2rem]">
                      <button
                        onClick={handleAddComment}
                        className="px-[1rem] py-[0.25rem] bg-[#043AC5] font-medium text-[#fff]"
                      >
                        Comment
                      </button>
                    </div>
                    <div className="w-full mt-[1rem] mb-8 px-[2rem] max-h-[80vh] overflow-y-scroll">
                      {commentData.map((item, i) => (
                        <RequestComment
                          key={item.id}
                          isAutoCmt={false}
                          id={item.id}
                          name={item.sender}
                          userId={item.senderId}
                          comment={item.content}
                          time={item.time}
                          isIndividual={item.senderId === auth?.userId}
                          authObj={auth}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="px-[2rem] my-[2rem]">
                    {activityData.map((item, i) => (
                      <RequestComment
                        key={i}
                        isAutoCmt={true}
                        name={"Duc Minh"}
                        comment={
                          "Your request status has changed to In Progress."
                        }
                        time={"at 26/May/23 12:34 PM"}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-[40%] p-5 ml-4 mt-10">
            <div className="detail-request-status">
              <h6 className="text-lg font-bold ">Status</h6>
              <hr />
              <h3 className="text-3xl font-extrabold uppercase">
                {requestTicket?.status}
              </h3>
              {requestTicket?.status && requestTicket?.status != "Canceled" && (
                <ModalDialog
                  title={"Cancel Request"}
                  actionText={"Cancel Request"}
                  actionHandler={cancelRequestDetail}
                  triggerComponent={
                    <div className="inline-block cursor-pointer">
                      <div className="flex items-center hover:underline">
                        <IconTag name={"FaExchangeAlt"} />
                        <p className="text-lg font-bold ml-3">Cancel Request</p>
                      </div>
                    </div>
                  }
                >
                  <div className="mb-1">
                    <label
                      htmlFor="reason_cancel"
                      className="block mb-2 text-sm font-medium text-gray-500 "
                    >
                      Reason Cancel
                    </label>
                    <textarea
                      id="reason_cancel"
                      ref={reasonCancelRef}
                      rows="5"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-40 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                      placeholder="Write the reason you want cancel this request"
                    ></textarea>
                  </div>
                </ModalDialog>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;
