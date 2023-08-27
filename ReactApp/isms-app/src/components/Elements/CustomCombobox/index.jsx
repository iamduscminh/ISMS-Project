import React, { useState, useEffect } from "react";
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
  isServiceRequest = false,
  component: Component,
  data: data,
  onSelect,
  value,
  overlay,
  showProp1,
  showProp2,
  wrapper,
  customStyle = {
    marginTop: "mt-[1rem]",
    height: "h-[2.5rem]",
    fontSize: "text-[1.25rem]",
    borderRadius: "rounded-md",
  },
}) => {

  const [showCombobox, setShowCombobox] = useState(false);

  const [selectedOption, setSelectedOption] = useState([]);
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);
  const handleSelect = (selectedItem) => {
    onSelect(selectedItem.priority);
    setShowCombobox(false);
  };
  const text = "icon";
  // Kiểm tra isServiceRequest trước khi hiển thị combobox
  if (isServiceRequest) {
    return (
      <div
        className={cx(`w-full relative ${customStyle.marginTop} z-${overlay}`)}
      >
        <div
          className={cx(
            `shadow-sm cursor-pointer flex ${customStyle.height} bg-[#fff] px-[0.75rem] ${customStyle.fontSize} font-normal, ${customStyle.borderRadius} items-center justify-between`
          )}
        >
          <span className={cx("sBtn-text")}>
            {selectedOption ? (
              <div className="flex items-center">
                {showProp1 === "avatar" ? (
                  <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden mr-[0.5rem]">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={selectedOption[showProp1]}
                      alt=""
                    />
                  </div>
                ) : wrapper ? (
                  <div
                    className={cx(
                      `w-[1.3rem] mr-[0.5rem] aspect-square rounded-md bg-[#${wrapper}] flex items-center justify-center text-[#fff] text-[1rem]`
                    )}
                  >
                    {selectedOption}
                  </div>
                ) : (
                  <div className="mr-[1rem] text-[1rem]">
                    {selectedOption[showProp1]}
                  </div>
                )}

                <span className="ml-[1.5rem] text-[#42526E] text-[1rem]">
                  {selectedOption[showProp2]}
                </span>
              </div>
            ) : (
              "Select your option"
            )}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx(`w-full relative ${customStyle.marginTop} z-${overlay}`)}
    >
      <div
        className={cx(
          `shadow-sm cursor-pointer flex ${customStyle.height} bg-[#fff] px-[0.75rem] ${customStyle.fontSize} font-normal, ${customStyle.borderRadius} items-center justify-between`
        )}
        onClick={(e) => setShowCombobox(!showCombobox)}
      >
        <span className={cx("sBtn-text")}>
          {selectedOption ? (
            <div className="flex items-center">
              {showProp1 === "avatar" ? (
                <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden mr-[0.5rem]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={selectedOption[showProp1]}
                    alt=""
                  />
                </div>
              ) : wrapper ? (
                <div
                  className={cx(
                    `w-[1.3rem] mr-[0.5rem] aspect-square rounded-md bg-[#${wrapper}] flex items-center justify-center text-[#fff] text-[1rem]`
                  )}
                >
                  {selectedOption}
                </div>
              ) : (
                <div className="mr-[1rem] text-[1rem]">
                  {selectedOption[showProp1]}
                </div>
              )}

              <span className="ml-[1.5rem] text-[#42526E] text-[1rem]">
                {selectedOption[showProp2]}
              </span>
            </div>
          ) : (
            "Select your option"
          )}
        </span>
        {!showCombobox ? (
          <MdKeyboardArrowDown className={cx("text-[1.5rem]")} />
        ) : (
          <MdKeyboardArrowUp className={cx("text-[1.5rem]")} />
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
