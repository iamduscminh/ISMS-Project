import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./TicketStatus.module.scss";
import StatusItem from "./StatusItem";

const cx = classNames.bind(styles);
const statusData = [
  {
    id: 1,
    text: "New",
  },
  {
    id: 2,
    text: "Reject",
  },
  {
    id: 3,
    text: "Inprogress",
  },
  {
    id: 4,
    text: "Resolved",
  },
  {
    id: 5,
    text: "Pending",
  },
  {
    id: 6,
    text: "Close",
  },
];
const TicketStatus = ({
  currentStatus,
  onSelect,
  customStyles = {
    paddingY: "py-[0.5rem]",
  },
}) => {
  const [showCombobox, setShowCombobox] = useState(false);
  const [selectedOption, setSelectedOption] = useState(currentStatus);
  const handleSelect = (selectedStatus) => {
    setSelectedOption(selectedStatus);
    onSelect(selectedStatus);
    setShowCombobox(false);
  };
  return (
    <div className="w-[full] flex items-center justify-center">
      <div className="w-[60%] relative">
        <div
          onClick={(e) => setShowCombobox(!showCombobox)}
          className={cx(`w-full bg-[#42526E] text-center text-[#fff] rounded-[10px] px-[1rem] ${customStyles.paddingY} font-medium cursor-pointer`)} 
        >
          {selectedOption.text}
        </div>
        {showCombobox && (
          <div className="w-full absolute left-0 bottom-0 translate-y-[104%] bg-[#fff] shadow-sm rounded-md overflow-hidden">
            {statusData.map((item) => (
              <StatusItem status={item} key={item.id} onSelect={handleSelect} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketStatus;
