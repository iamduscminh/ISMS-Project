import clsx from "clsx";
import React, { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import { roleTypes } from "../../../pages/AdminRole";
const IconArrowDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
  >
    <path
      d="M17.5 22.4222L8.75 13.6722L10.3177 12.1045L17.5 19.3232L24.6823 12.141L26.25 13.7087L17.5 22.4222Z"
      fill="black"
    />
  </svg>
);

const DropdownRoleType = ({ selected, setSelected, className }) => {
  const [open, setOpen] = useState(false);
  const ref = useClickAway(() => {
    setOpen(false);
  });
  return (
    <div
      ref={ref}
      className={clsx(
        "relative rounded-md pl-5 pr-4 bg-white border border-[#C9C5C5] focus:outline-none mt-1 cursor-pointer text-lg xl:text-2xl w-full",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
    >
      <div>
        <div className="border-0 hover:border-0 flex justify-between rounded-none items-center w-full text-start focus:outline-none">
          <span>{selected.name || "Select role type"}</span>
          <IconArrowDown />
        </div>
        <ul
          className={clsx(
            "z-10 absolute top-full border-[#C9C5C5] bg-white left-0 border right-0 transition-all",
            open ? "block opacity-100" : "max-h-0 hidden opacity-0"
          )}
        >
          {roleTypes?.map((option) => {
            const isSelected = selected?.id === option.id;
            return (
              <li key={option.id} className="flex">
                <button
                  className={clsx(
                    "rounded-none pl-5 py-3 xl:py-4 pr-2 w-full border-none focus:outline-none flex justify-between space-x-2  items-center",
                    isSelected
                      ? "bg-[#F0F0F0]"
                      : "bg-[#EBF5FF] hover:bg-[F0F0F0]"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(
                      roleTypes.find((item) => item?.id === option.id)
                    );
                  }}
                >
                  <span
                    className={clsx(
                      "text-lg xl:text-2xl text-left hover:text-[#48B8F6]"
                    )}
                  >
                    {option.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropdownRoleType;
