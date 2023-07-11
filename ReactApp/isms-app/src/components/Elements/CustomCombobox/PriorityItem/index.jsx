import React from "react";
import classNames from "classnames/bind";
import styles from "./PriorityItem.module.scss";

const cx = classNames.bind(styles);

const PriorityItem = ({ data, onSelect }) => {
  const handleClick = (item) => {
    onSelect(item);
  };
  return (
    <>
      {data.map((item) => (
        <li
          key={item.id}
          className={cx("option")}
          onClick={() => handleClick(item)}
        >
          <div className="mr-[1rem] text-[1.25ren]">{item.icon}</div>
          <span className={cx("option-text")}>{item.priority}</span>
        </li>
      ))}
    </>
  );
};

export default PriorityItem;
