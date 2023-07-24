import clsx from "clsx";
import React from "react";

const ChartCritical = ({ color, label }) => {
  return (
    <div className="flex space-x-4 items-center">
      <span className={clsx(color, "w-2.5 h-2.5 rounded-full")}></span>
      <span className="text-xs">{label}</span>
    </div>
  );
};

export default ChartCritical;
