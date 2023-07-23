import React from "react";
import ChartLayout from "./ChartLayout";

const LineChartNewTicket = () => {
  return (
    <ChartLayout
      title="New tickets"
      subTitle={
        <div>
          <div>New tickets</div>
          <div>9,105</div>
        </div>
      }
    >
      <img src="/images/line-chart-1.png" alt="" className="w-full" />
    </ChartLayout>
  );
};

export default LineChartNewTicket;
