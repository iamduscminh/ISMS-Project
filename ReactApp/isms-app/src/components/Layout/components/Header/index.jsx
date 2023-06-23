import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import image from "../../../../assets/images";
import Dropdown from "../../../Elements/Dropdown";
import { GrNotification } from "react-icons/gr";
import { BiUserCircle } from "react-icons/bi";

const cx = classNames.bind(styles);
function Header() {
  //Dropdown variable
  const [openDrNoti, setOpenDrNoti] = React.useState(false);
  const [openDrProf, setOpenDrProf] = React.useState(false);
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
          <button className={cx("header-noti-button")} onClick={handleOpenNoti}>
            <GrNotification className={cx("text-white")} />
          </button>
          <div className={cx("header-noti-dropdown")}>
            <Dropdown
              open={openDrNoti}
              menu={[
                <button onClick={handleDrNotiItem1}>Option 1</button>,
                <button onClick={handleDrNotiItem2}>Option 2</button>,
              ]}
            />
          </div>
        </div>
        <div className={cx("header-profile")}>
          <button
            className={cx("header-profile-button")}
            onClick={handleOpenProf}
          >
            <BiUserCircle className={cx("header-profile-icon")} />
          </button>
          <div className={cx("header-prof-dropdown")}>
            <Dropdown
              open={openDrProf}
              menu={[
                <button>Option pr 1</button>,
                <button>Option pr 2</button>,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
