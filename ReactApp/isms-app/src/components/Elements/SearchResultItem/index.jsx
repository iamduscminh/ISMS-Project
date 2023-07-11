import React from "react";
import { MdElectricalServices } from "react-icons/md";
const SearchResultItem = ({data}) => {
  return (
    <div className="flex items-center mb-[1rem] hover:bg-[#ebecf0] px-[0.5rem] py-[0.3rem] rounded-sm cursor-pointer">
      <div className="w-[1.3rem] mr-[0.5rem] aspect-square rounded-md bg-[#FF7452] flex items-center justify-center text-[#fff]">
        <MdElectricalServices />
      </div>

      <div className="w-[20%] text-[1rem] mr-[1rem] text-[#172B4D]">{`TICKET-${data.id}`}</div>
      <div className="w-[50%] text-[1rem] mr-[2rem] text-[#172B4D]">{`${data.description}`}</div>
      <div className="ml-auto text-[0.75rem] ">{`${data.service}`}</div>
    </div>
  );
};

export default SearchResultItem;
