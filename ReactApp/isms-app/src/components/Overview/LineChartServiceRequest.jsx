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
import ChartCritical from "./ChartCritical";

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

const options = {
  responsive: true,
  maintainAspectRatio: false,
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

const LineChartServiecRequest = ({ data }) => {
  const dataConfig = {
    labels,
    datasets: [
      {
        label: "Request new hardware",
        data: data.newHardware,
        borderColor: "#2C834E",
        backgroundColor: "#2C834E",
        borderWidth: 2,
      },
      {
        label: "Set up VPN to the office",
        data: data.vpn,
        borderColor: "#BB2525",
        backgroundColor: "#BB2525",
        borderWidth: 2,
      },
      {
        label: "Request for software installation",
        data: data.installation,
        borderColor: "#191D88",
        backgroundColor: "#191D88",
        borderWidth: 2,
      },
      {
        label: "Get a guest wifi account",
        data: data.wifi,
        borderColor: "#000",
        backgroundColor: "#000",
        borderWidth: 2,
      },
    ],
  };

  return (
    <section>
      <div className="w-full">
        <Line options={options} data={dataConfig} className="h-[300px]" />
      </div>
      <ul className="flex flex-wrap justify-center gap-x-[60px]">
        <li>
          <ChartCritical color="bg-[#2C834E]" label="Request new hardware" />
        </li>
        <li>
          <ChartCritical
            color="bg-[#BB2525]"
            label="Set up VPN to the office"
          />
        </li>
        <li>
          <ChartCritical
            color="bg-[#191D88]"
            label="Request for software installation"
          />
        </li>
        <li>
          <ChartCritical color="bg-black" label="Get a guest wifi account" />
        </li>
      </ul>
    </section>
  );
};

export default LineChartServiecRequest;
