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
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const getUserURL = `${URL.USER_URL}`;

  useEffect(() => {
    //Connect Signal R
    const token = auth?.accessToken;
    // Gọi API để lấy Thông tin Users từ DB
    const fetchUserById = async () => {
      try {
        const response = await axiosInstance.post(
          `${getUserURL}/get/${auth.userId}`
        );
        setAvatar(response.data.avatar);
        setUserName(response.data.fullName);
      } catch (error) {
        console.error("Error Get User Information:", error);
      }
    };

    fetchUserById();

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
                <NotificationBell notificationCount={3} />
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
