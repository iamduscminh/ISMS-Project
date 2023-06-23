import * as React from "react";
import classNames from "classnames/bind";
import styles from "./Dropdown.module.css";
const cx = classNames.bind(styles);

const Dropdown = ({ open, trigger, menu }) => {
  return (
    <div className={cx("dropdown")}>
      {trigger}
      {open ? (
        <ul className={cx("menu")}>
          {menu.map((menuItem, index) => (
            <li key={index} className={cx("menu-item")}>
              {menuItem}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
export default Dropdown;
