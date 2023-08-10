import React, { useState } from "react";

const PrioritySelection = ({ priorityData, data, onSelect }) => {
  console.log(data.priority);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [priorityValue, setPriorityValue] = useState(data.priority);

  console.log(priorityValue);
  const handleUpdate = (checkItem, e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const newValue = [...priorityValue, checkItem.priority]
      setPriorityValue(newValue);
      onSelect(newValue);
    } else {
      const newValue = priorityValue.filter((i) => i !== checkItem.priority)
      setPriorityValue(newValue);
      onSelect(newValue);
    }
  };

  return (
    <div className="bg-[#fff] rounded-tr-md rounded-br-md border relative px-[1rem]">
      <div
        className="w-full text-[#42526E]"
        onClick={() => setOpenCombobox((prev) => !prev)}
      >
        {": " + priorityValue.join(",")}
      </div>
      {openCombobox && (
        <div className="w-full absolute top-[120%] border z-[10] bg-[#fff] left-[0] rounded-sm px-[1rem] py-[0.5rem]">
          {priorityData.map((item) => (
            <div key={item.id} className="flex mt-[0.75rem]">
              {priorityValue.includes(item.priority) ? (
                <input
                  checked
                  onChange={(e) => handleUpdate(item, e)}
                  type="checkbox"
                  className="mr-[1rem]"
                />
              ) : (
                <input
                  onChange={(e) => handleUpdate(item, e)}
                  type="checkbox"
                  className="mr-[1rem]"
                />
              )}
              {item.icon}
              <h4 className="ml-[0.75rem]">{item.priority}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrioritySelection;
