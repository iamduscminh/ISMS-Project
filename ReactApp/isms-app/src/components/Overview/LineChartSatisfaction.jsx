import React from "react";
import ChartCritical from "./ChartCritical";
import ChartLayout from "./ChartLayout";
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
const LineChartSatisfaction = ({ data }) => {
  const dataConfig = {
    labels,
    datasets: [
      {
        label: "Ticket Great",
        data: data.great,
        borderColor: "#2C834E",
        backgroundColor: "#2C834E",
        borderWidth: 2,
      },
      {
        label: "Ticket Okay",
        data: data.okay,
        borderColor: "#48B8F6",
        backgroundColor: "#48B8F6",
        borderWidth: 2,
      },
      {
        label: "Ticket bad",
        data: data.bad,
        borderColor: "#F61E1E",
        backgroundColor: "#F61E1E",
        borderWidth: 2,
      },
    ],
  };

  return (
    <ChartLayout
      title="Ticket satisfaction"
      subTitle={<div className="font-bold">Ticket satisfaction</div>}
    >
      <div className="w-full">
        <Line options={options} data={dataConfig} />
      </div>
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
