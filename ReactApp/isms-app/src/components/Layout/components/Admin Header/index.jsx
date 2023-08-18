import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AdminHeader.module.scss";
import image from "../../../../assets/images";
import { AiFillSetting } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import Tippy from "@tippyjs/react/headless";
import TippyItem from "../../../Elements/TippyItem";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { ROUTES_PATHS } from "../../../../../constants";

const cx = classNames.bind(styles);

const AdminHeader = () => {
  const [toggle, setToggle] = useState(false);
  const tippyWrapperRef = useRef(null);
  const settingRef = useRef(null);

  useEffect(() => {
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

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div className={cx("h-[7%] w-full bg-[#7F91B0] flex")}>
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
          "w-[40%] flex justify-center items-center bg-[#7F91B0] ml-[3rem]"
        )}
      >
        <div className={cx("selection")}>
          <div className={cx("item")}>
            <Link to={ROUTES_PATHS.ADMIN}>
              <span className={cx("item-top")}>Analysis</span>
              <span className={cx("item-bot")}>Data and Analysis</span>
            </Link>
          </div>
          <div className={cx("item-border")}>
            <Link to={ROUTES_PATHS.ADMIN_ROLE}>
              <span className={cx("item-top")}>Roles</span>
              <span className={cx("item-bot")}>Users and Roles </span>
            </Link>
          </div>
          <div className={cx("item-border")}>
            <Link to={ROUTES_PATHS.ADMIN_GROUPS}>
              <span className={cx("item-top")}>Groups</span>
              <span className={cx("item-bot")}>Users and Roles </span>
            </Link>
          </div>
          <div className={cx("item-border")}>
            <Link to={ROUTES_PATHS.ADMIN_USERS}>
              <span className={cx("item-top")}>Users</span>
              <span className={cx("item-bot")}>Users and Roles </span>
            </Link>
          </div>
          <div className={cx("item-border")}>
            <Link to={ROUTES_PATHS.ADMIN_REPORT}>
              <span className={cx("item-top")}>Report</span>
              <span className={cx("item-bot")}>Base and Report</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={cx("ml-auto flex justify-center items-center mr-4")}>
        <Tippy
          interactive
          visible={toggle}
          placement="bottom-end"
          render={(attrs) => (
            <div
              className={cx("tippy-wrapper")}
              tabIndex="-1"
              ref={tippyWrapperRef}
              {...attrs}
            >
              <h1 className="w-full h-[10%] text-[1.25rem] text-[#172b4d] font-medium ">
                Settings
              </h1>
              <div className="my-[0.75rem]">
                <h2 className="text-[0.85rem] text-[#172b4d]">
                  QuickService Settings
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
                <h2 className="text-[0.85rem] text-[#172b4d] ">
                  Personal Settings
                </h2>
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
            className="h-[50%] aspect-square m-[0.5rem] cursor-pointer"
            ref={settingRef}
          >
            <AiFillSetting
              className="w-full h-full text-[#fff]"
              onClick={handleToggle}
            />
          </div>
        </Tippy>

        <div className="h-[50%] aspect-square m-[0.5rem] cursor-pointer">
          <IoMdNotifications className="w-full h-full text-[#fff]" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
