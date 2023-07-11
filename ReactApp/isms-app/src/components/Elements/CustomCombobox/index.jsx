import React, { useState } from "react";
import styles from "./CustomCombobox.module.scss";
import classNames from "classnames/bind";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdElectricalServices,
} from "react-icons/md";
import ServiceTypeItem from "./ServiceTypeItem";

const cx = classNames.bind(styles);
const CustomCombobox = ({ component: Component, data: data, onSelect, ticketService }) => {
  const [showCombobox, setShowCombobox] = useState(false);

  const [selectedOption, setSelectedOption] = useState(ticketService);

  const handleSelect = (selectedItem) => {
    setSelectedOption(selectedItem);
    onSelect(selectedItem);
    setShowCombobox(false);
  };

  return (
    <div className={cx("select-menu")}>
      <div
        className={cx("select-btn")}
        onClick={(e) => setShowCombobox(!showCombobox)}
      >
        <span className={cx("sBtn-text")}>
          {selectedOption ? (<div className="flex items-center">
            <div className="w-[1.3rem] mr-[0.5rem] aspect-square rounded-md bg-[#FF7452] flex items-center justify-center text-[#fff] text-[1.5rem]">
              {selectedOption.icon}
            </div>
            <span className="ml-[1.5rem]">{selectedOption.serviceName}</span></div>
          ) : (
            "Select your Service"
          )}
        </span>
        {!showCombobox ? (
          <MdKeyboardArrowDown className={cx("icon")} />
        ) : (
          <MdKeyboardArrowUp className={cx("icon")} />
        )}
      </div>
      {showCombobox && (
        <ul className={cx("options")}>
          <Component data={data} onSelect={handleSelect} />
        </ul>
      )}
    </div>
  );
};

export default CustomCombobox;
