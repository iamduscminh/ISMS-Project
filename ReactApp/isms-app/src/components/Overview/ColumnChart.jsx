import React from "react";
import ChartLayout from "./ChartLayout";

const ColumnChart = () => {
  return (
    <ChartLayout
      title="Last 7 days"
      subTitle={
        <div>
          <div>New tickets</div>
          <div className="flex space-x-0.5">
            <span>1,814</span>
            <div className="flex items-center text-10px text-[#2C834E]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M11.2329 9.76604L8.20337 4.51885C7.81665 3.84854 7.18384 3.84854 6.79712 4.51885L3.76759 9.76604C3.38087 10.4363 3.69728 10.9838 4.47071 10.9838H10.5298C11.3032 10.9838 11.6196 10.4354 11.2329 9.76604Z"
                  fill="#2C834E"
                />
              </svg>
              <span>163</span>
            </div>
            <span className="text-xs"> from previous 7 days</span>
          </div>
        </div>
      }
    >
      <img src="/images/column-chart.png" alt="" className="w-full" />
      <ul className="flex flex-wrap justify-center gap-x-[60px]">
        <li className="text-center flex flex-col">
          <span className="text-sm">Solved tickets</span>
          <span className="font-bold">22</span>
        </li>
        <li className="text-center flex flex-col">
          <span className="text-sm">Closed tickets</span>
          <span className="font-bold">1053</span>
        </li>
        <li className="text-center flex flex-col">
          <span className="text-sm">Avg. response time</span>
          <span className="font-bold">8h26m</span>
        </li>
      </ul>
    </ChartLayout>
  );
};

export default ColumnChart;
