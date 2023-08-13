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
import React from "react";
import { Line } from "react-chartjs-2";
import ChartLayout from "./ChartLayout";

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

const LineChartNewTicket = ({ data }) => {
  const dataConfig = {
    labels,
    datasets: [
      {
        label: "New tickets",
        data: data,
        borderColor: "#2C834E",
        backgroundColor: "#2C834E",
        borderWidth: 2,
      },
    ],
  };

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
      <div className="w-full">
        <Line options={options} data={dataConfig} />
      </div>
    </ChartLayout>
  );
};

export default LineChartNewTicket;
