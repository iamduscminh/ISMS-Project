import React from "react";
import ChartLayout from "./ChartLayout";
import ChartCritical from "./ChartCritical";

const LineChartSatisfaction = () => {
  return (
    <ChartLayout
      title="Ticket satisfaction"
      subTitle={<div className="font-bold">Ticket satisfaction</div>}
    >
      <img src="/images/line-chart-2.png" alt="" className="w-full" />
      <ul className="flex flex-wrap justify-center gap-x-[60px]">
        <li>
          <ChartCritical color="bg-[#2C834E]" label="Great" />
        </li>
        <li>
          <ChartCritical color="bg-[#48B8F6]" label="Okay" />
        </li>
        <li>
          <ChartCritical color="bg-[#F61E1E]" label="Bad" />
        </li>
      </ul>
    </ChartLayout>
  );
};

export default LineChartSatisfaction;
