import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SiAddthis } from "react-icons/si";

const listTrigger = [
  {
    id: 1,
    trigger: "Ticket Created",
  },
  {
    id: 2,
    trigger: "Assignee: From Unassigned",
  },
  {
    id: 3,
    trigger: "Resolution: Set",
  },
];

const SLATrigger = ({checkEditSla, currentTrigger, onAddTrigger, onRemoveTrigger}) => {
  const filteredTrigger = listTrigger.filter((trigger) => {
    return !currentTrigger.some((active) => active.id === trigger.id);
  });
  const [checkAddTrigger, setCheckAddTrigger] = useState(false);
  const [availableTrigger, setAvailableTrigger] = useState(filteredTrigger);
  const [activeTrigger, setActiveTrigger] = useState(currentTrigger);
  const inputRef = useRef(null);
  const handleAddActiveTrigger = (selectedItem) => {
    // setActiveTrigger((prev) => [
    //   ...prev,
    //   {
    //     id: selectedItem.id,
    //     trigger: selectedItem.trigger,
    //   },
    // ]);
    const available = availableTrigger.filter((e) => e.id !== selectedItem.id);
    setAvailableTrigger(available);
    setCheckAddTrigger(false);
    onAddTrigger(selectedItem);
  };

  const handleRemoveActiveTrigger = (selectedItem) => {
    const filterList = activeTrigger.filter((e) => e.id !== selectedItem.id);
    setActiveTrigger(filterList);
    setAvailableTrigger((prev) => [...prev, selectedItem]);
    onRemoveTrigger(selectedItem);
  };

  const showTriggerOption = () => {
    setCheckAddTrigger(true);
  };

  const closeTriggerOption = () =>{
    setCheckAddTrigger(false);
  }
  return (
    <>
      {activeTrigger?.map((item) => (
        <div
          key={item.id}
          className="relative flex items-center w-full border border-[#bdbbbb] rounded-md shadow-sm px-[1rem] py-[0.25rem] mb-[0.5rem]"
        >
          <span>{item.trigger}</span>
          {checkEditSla && <AiOutlineClose
            onClick={() => handleRemoveActiveTrigger(item)}
            className="ml-auto cursor-pointer"
          />}
        </div>
      ))}
      {!checkAddTrigger && (
        <div onClick={showTriggerOption} className=" cursor-pointer flex justify-center items-center w-full border border-[#bdbbbb] rounded-md shadow-sm px-[1rem] py-[0.25rem] mb-[0.5rem]">
          {checkEditSla && <div className="flex justify-center items-center text-[#42526E]">
            <SiAddthis className="mr-[1rem]" />
            <span>Add Trigger</span>
          </div>}
        </div>
      )}
      {checkAddTrigger && <div className="relative flex items-center w-full border border-[#bdbbbb] rounded-md shadow-sm px-[1rem] py-[0.25rem] mb-[0.5rem]">
        <div>
            <input type="text" ref={inputRef} className="w-full"/>
            <AiOutlineClose onClick={closeTriggerOption} className="absolute right-2 top-0 translate-y-[50%] cursor-pointer"/>
        </div>   
        <div className="absolute left-0 bottom-0 translate-y-[104%] w-full border bg-[#fff] border-[#bdbbbb] rounded-md shadow-sm px-[1rem] py-[0.25rem]">
          {availableTrigger.map((item) => (
            <div
              className="px-[0.75rem] cursor-pointer hover:bg-[#edebeb]"
              key={item.id}
              onClick={() => handleAddActiveTrigger(item)}
            >
              {item.trigger}
            </div>
          ))}
        </div>
      </div>}
    </>
  );
};

export default SLATrigger;
