import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PieChart = ({ data, title, index }) => {
  const axiosInstance = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  const [ticketByPriority, setTicketByPriority] = useState([1, 1, 1, 1]);
  const [ticketByStatus, setTicketByStatus] = useState([1, 1, 1, 1, 1, 1]);
  const [ticketByType, setTicketByType] = useState([1, 1, 1]);

  useEffect(() => {
    const getProblemTicketByStatus = async () => {
      try {
        const response = await axiosInstance.get(
          "api/Dashboards/countRequestTicketByProblemStatus"
        );
        //Ticket By Status
        setTicketByStatus([
          response.data.requestTicket.Open,
          response.data.requestTicket.InProgress,
          response.data.requestTicket.Pending,
          response.data.requestTicket.Resolved,
          response.data.requestTicket.Closed,
          response.data.requestTicket.Canceled,
        ]);
      } catch (error) {
        console.error("Error getProblemByStatus [PieChartProblem]:", error);
        setIsLoading(false);
      }
    };
    const getProblemTicketByPriority = async () => {
      try {
        const response = await axiosInstance.get(
          "api/Dashboards/countRequestTicketByProblemPriority"
        );
        //Ticket By Status
        setTicketByPriority([
          response.data.requestTicket.Low,
          response.data.requestTicket.Medium,
          response.data.requestTicket.High,
          response.data.requestTicket.Urgency,
        ]);
      } catch (error) {
        console.error(
          "Error getProblemTicketByPriority [PieChartProblem]:",
          error
        );
        setIsLoading(false);
      }
    };
    const getProblemTicketByImpact = async () => {
      try {
        const response = await axiosInstance.get(
          "api/Dashboards/countRequestTicketByProblemImpact"
        );
        //Ticket By Impact
        setTicketByType([
          response.data.requestTicket.Low,
          response.data.requestTicket.Medium,
          response.data.requestTicket.High,
        ]);
      } catch (error) {
        console.error(
          "Error getProblemTicketByPriority [PieChartProblem]:",
          error
        );
        setIsLoading(false);
      }
    };
    getProblemTicketByPriority();
    getProblemTicketByStatus();
    getProblemTicketByImpact();
  }, [axiosInstance]);

  return (
    <div className="border border-black shadow-xl">
      <div className="flex justify-between border-b-2 border-black items-center px-4 py-2 bg-[#E7E7E7]">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold">{title}</span>
        </div>
        <img src="/images/icon-menu.svg" alt="" />
      </div>
      <div className="p-5 space-y-5 bg-white">
        <div className="grid grid-cols-2 w-[230px] mx-auto"></div>
        <div className="flex justify-center">
          {index === 0 && (
            <Chart
              type="pie"
              width={400}
              height={700}
              series={ticketByType}
              options={{
                labels: ["Low", "Medium", "High"],
                colors: ["#2C834E", "#FA8418", "#C70039"],
              }}
            ></Chart>
          )}
          {index === 1 && (
            <Chart
              type="pie"
              width={400}
              height={700}
              series={ticketByPriority}
              options={{
                labels: ["Low", "Medium", "High", "Urgenry"],
                colors: ["#2C834E", "#FA8418", "#C70039", "#48B8F6"],
              }}
            ></Chart>
          )}
          {index === 2 && (
            <Chart
              type="pie"
              width={415}
              height={700}
              series={ticketByStatus}
              options={{
                labels: [
                  "Open",
                  "InProgress",
                  "Pending",
                  "Resolved",
                  "Closed",
                  "Canceled",
                ],
                colors: [
                  "#2C834E",
                  "#4477CE",
                  "#FA8418",
                  "#C70039",
                  "#48B8F6",
                  "#F61E1E",
                ],
              }}
            ></Chart>
          )}
        </div>
      </div>
    </div>
  );
};

export default PieChart;
