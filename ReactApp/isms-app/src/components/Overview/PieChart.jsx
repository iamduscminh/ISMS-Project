import clsx from "clsx";
import React from "react";
import ChartCritical from "./ChartCritical";

const Label = ({ index, label }) => {
  let color = "bg-[#2C834E]";
  if (index === 1) color = "bg-[#FA8418]";
  if (index === 2) color = "bg-[#F61E1E]";
  if (index === 3) color = "bg-[#48B8F6]";
  return <ChartCritical color={color} label={label} />;
};

const PieChart = ({ data, title, index }) => {
  return (
    <div className="border border-black shadow-xl">
      <div className="flex justify-between border-b-2 border-black items-center px-4 py-2 bg-[#E7E7E7]">
        <div className="flex items-center space-x-2">
          <img src="/images/icon-drag.svg" alt="" />
          <span className="text-xs font-bold">{title}</span>
        </div>
        <img src="/images/icon-menu.svg" alt="" />
      </div>
      <div className="p-5 space-y-5 bg-white">
        <div className="grid grid-cols-2 w-[230px] mx-auto">
          {data?.map((item, index) => (
            <Label key={item?.label} index={index} label={item?.label} />
          ))}
        </div>
        <div className="flex justify-center">
          {index === 0 && <img src="/images/type-circle.png" alt="" />}
          {index === 1 && <img src="/images/priority-circle.png" alt="" />}
          {index === 2 && <img src="/images/status-circle.png" alt="" />}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
