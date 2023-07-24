import React from "react";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import { IconArrowDown, IconSelected } from "./Icons";

const ExportField = ({
  options,
  placeholder,
  selected,
  setSelected,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const ref = useClickAway(() => {
    setOpen(false);
  });

  return (
    <div
      ref={ref}
      className={clsx(
        "relative py-2 pl-5 pr-4 border border-black focus:outline-none mt-1 cursor-pointer w-full",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        setOpen(true);
      }}
    >
      <div className="bg-white">
        <div className="border-0 hover:border-0 flex justify-between rounded-none items-center w-full text-start focus:outline-none">
          <span>{selected?.label || placeholder}</span>
          <IconArrowDown />
        </div>
        <ul
          className={clsx(
            "z-10 absolute top-full border-black bg-white left-0 border right-0 transition-all px-2.5 py-1",
            open ? "block opacity-100" : "max-h-0 hidden opacity-0"
          )}
        >
          {options?.map((option) => {
            const isSelected = selected?.value === option.value;
            return (
              <li
                key={option.value}
                className="flex border-b py-1.5 last:border-b-0 border-black"
              >
                <button
                  className="pl-5 pr-2 w-full border-none focus:outline-none flex justify-between space-x-2 items-center"
                  onClick={(e) => {
                    e.preventDefault();
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

export default ExportField;
