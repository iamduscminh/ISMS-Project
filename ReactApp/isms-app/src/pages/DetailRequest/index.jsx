import { React, useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import RequestComment from "../../components/Elements/RequestComment";
import ModalDialog from "../../components/Elements/PopupModal";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import IconTag from "../../components/Elements/IconTag";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import styled from "styled-components";
function CreateRequest() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const { id } = useParams();
  const { auth } = useAuth();

  const [requestTicket, setRequestTicket] = useState();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  //tab hiển thị comment section
  const tabsData = [
    {
      label: "Comment",
      tabIndex: 0,
    },
    {
      label: "Activity",
      tabIndex: 1,
    },
  ];
  useEffect(() => {
    const apiGetRequestTicketsUrl = `api/RequestTickets/get/${id}`;
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
        axiosInstance
          .get(apiGetRequestTicketsUrl)
          .then((response) => {
            const dataRp = response.data;
            const rqTicket = {
              requestType: {
                requestTypeId: dataRp?.serviceItemId,
                requestTypeName: dataRp?.serviceItemEntity?.serviceItemName,
                requestTypeDesc: dataRp?.serviceItemEntity?.description,
              },
              title: dataRp.title,
              description: dataRp.description,
              createAt: dataRp.createdAt,
              status: dataRp.status,
            };
            console.log(response.data);
            setRequestTicket(rqTicket);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
              showCancelButton: true,
              cancelButtonText: "Cancel",
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
    fetchData();
  }, []);

  const reasonCancelRef = useRef(null);
  const cancelRequestDetail = () => {
    console.log(reasonCancelRef.current.value);
  };
  const [commentData, setCommentData] = useState([
    {
      id: 1,
      sender: "Duc Minh",
      time: "26/May/23 12:34 PM",
      content: "I need you to provide some more information",
    },
    {
      id: 2,
      sender: "Duc Minh",
      time: "26/May/23 12:34 PM",
      content: "I need you to provide some more information",
    },
    {
      id: 3,
      sender: "Duc Minh",
      time: "26/May/23 12:34 PM",
      content: "Temporarily not resolved due to insufficient information",
    },
    {
      id: 4,
      sender: "Duc Minh",
      time: "26/May/23 12:34 PM",
      content: "Temporarily not resolved due to insufficient information",
    },
  ]);

  const [ActivityData, setActivityData] = useState([
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
  const commentRef = useRef();
  const [checkPersonal, setCheckPersonal] = useState(false);
  const [commentTab, setCommentTab] = useState(true);
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
  const changeCommentType = (check) => {
    setCheckPersonal(check);
  };
  const handleAddComment = (e) => {
    // if (commentRef.current.value === "") return;
    // setCommentData((prev) =>
    //   [
    //     {
    //       id: prev.length + 1,
    //       username: "Tu Doan",
    //       time: "Just Now",
    //       isPersonal: checkPersonal,
    //       image: image.avatar2,
    //       content: commentRef.current.value,
    //     },
    //     ...prev
    //   ]
    // );
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
                <IconTag
                  name={"BsFillInfoSquareFill"}
                  className={"h-[50px] w-[50px]"}
                />
              </div>
              <div className="detail-request-header-description ml-5">
                <h4 className="text-2xl font-bold">
                  {requestTicket?.requestType?.requestTypeName}
                </h4>
                <span>{requestTicket?.requestType?.requestTypeDesc}</span>
              </div>
            </div>
            <div className="detail-request-header-right">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                New Request
              </button>
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
              </div>
              <div className="detail-content-custom"></div>
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
                    <div className="w-[full] px-[2rem] py-[0.75rem] flex ">
                      <div className="text-3xl">
                        <IconTag name={"FaUserCircle"} />
                      </div>
                      <textarea
                        ref={commentRef}
                        rows={3}
                        className="w-full h-full resize-none mx-2 px-[0.75rem] py-[0.5rem] border-2 border-[#747272] rounded-md"
                        placeholder="Typing your comment"
                      ></textarea>
                    </div>

                    <div className="flex justify-end px-[2rem]">
                      <button
                        onClick={handleAddComment}
                        className="px-[1rem] py-[0.25rem] bg-[#043AC5] font-medium text-[#fff]"
                      >
                        Comment
                      </button>
                    </div>
                    <div className="w-full mt-[1rem] px-[2rem] max-h-[50vh] overflow-y-scroll">
                      {commentData.map((item) => (
                        <RequestComment
                          isAutoCmt={false}
                          name={item.sender}
                          comment={item.content}
                          time={item.time}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="px-[2rem] my-[2rem]">
                    {ActivityData.map((item) => (
                      <RequestComment
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;
