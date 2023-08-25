import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./TicketStatus.module.scss";
import StatusItem from "./StatusItem";

const cx = classNames.bind(styles);
const statusData = [
  {
    id: 1,
    text: "Open",
  },
  {
    id: 2,
    text: "InProgress",
  },
  {
    id: 3,
    text: "Pending",
  },
  {
    id: 4,
    text: "Resolved",
  },
  {
    id: 5,
    text: "Closed",
  },
];
const TicketStatus = ({
  isServiceRequest,
  currentStatus,
  onSelect,
  customStyles = {
    paddingY: "py-[0.5rem]",
  },
}) => {
  const [showCombobox, setShowCombobox] = useState(false);
  const [selectedOption, setSelectedOption] = useState(currentStatus);
  useEffect(() => {
    setSelectedOption(currentStatus);
  }, [currentStatus]);
  const handleSelect = (selectedStatus) => {
    onSelect(selectedStatus.text);
    setShowCombobox(false);
  };
  if (isServiceRequest) {
    return (
      <div className="w-[full] flex items-center justify-center">
        <div className="w-[60%] relative">
          <div
            className={cx(`w-full bg-[#42526E] text-center text-[#fff] rounded-[10px] px-[1rem] ${customStyles.paddingY}  font-medium`)} 
          >
            {selectedOption}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[full] flex items-center justify-center">
      <div className="w-[60%] relative">
        <div
          onClick={(e) => setShowCombobox(!showCombobox)}
          className={cx(`w-full bg-[#42526E] text-center text-[#fff] rounded-[10px] px-[1rem] ${customStyles.paddingY}  font-medium cursor-pointer`)} 
        >
          {selectedOption}
        </div>
        {showCombobox && (
          <div className={cx(`w-full absolute left-0 bottom-0 translate-y-[104%] bg-[#fff] shadow-sm rounded-md overflow-hidden ${customStyles.zIndex}`)}>
            {statusData.map((item, index) => (
              <StatusItem status={item} key={index} onSelect={handleSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketStatus;