import React from "react";
import ChartLayout from "./ChartLayout";
import ChartCritical from "./ChartCritical";

const LineChartSolvedAndClose = () => {
  return (
    <ChartLayout title="Solved and closed">
      <img src="/images/line-chart-4.png" alt="" className="w-full" />
      <ul className="flex flex-wrap justify-center gap-x-[60px]">
        <li>
          <ChartCritical color="bg-[#2C834E]" label="Solved" />
        </li>
        <li>
          <ChartCritical color="bg-black" label="Closed" />
        </li>
      </ul>
    </ChartLayout>
  );
};

export default LineChartSolvedAndClose;
