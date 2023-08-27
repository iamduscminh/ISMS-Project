import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AdminHeader.module.scss";
import image from "../../../../assets/images";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdNotifications } from "react-icons/io";
import Tippy from "@tippyjs/react/headless";
import TippyItem from "../../../Elements/TippyItem";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { ROUTES_PATHS } from "../../../../../constants";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useAuth from "../../../../hooks/useAuth";
import NotificationBell from "../../../Elements/Notification/NotificationBell";
import NotificationItem from "../../../Elements/Notification/NotificationItem";
const cx = classNames.bind(styles);
const AdminHeader = () => {
  const [toggleNoti, setToggleNoti] = useState(false);
  const tippyWrapperRefNoti = useRef(null);
  const settingRefNoti = useRef(null);
  const axiosInstance = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const [toggle, setToggle] = useState(false);
  const tippyWrapperRef = useRef(null);
  const settingRef = useRef(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationUnread, setNotificationsUnread] = useState(0);
  const headers = {
    Authorization: `Bearer ${auth?.accessToken}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  useEffect(() => {
    const apiGetNotificationsUrl = `api/Notifications/noti/${
      auth?.userId
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
            console.log(response.data);
            const data = response.data.map((item, i) => ({
              id: item.notificationId,
              title: item.notificationHeader,
              sender: item.status,
              time: new Date(item.createdDate).toLocaleString("en-US", options),
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
        tippyWrapperRef.current &&
        !tippyWrapperRef.current.contains(event.target) &&
        !settingRef.current.contains(event.target)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggleNoti = () => {
    setToggleNoti((prev) => !prev);
  };
  return (
    <div className={cx("h-[7%] w-full bg-[#294a8d] flex")}>
      <div className={cx("w-[8%] h-full flex justify-center items-center")}>
        <Link to={"/admin"}>
          <img
            src={image.logo}
            alt=""
            className={cx("w-[100%] h-[100%] ml-[2rem]")}
          />
        </Link>
      </div>
      <div
        className={cx(
          "w-[40%] flex justify-center items-center bg-[#294a8d] ml-[3rem]"
        )}
      ></div>
      <div className={cx("ml-auto flex justify-center items-center mr-4")}>
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
                  {notifications.length > 0 &&
                    notifications
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
                  {notifications.length == 0 && "Empty"}
                </div>
                <div>
                  <hr />
                  {notifications.length > 0 && (
                    <Link to={"/notification"}>
                      <h2 className="flex justify-center my-2 text-[0.85rem] text-blue-500 hover:underline hover:text-blue-800">
                        View All Notification
                      </h2>
                    </Link>
                  )}
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
      </div>
    </div>
  );
};

export default AdminHeader;
