import React from "react";
import ChartLayout from "./ChartLayout";
import ChartCritical from "./ChartCritical";

const LineChartResponseTime = () => {
  return (
    <ChartLayout
      title="First response time"
      subTitle={<div className="font-bold">Ticket satisfactions</div>}
    >
      <img src="/images/line-chart-3.png" alt="" className="w-full" />
      <ul className="flex flex-wrap justify-center gap-x-[60px]">
        <li>
          <ChartCritical color="bg-[#2C834E]" label="Time to response" />
          <div className="font-bold text-lg text-center">10h23min</div>
        </li>
        <li>
          <ChartCritical color="bg-[#48B8F6]" label="Time to assign" />
          <div className="font-bold text-lg text-center">4h32min</div>
        </li>
      </ul>
    </ChartLayout>
  );
};

export default LineChartResponseTime;
