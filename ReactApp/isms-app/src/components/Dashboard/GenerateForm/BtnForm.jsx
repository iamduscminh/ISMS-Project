import clsx from "clsx";
import React from "react";

const BtnForm = ({ title, onClick, className, type }) => {
  return (
    <button
      type={type}
      className={clsx(
        "rounded-none border border-black focus:outline-none w-[155px] py-2 text-sm text-center",
        className
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default BtnForm;
