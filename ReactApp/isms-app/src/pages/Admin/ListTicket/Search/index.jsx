import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react/headless";
import { BsSearch } from "react-icons/bs";
import SearchResultItem from "../../../../components/Elements/SearchResultItem";
import classNames from "classnames";
import styles from "./Search.Module.scss";

const cx = classNames.bind(styles);
const fakeApi = [
  {
    id: 1,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
  {
    id: 2,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
  {
    id: 3,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
  {
    id: 4,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
  {
    id: 5,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
  {
    id: 6,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
  {
    id: 7,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
  {
    id: 8,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
  {
    id: 9,
    description: "Demo test Service Ticket",
    service: "Hardware",
    reporter: "Tu Doan",
    assignee: "Calyrex",
    status: "WIP",
    createdDate: "2023/07/04 14:00:00",
    sla: "2023/07/04 14:00:00",
  },
];
const Search = ({ data }) => {
  console.log(data);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    if (searchValue === "") setSearchResult([]);
    else {
      const filteredArray = data.filter((item) =>
        item.title.includes(searchValue)
      );
      setSearchResult(filteredArray);
    }
  }, [searchValue]);
  return (
    <Tippy
      interactive
      visible={searchResult.length > 0}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx("search-wrapper")} tabIndex="-1" {...attrs}>
          <h3 className="mb-[1.5rem] text-[#8D8888]">
            List Result ({searchResult.length})
          </h3>
          {searchResult.map((result) => (
            <SearchResultItem key={result.id} data={result} />
          ))}
        </div>
      )}
    >
      <div className={cx("search-content")}>
        <div className={cx("search-bar")}>
          <input
            value={searchValue}
            type="text"
            className={cx("search-bar-input")}
            placeholder="Enter ticket Id or Description"
            aria-label="search"
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className={cx("search-bar-submit")}
            aria-label="submit search"
          >
            <BsSearch />
          </button>
        </div>
      </div>
    </Tippy>
  );
};

export default Search;
