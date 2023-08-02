import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import SearchAgentItem from "../../../../../../components/Elements/SearchAgentItem";

const fakeApi = [
  {
    id: 1,
    name: "Tu Doan",
  },
  {
    id: 2,
    name: "Calyrex",
  },
  {
    id: 3,
    name: "Spectrier",
  },
];
const SearchAgent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    if (searchValue === "") {
      setSearchResult([]); // Reset searchResult to an empty array when searchValue is empty
    } else {
      const filteredArray = fakeApi.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
      setSearchResult(filteredArray);
    }
  }, [searchValue]);
  return (
    <Tippy
      interactive
      visible={searchResult.length > 0}
      placement="bottom-end"
      render={(attrs) => (
        <div className="w-[10rem] min-h-[100px] bg-[#fff] border border-[#DFE1E6] shadow-md rounded-md p-[1rem] flex flex-col" tabIndex="-1" {...attrs}>
          <h3 className="mb-[1.5rem] text-[#8D8888]">List Result (1)</h3>
          {searchResult.map((result) => (
            <SearchAgentItem key={result.id} data={result} />
          ))}
        </div>
      )}
    >
      <input
        value={searchValue}
        onChange={(e)=>setSearchValue(e.target.value)}
        type="text"
        className="border border-[#42526E] w-[10rem] ml-[1rem] rounded-md px-[1rem]"
      />
    </Tippy>
  );
};

export default SearchAgent;
