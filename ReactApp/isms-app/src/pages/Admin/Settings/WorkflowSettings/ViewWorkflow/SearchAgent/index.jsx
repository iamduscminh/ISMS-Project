import React, { useState, useEffect, useRef } from "react";
import Tippy from "@tippyjs/react/headless";
import SearchAgentItem from "../../../../../../components/Elements/SearchAgentItem";

const SearchAgent = ({ agentData, handleAddAgent }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(agentData);
  const [checkFocus, setCheckFocus] = useState(false);

  useEffect(() => {

    const filteredArray = agentData.filter((item) => item.fullName.toLowerCase().includes(searchValue.toLowerCase()));
    setSearchResult(filteredArray);
  }, [searchValue]);

  const handleInputBlur = () => {
    // Sử dụng setTimeout để xử lý onBlur sau khi onClick đã được xử lý
    setTimeout(() => {
      setCheckFocus(false);
    }, 300);
  };

  return (
    <Tippy
      interactive
      visible={searchResult.length > 0 && checkFocus}
      placement="bottom-end"
      render={(attrs) => (
        <div className="w-[10rem] min-h-[100px] max-h-[300px] overflow-y-scroll bg-[#fff] border border-[#DFE1E6] shadow-md rounded-md p-[1rem] flex flex-col" tabIndex="-1" {...attrs}>
          <h3 className="mb-[1.5rem] text-[#8D8888]">List Result ({searchResult?.length || 0})</h3>
          {searchResult.map((result) => (
            <SearchAgentItem key={result.userId} data={result} handleAddAgent={handleAddAgent}/>
          ))}
        </div>
      )}
    >
      <input
        onFocus={() => setCheckFocus(true)}
        onBlur={handleInputBlur}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
        className="border border-[#42526E] w-[10rem] ml-[1rem] rounded-md px-[1rem]"
      />
    </Tippy>
  );
};

export default SearchAgent;
