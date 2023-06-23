import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import image from "../../../../assets/images";
import { GrNotification } from "react-icons/gr";
import { BiUserCircle } from "react-icons/bi";
const cx = classNames.bind(styles);
function Header() {
  //Dropdown variable
  const [openDrNoti, setOpenDrNoti] = React.useState(false);
  const handleOpen = () => {
    setOpenDrNoti(!open);
  };
  const handleMenuOne = () => {
    // do something
    setOpenDrNoti(false);
    console.log("clicked one");
  };

  const handleMenuTwo = () => {
    // do something
    setOpenDrNoti(false);
    console.log("clicked two");
  };

  return (
    <div className={cx("header-container")}>
      <div className={cx("header-left-side")}>
        <div className={cx("header-logo")}>
          <img src={image.shortLogo} alt="" />
          <div>
            <span>QUICK SERVICE</span>
          </div>
        </div>
      </div>
      <div className={cx("header-right-side")}>
        <div className={cx("header-noti")}>
          <button className={cx("header-noti-button")}>
            <GrNotification className={cx("text-white")} />
          </button>
          <div className={cx("header-noti-dropdown")}>
            <div className="noti-dropdown-container">
              <div className="noti-dropdown-item"></div>
            </div>
          </div>
        </div>
        <div className={cx("header-profile")}>
          <button className={cx("header-profile-button")}>
            <BiUserCircle className={cx("header-profile-icon")} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
