import React from "react";
import classNames from "classnames/bind";
import styles from "./TippyItem.module.scss";
import PropTypes from "prop-types";
import IconTag from "../IconTag";
const cx = classNames.bind(styles);

const TippyItem = ({ name, description, color, icon }) => {
  const dynamicClass = classNames(
    "w-[100%]",
    "aspect-square",
    "rounded-sm",
    "flex",
    "justify-center",
    " items-center",
    {
      "bg-[#2684FF]": color === "default",
      "bg-[#172B4D]": color === "personal",
    }
  );
  return (
    <div className="w-full hover:bg-[#f5f5f5] flex flex-start items-center px-[0.5rem] py-[0.2rem] my-[0.4rem] cursor-pointer">
      <div className="w-[10%] text-[#fff] text-[0.8rem]">
        <div className={dynamicClass}>
          <IconTag name={icon} />
        </div>
      </div>
      <div className="ml-[0.4rem] flex justify-center items-start flex-col leading-none">
        <div>
          <span className="text-[0.75rem]">{name}</span>
        </div>
        <div>
          <span className="text-[0.7rem]">{description}</span>
        </div>
      </div>
    </div>
  );
};
TippyItem.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  description: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};
export default TippyItem;
