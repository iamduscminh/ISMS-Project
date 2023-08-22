import React from "react";
import ChartLayout from "./ChartLayout";
import ChartCritical from "./ChartCritical";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const labels = [];

const LineChartResponseTime = ({ data }) => {
  const dataConfig = {
    labels,
    datasets: [
      {
        label: "Time to response",
        data: data.responseTime,
        borderColor: "#2C834E",
        backgroundColor: "#2C834E",
        borderWidth: 2,
      },
      {
        label: "Time to assign",
        data: data.assignTime,
        borderColor: "#48B8F6",
        backgroundColor: "#48B8F6",
        borderWidth: 2,
      },
    ],
  };

  return (
    <ChartLayout
      title="First response time"
      subTitle={<div className="font-bold">Ticket satisfactions</div>}
    >
      <div className="w-full">
        <Line options={options} data={dataConfig} />
      </div>
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
