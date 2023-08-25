import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";
import image from "../../../../assets/images";
import NotificationBell from "../../../Elements/Notification/NotificationBell";
import NotificationItem from "../../../Elements/Notification/NotificationItem";
import TippyItem from "../../../Elements/TippyItem";
import IconTag from "../../../Elements/IconTag";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../utils/Url";
import * as signalR from "@microsoft/signalr";
import Swal from "sweetalert2";
function Header() {
  const [toggleNoti, setToggleNoti] = useState(false);
  const tippyWrapperRefNoti = useRef(null);
  const settingRefNoti = useRef(null);
  const [toggleUser, setToggleUser] = useState(false);
  const tippyWrapperRefUser = useRef(null);
  const settingRefUser = useRef(null);
  const { auth, setAuth } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [userName, setUserName] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notificationUnread, setNotificationsUnread] = useState(0);
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const getUserURL = `${URL.USER_URL}`;
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
    //Connect Signal R
    const token = auth?.accessToken;
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7134/hub/notify", {
        accessTokenFactory: async () => token,
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging((logging) => {
        // Log to the Console
        logging.AddConsole();
        // This will set ALL logging to Debug level
        //logging.SetMinimumLevel(LogLevel.Debug);
      })
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
      })
      .catch((error) => {
        console.error("Error connecting to SignalR hub:", error);
      });

    connection.on("ReceiveNotification", (message) => {
      console.log(message.notificationHeader + " " + message.notificationBody);
      //setNotifications((prevNotifications) => [...prevNotifications, message]);
    });

    connection.on("ReceiveNormalMessage", (message) => {
      console.log(message);
      //setNotifications((prevNotifications) => [...prevNotifications, message]);
    });
    const apiGetNotificationsUrl = `api/Notifications/noti/${
      "USER000001" //auth?.userId
    }/${false}`;
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
          .get(apiGetNotificationsUrl)
          .then((response) => {
            const data = response.data.map((item, i) => ({
              id: item.notificationId,
              title: item.notificationHeader,
              sender: item.status,
              time: new Date(item.createdAt).toLocaleString("en-US", options),
              isRead: item.isRead,
              body: item.notificationBody,
            }));
            setNotifications(data);
            setNotificationsUnread(
              data.filter((x) => x.isRead == false).length
            );
            //console.log(response.data);
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

        // Gọi API để lấy Thông tin Users từ DB
        await axiosInstance
          .post(`${getUserURL}/get/${auth.userId}`, { headers })
          .then((response) => {
            setAvatar(response.data.avatar);
            setUserName(response.data.fullName);
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
    fetchData();

    const handleClickOutside = (event) => {
      if (
        tippyWrapperRefNoti.current &&
        !tippyWrapperRefNoti.current.contains(event.target) &&
        !settingRefNoti.current.contains(event.target)
      ) {
        setToggleNoti(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      connection.stop();
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggleNoti = () => {
    setToggleNoti((prev) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tippyWrapperRefUser.current &&
        !tippyWrapperRefUser.current.contains(event.target) &&
        !settingRefUser.current.contains(event.target)
      ) {
        setToggleUser(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggleUser = () => {
    setToggleUser((prev) => !prev);
  };
  const [isHeaderScroll, setHeaderScroll] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 0) {
        setHeaderScroll(false);
      } else {
        setHeaderScroll(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //Dropdown variable
  const [openDrNoti, setOpenDrNoti] = useState(false);
  const [openDrProf, setOpenDrProf] = useState(false);
  const handleOpenNoti = () => {
    setOpenDrNoti(!openDrNoti);
  };
  const handleOpenProf = () => {
    setOpenDrProf(!openDrProf);
  };

  const handleLogout = () => {
    // Thực hiện xóa giá trị trong auth
    setAuth(null); // Hoặc bạn có thể đặt lại thành giá trị mặc định cho auth, ví dụ: setAuth({userId: null, roleName: null, token: null})

    // Điều hướng về trang login
    navigate("/login");
  };

  const handleGoToProfile = () => {
    navigate("/profile");
    setToggleUser((prev) => !prev);
  };
  return (
    <div
      className={`header-container flex fixed top-0 left-0  z-10 ${
        isHeaderScroll ? "bg-[#294a8d]" : "bg-[#3E5481]"
      } w-[100%] h-[56px] justify-between items-center`}
    >
      <div className="header-left-side">
        <Link to={"/"}>
          <div className="header-logo ml-4 w-[100%] flex items-center">
            <img src={image.shortLogo} alt="" className="w-[15%] pr" />
            <div className="text-white text-2xl font-bold">
              <span>QUICK SERVICE</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="header-right-side flex mr-8 items-center">
        <div className="header-noti">
          <Tippy
            interactive
            visible={toggleNoti}
            placement="bottom-end"
            render={(attrs) => (
              <div
                className="tippy-wrapper bg-white w-[20vw] p-3 rounded shadow"
                tabIndex="-1"
                ref={tippyWrapperRefNoti}
                {...attrs}
              >
                <h1 className="w-full h-[10%] text-[1.25rem] text-[#172b4d] font-medium ">
                  Notification
                </h1>
                <div className="my-[0.75rem]">
                  {notifications
                    .filter((x) => x.isRead == false)
                    .slice(0, 7)
                    .map((item, i) => {
                      return (
                        <NotificationItem
                          key={item.id}
                          title={item.body}
                          sender={item.sender}
                          displayContent={false}
                          time={item.time}
                        />
                      );
                    })}
                </div>
                <div>
                  <hr />
                  <Link to={"/notification"}>
                    <h2 className="flex justify-center my-2 text-[0.85rem] text-blue-500 hover:underline hover:text-blue-800">
                      View All Notification
                    </h2>
                  </Link>
                </div>
              </div>
            )}
          >
            <div
              className=" mr-4 cursor-pointer flex items-center"
              ref={settingRefNoti}
            >
              <button className="header-noti-button" onClick={handleToggleNoti}>
                <NotificationBell notificationCount={notificationUnread} />
              </button>
            </div>
          </Tippy>
        </div>
        <div className="header-profile">
          <Tippy
            interactive
            visible={toggleUser}
            placement="bottom-end"
            render={(attrs) => (
              <div
                className="tippy-wrapper bg-white w-[12vw] p-3 rounded shadow"
                tabIndex="-1"
                ref={tippyWrapperRefUser}
                {...attrs}
              >
                <div
                  className="top-drd-user flex items-center mb-2 hover:bg-slate-100 cursor-pointer"
                  onClick={handleGoToProfile}
                >
                  <img
                    src={avatar}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover object-center z- mr-2"
                  />
                  <h3 className="text-xl font-bold">{userName}</h3>
                </div>
                <hr />
                <div className="my-[0.75rem]">
                  <TippyItem
                    name="View Profiles"
                    color="default"
                    handleClick={handleGoToProfile}
                  />
                  <TippyItem
                    name="Logout"
                    color="default"
                    handleClick={handleLogout}
                  />
                </div>
              </div>
            )}
          >
            <div
              className="aspect-square mr-2 cursor-pointer"
              ref={settingRefUser}
            >
              <button
                className="header-User-button flex items-center"
                onClick={handleToggleUser}
              >
                <IconTag
                  name={"BiUserCircle"}
                  className={"text-white text-2xl"}
                />
              </button>
            </div>
          </Tippy>
          {/* <button className="header-profile-button" onClick={handleOpenProf}>
            <IconTag name={"BiUserCircle"} className={"text-white text-2xl"} />
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
