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
import React, { useEffect, useMemo, useState } from "react";
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

const LineChartCreatedAndResolved = ({ data }) => {
  const labels = [];
  const dataConfig = {
    labels,
    datasets: [
      {
        label: "Created",
        data: data.created,
        borderColor: "#2C834E",
        backgroundColor: "#2C834E",
        borderWidth: 2,
      },
      {
        label: "Resolved",
        data: data.resolved,
        borderColor: "#000",
        backgroundColor: "#000",
        borderWidth: 2,
      },
    ],
  }
 

  if(!dataConfig) return null

  return (
    <section>
      <div className="w-full">
        <Line options={options} data={dataConfig} className="h-[300px]" />
      </div>
      <ul className="flex flex-wrap justify-center gap-x-[60px]">
        <li>
          <ChartCritical color="bg-[#2C834E]" label="Created" />
        </li>
        <li>
          <ChartCritical color="bg-black" label="Resolve" />
        </li>
      </ul>
    </section>
  );
};

export default LineChartCreatedAndResolved;
