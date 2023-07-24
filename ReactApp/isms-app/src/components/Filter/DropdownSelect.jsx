import React from "react";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";

const FilterDropdownSelect = ({
  options,
  placeholder,
  title,
  selectedValues,
  setSelectedValues,
}) => {
  const [open, setOpen] = useState(false);

  const ref = useClickAway(() => {
    setOpen(false);
  });

  const handleOnSelect = (option) => {
    if (selectedValues?.includes(option)) {
      setSelectedValues((prev) =>
        prev?.filter((item) => item?.value !== option?.value)
      );
      return;
    }

    setSelectedValues((prev) => [...prev, option]);
  };

  let triggerLabel = placeholder;
  if (selectedValues?.length > 0)
    triggerLabel =
      selectedValues?.length === options?.length
        ? "All"
        : selectedValues?.map((item) => item?.label)?.join(", ");

  const selectedValuesNormalized = selectedValues?.map((item) => item?.value);

  return (
    <div className="bg-[#DCE4FF] space-y-1 text-black rounded-2xl px-5 py-4">
      <span>{title}</span>
      <div className="relative bg-white" ref={ref}>
        <button
          className="border-0 hover:border-0 flex justify-between p-1 rounded-none items-center pr-3 w-full text-start focus:outline-none"
          onClick={() => {
            setOpen(true);
          }}
        >
          <span className="text-15px">{triggerLabel}</span>
          <img src="/images/arrow-down.svg" alt="" />
        </button>
        <ul
          className={clsx(
            "absolute top-full border-black bg-white left-0 border right-0 transition-all px-2.5 py-1",
            open ? "block opacity-100" : "max-h-0 hidden opacity-0"
          )}
        >
          {options?.map((option) => {
            const isSelected = selectedValuesNormalized?.includes(option.value);
            return (
              <li
                key={option.value}
                className="flex border-b py-1.5 last:border-b-0 border-black"
              >
                <button
                  className="w-full border-none focus:outline-none flex space-x-2  items-center"
                  onClick={() => {
                    handleOnSelect(option);
                  }}
                >
                  <div
                    className={clsx(
                      "border w-2.5 h-2.5 border-black rounded-none",
                      isSelected && "bg-black"
                    )}
                  />
                  <span className="text-10px">{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FilterDropdownSelect;