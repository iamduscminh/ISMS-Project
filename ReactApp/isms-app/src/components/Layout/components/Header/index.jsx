import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { BsSearch, BsFillInfoSquareFill } from "react-icons/bs";
const cx = classNames.bind(styles);
function Header() {
  return <div className={cx("header-container")}></div>;
}

export default Header;
