import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { BsSearch, BsFillInfoSquareFill } from "react-icons/bs";
const cx = classNames.bind(styles);
function Header() {
  return (
    <div className={cx("header-container")}>
      <div className={cx("header-left-side")}></div>
      <div className={cx("header-right-side")}>
        <div className={cx("header-notification")}></div>
        <div className={cx("header-profile")}></div>
      </div>
    </div>
  );
}

export default Header;
