import React from "react";
import classNames from 'classnames/bind'
import styles from './TicketQuery.module.scss';
import FilterCondition from "../../../components/Elements/FilterCondition";

const cx = classNames.bind(styles);
const TicketQuery = () => {
  return (
    <div>
      <div className="w-full h-[18vh] bg-[#42526E]">
        <div className="ml-[8rem] pt-[0.8rem]">
          <div className="text-[1rem] text-[#fff] font-medium">Incidents Query</div>
          <div>
            <input type="text" placeholder="Query Title" className={cx('query-input')}/>
          </div>
          <div className="mt-[0.75rem]">
            <input type="checkbox" className="w-[1rem] aspect-square"/>
            <span className="text-[1rem] text-[#fff] ml-[1rem]">Add this queue to Team Important Query</span>
          </div>
        </div>
      </div>
      <div>
        {/* filter conditions */}
        <div className="ml-[8rem] mt-[1rem] w-[full]">
            <h2 className="text-[#42526E] font-medium text-[1.25rem] ">Filter Conditions</h2>
            <FilterCondition/>
        </div>
      </div>
    </div>
  );
};

export default TicketQuery;
