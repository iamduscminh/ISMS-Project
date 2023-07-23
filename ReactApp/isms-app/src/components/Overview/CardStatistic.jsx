import React from "react";
import clsx from "clsx";

const CardStatistic = ({ title, value, className }) => {
  return (
    <div
      style={{ boxShadow: "6px 6px 10px 0px rgba(0,0,0,0.20)" }}
      className={clsx(
        "bg-white rounded-2xl p-4 xl:px-10 text-black h-[205px]",
        className
      )}
    >
      <span
        className="text-base xl:text-xl uppercase h-12 xl:h-14 line-clamp-2"
        title={title}
      >
        {title}
      </span>
      <span className="text-2xl xl:text-5xl font-bold">{value}</span>
    </div>
  );
};

export default CardStatistic;
