import { React, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import image from "../../../../assets/images";
import Dropdown from "../../../Elements/Dropdown";
import TippyItem from "../../../Elements/TippyItem";
import IconTag from "../../../Elements/IconTag";

function Header() {
  const [toggleNoti, setToggleNoti] = useState(false);
  const tippyWrapperRefNoti = useRef(null);
  const settingRefNoti = useRef(null);
  const [toggleUser, setToggleUser] = useState(false);
  const tippyWrapperRefUser = useRef(null);
  const settingRefUser = useRef(null);

  useEffect(() => {
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
  const handleDrNotiItem1 = () => {
    // do something
    setOpenDrNoti(false);
    console.log("clicked one");
  };

  const handleDrNotiItem2 = () => {
    // do something
    setOpenDrNoti(false);
    console.log("clicked two");
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
      <div className="header-right-side flex mr-8 ">
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
                <h2 className="text-[0.85rem] text-[#172b4d]">
                  Request Ticket
                </h2>
                <TippyItem
                  name="Setting Name"
                  description="This is Description for setting"
                  icon="HiOutlineDesktopComputer"
                  color="default"
                />
                <TippyItem
                  name="Setting Name"
                  description="This is Description for setting"
                  icon="HiOutlineDesktopComputer"
                  color="default"
                />
                <TippyItem
                  name="Setting Name"
                  description="This is Description for setting"
                  icon="HiOutlineDesktopComputer"
                  color="default"
                />
                <TippyItem
                  name="Setting Name"
                  description="This is Description for setting"
                  icon="HiOutlineDesktopComputer"
                  color="default"
                />
              </div>
              <div>
                <h2 className="text-[0.85rem] text-[#172b4d] ">From Admin</h2>
                <TippyItem
                  name="Setting Name"
                  description="This is Description for setting"
                  icon="HiOutlineDesktopComputer"
                  color="personal"
                />
                <TippyItem
                  name="Setting Name"
                  description="This is Description for setting"
                  icon="HiOutlineDesktopComputer"
                  color="personal"
                />
              </div>
            </div>
          )}
        >
          <div
            className="aspect-square mr-2 cursor-pointer"
            ref={settingRefNoti}
          >
            <button className="header-noti-button" onClick={handleToggleNoti}>
              <IconTag
                name={"IoMdNotifications"}
                className={"text-white text-2xl"}
              />
            </button>
          </div>
        </Tippy>
        <div className="header-profile">
          <Tippy
            interactive
            visible={toggleUser}
            placement="bottom-end"
            render={(attrs) => (
              <div
                className="tippy-wrapper bg-white w-[20vw] p-3 rounded shadow"
                tabIndex="-1"
                ref={tippyWrapperRefUser}
                {...attrs}
              >
                <h1 className="w-full h-[10%] text-[1.25rem] text-[#172b4d] font-medium ">
                  Profiles
                </h1>
                <div className="my-[0.75rem]">
                  <TippyItem
                    name="Setting Name"
                    description="This is Description for setting"
                    icon="HiOutlineDesktopComputer"
                    color="default"
                  />
                  <TippyItem
                    name="Setting Name"
                    description="This is Description for setting"
                    icon="HiOutlineDesktopComputer"
                    color="default"
                  />
                  <TippyItem
                    name="Setting Name"
                    description="This is Description for setting"
                    icon="HiOutlineDesktopComputer"
                    color="default"
                  />
                  <TippyItem
                    name="Setting Name"
                    description="This is Description for setting"
                    icon="HiOutlineDesktopComputer"
                    color="default"
                  />
                </div>
              </div>
            )}
          >
            <div
              className="aspect-square mr-2 cursor-pointer"
              ref={settingRefUser}
            >
              <button className="header-User-button" onClick={handleToggleUser}>
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
