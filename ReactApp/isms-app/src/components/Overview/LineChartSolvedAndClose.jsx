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

const LineChartSolvedAndClose = ({ data }) => {
  const dataConfig = {
    labels,
    datasets: [
      {
        label: "Solved",
        data: data.solved,
        borderColor: "#2C834E",
        backgroundColor: "#2C834E",
        borderWidth: 2,
      },
      {
        label: "Closed",
        data: data.closed,
        borderColor: "#000",
        backgroundColor: "#000",
        borderWidth: 2,
      },
    ],
  };

  return (
    <ChartLayout title="Solved and closed">
      <div className="w-full">
        <Line options={options} data={dataConfig} />
      </div>
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
