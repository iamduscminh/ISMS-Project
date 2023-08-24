import { React, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NotificationItem from "../../components/Elements/Notification/NotificationItem";
import IconTag from "../../components/Elements/IconTag";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { URL } from "../../utils/Url";

function Notification() {
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const { id } = useParams();
  const { auth } = useAuth();

  const getUserURL = `${URL.USER_URL}`;
  const commentUrl = `${URL.COMMENT_URL}`;
  const ticketUrl = `${URL.REQUEST_TICKET_URL}`;
  const ticketExtUrl = `${URL.REQUEST_TICKET_EXT_URL}`;
  const ticketHistoryUrl = `${URL.REQUEST_TICKET_HIS_URL}/${id}`;
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

    const fetchData = async () => {
      // try {
      //   Swal.fire({
      //     title: "Loading...",
      //     allowOutsideClick: false,
      //     onBeforeOpen: () => {
      //       Swal.showLoading();
      //     },
      //   });
      //   //--------------Get request tickets
      //   await axiosInstance
      //     .get(apiGetRequestTicketsUrl)
      //     .then((response) => {
      //       const dataRp = response.data;
      //       const rqTicket = {
      //         requestType: {
      //           requestTypeId: dataRp?.serviceItemEntity?.serviceItemId ?? 0,
      //           requestTypeName:
      //             dataRp?.serviceItemEntity?.serviceItemName ??
      //             "Report an issue",
      //           requestTypeDesc:
      //             dataRp?.serviceItemEntity?.description ??
      //             "Report an issue when you have abnormal problem",
      //           requestTypeIcon:
      //             dataRp?.serviceItemEntity?.iconDisplay ?? "GoReport",
      //         },
      //         isIncident: dataRp.isIncident,
      //         title: dataRp.title,
      //         description: dataRp.description,
      //         createAt: dataRp.createdAt,
      //         status: dataRp.status,
      //         fileName: dataRp.attachmentEntity?.filename,
      //         filePath: dataRp.attachmentEntity?.filePath,
      //       };
      //       console.log(response.data);
      //       setRequestTicket(rqTicket);
      //     })
      //     .catch((error) => {
      //       const result = Swal.fire({
      //         icon: "error",
      //         title: "Oops...",
      //         text: `${error}`,
      //       });
      //     });
      //   //get data user
      //   const responseUser = await axiosInstance.post(
      //     `${getUserURL}/get/${auth?.userId}`
      //   );
      //   setUserName(responseUser.data.fullName);
      //   Swal.close();
      // } catch (error) {
      //   // Handle errors if needed
      //   console.log(error);
      //   Swal.close();
      //   Swal.fire({
      //     icon: "error",
      //     title: "Error",
      //     text: error,
      //   });
      // }
    };
    fetchData();
  }, []);

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
              <li className="header-nav-item ml-1">Notifications</li>
            </ul>
          </nav>
          <div className="detail-request-header-content px-6 pb-3 flex items-center justify-between">
            <div className="detail-request-header-left  flex items-center">
              <div className="detail-request-header-icon">
                <IconTag
                  name={"IoMdNotifications"}
                  className={"text-white h-[50px] w-[50px]"}
                />
              </div>
              <div className="detail-request-header-description ml-5">
                <h4 className="text-2xl font-bold">Notifications</h4>
                <span>View all Notificaton</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 w-full h-full flex border-t border-gray-400">
          <div className="detail-request-content w-[35%] flex flex-col border-l border-r border-gray-400">
            <div className="search-section">
              <form className="">
                <label
                  htmlFor="default-search"
                  className="text-sm font-medium text-gray-900 sr-only "
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    //onChange={handleFilterChange}
                    id="default-search"
                    className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300  focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search..."
                  />
                </div>
              </form>
            </div>
            <div className="noti-list">
              <NotificationItem
                title={"Hồ sơ DIS.21082023.00064599 - FULL_NAME_330003063"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
              <NotificationItem
                title={"Hồ sơ DIS.21082023.00064599 - FULL_NAME_330003063"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
              <NotificationItem
                title={"Hồ sơ DIS.21082023.00064599 - FULL_NAME_330003063"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
              <NotificationItem
                title={"title"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
              <NotificationItem
                title={"title"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
              <NotificationItem
                title={"title"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
              <NotificationItem
                title={"title"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
              <NotificationItem
                title={"title"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
              <NotificationItem
                title={"title"}
                sender={"minhmomang@gmail.com"}
                time={"25/3/2022"}
              />
            </div>
          </div>
          <div className="w-[65%] p-5 ml-4 mt-10"></div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
