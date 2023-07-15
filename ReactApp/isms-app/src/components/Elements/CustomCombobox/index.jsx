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
const CustomCombobox = ({
  component: Component,
  data: data,
  onSelect,
  value,
  overlay,
  showProp1,
  showProp2,
  wrapper
}) => {
  const [showCombobox, setShowCombobox] = useState(false);

  const [selectedOption, setSelectedOption] = useState(value);

  const handleSelect = (selectedItem) => {
    setSelectedOption(selectedItem);
    onSelect(selectedItem);
    setShowCombobox(false);
  };
  const text = "icon";
  return (
    <div className={cx(`w-full relative mt-[1rem] z-${overlay}`)}>
      <div
        className={cx("select-btn")}
        onClick={(e) => setShowCombobox(!showCombobox)}
      >
        <span className={cx("sBtn-text")}>
          {selectedOption ? (
            <div className="flex items-center">

             {wrapper ? <div className={cx(`w-[1.3rem] mr-[0.5rem] aspect-square rounded-md bg-[#${wrapper}] flex items-center justify-center text-[#fff] text-[1.5rem]`)}>
                {selectedOption[showProp1]}
              </div> : <div className="mr-[1rem] text-[1.25ren]">{selectedOption[showProp1]}</div>
              }

              <span className="ml-[1.5rem] text-[#42526E]">
                {selectedOption[showProp2]}
              </span>
            </div>
          ) : (
            "Select your option"
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
