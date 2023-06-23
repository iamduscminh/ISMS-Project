import * as React from "react";
import classNames from "classnames/bind";
import styles from "./Dropdown.module.scss";
const cx = classNames.bind(styles);

const Dropdown = ({ open, menu }) => {
  return (
    <div className={cx("dropdown")}>
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
