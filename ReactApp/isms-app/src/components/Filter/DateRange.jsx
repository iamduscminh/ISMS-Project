import React from "react";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import { RANGE_VALUES } from "./InitState";
import { format } from "date-fns";

const IconSelected = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
  >
    <path
      d="M10 1.05145L3.14286 10L0 5.89858L0.805714 4.84713L3.14286 7.88963L9.19429 0L10 1.05145Z"
      fill="#48B8F6"
    />
  </svg>
);

// const getTimeDetail = (current, range) => {
//     switch(range) {
//         case RANGE_VALUES.LAST_WEEK :
//         {
//             return format(current)
//         }
//     }

// }

const FilterDateRange = ({
  options,
  placeholder,
  title,
  selected,
  setSelected,
  className,
}) => {
  const [open, setOpen] = useState(false);
  // const current = new Date();

  const ref = useClickAway(() => {
    setOpen(false);
  });

  return (
    <div
      className={clsx(
        "bg-[#DCE4FF] space-y-1 text-black rounded-2xl px-5 py-4",
        className
      )}
    >
      <span>{title}</span>
      <div className="relative bg-white" ref={ref}>
        <button
          className="border-0 hover:border-0 flex justify-between p-1 rounded-none items-center pr-3 w-full text-start focus:outline-none"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span className="text-15px">{selected?.label || placeholder}</span>
          <img src="/images/arrow-down.svg" alt="" />
        </button>
        <ul
          className={clsx(
            "absolute top-full border-black bg-white left-0 border right-0 transition-all px-2.5 py-1",
            open ? "block opacity-100" : "max-h-0 hidden opacity-0"
          )}
        >
          {options?.map((option) => {
            const isSelected = selected?.value === option.value;
            console.log(selected);
            return (
              <li
                key={option.value}
                className="flex border-b py-1.5 last:border-b-0 border-black"
              >
                <button
                  className="pl-5 pr-2 w-full border-none focus:outline-none flex justify-between space-x-2  items-center"
                  onClick={() => {
                    setSelected(option);
                  }}
                >
                  <span
                    className={clsx(
                      "text-10px hover:text-[#48B8F6]",
                      isSelected && "text-[#48B8F6]"
                    )}
                  >
                    {option.label}{" "}
                    {option?.subLabel ? `(${option?.subLabel})` : ""}
                  </span>
                  {isSelected && <IconSelected />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterDateRange;