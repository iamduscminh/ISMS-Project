import React from "react";
const SearchAgentItem = ({data}) => {
  return (
    <div className="flex items-center mb-[1rem] hover:bg-[#ebecf0] px-[0.5rem] py-[0.3rem] rounded-sm cursor-pointer">
      <div className="w-[100%] text-[1rem] mr-[2rem] text-[#172B4D]">{`${data.name}`}</div>
    </div>
  );
};

export default SearchAgentItem;
