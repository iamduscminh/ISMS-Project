import React, { useState, useEffect } from "react";
import ChartLayout from "./ChartLayout";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  redraw: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
  },
};

function getDayOfWeek(date, number) {
  const day = date.getDay();
  if (day + number >= 0) {
    return day + number;
  }
  return day - number - 7;
}
const today = new Date();
const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const labels = [
  `${dayOfWeek[getDayOfWeek(today, -6)]}`,
  `${dayOfWeek[getDayOfWeek(today, -5)]}`,
  `${dayOfWeek[getDayOfWeek(today, -4)]}`,
  `${dayOfWeek[getDayOfWeek(today, -3)]}`,
  `${dayOfWeek[getDayOfWeek(today, -2)]}`,
  `${dayOfWeek[getDayOfWeek(today, -1)]}`,
  `${dayOfWeek[getDayOfWeek(today, 0)]}`,
];

const ColumnChart = ({ total, data }) => {
  const dataConfig = {
    labels,
    datasets: [
      {
        label: "New Tickets",
        data: data,
        backgroundColor: "#2C834E",
      },
    ],
  };
  const axiosInstance = useAxiosPrivate();
  const [totalOpens, setTotalOpens] = useState();
  const [totalClose, setTotalClosed] = useState();
  const [totalTickets, setTotalTickets] = useState();

  useEffect(() => {}, [axiosInstance]);
  return (
    <ChartLayout
      title="Last 7 days"
      subTitle={
        <div>
          <div>Tickets</div>
          <div className="flex space-x-0.5">
            <span>{total}</span>
            <div className="flex items-center text-10px text-[#2C834E]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path
                  d="M11.2329 9.76604L8.20337 4.51885C7.81665 3.84854 7.18384 3.84854 6.79712 4.51885L3.76759 9.76604C3.38087 10.4363 3.69728 10.9838 4.47071 10.9838H10.5298C11.3032 10.9838 11.6196 10.4354 11.2329 9.76604Z"
                  fill="#2C834E"
                />
              </svg>
              <span>163</span>
            </div>
            <span className="text-xs"> from previous 7 days</span>
          </div>
        </div>
      }
    >
      <div className="w-full">
        <Bar options={options} data={dataConfig} />
      </div>
      <ul className="flex flex-wrap justify-center gap-x-[60px]">
        <li className="text-center flex flex-col">
          <span className="text-sm">Open tickets</span>
          <span className="font-bold">22</span>
        </li>
        <li className="text-center flex flex-col">
          <span className="text-sm">Closed tickets</span>
          <span className="font-bold">1053</span>
        </li>
        <li className="text-center flex flex-col">
          <span className="text-sm">Avg. response time</span>
          <span className="font-bold">8h26m</span>
        </li>
      </ul>
    </ChartLayout>
  );
};

export default ColumnChart;
