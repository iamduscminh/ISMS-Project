import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const PieChart = ({ data, title, index }) => {
  const axiosInstance = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  const [ticketByPriority, setTicketByPriority] = useState([]);
  const [ticketByStatus, setTicketByStatus] = useState([]);
  const [ticketByType, setTicketByType] = useState([]);

  useEffect(() => {
    const getChangeTickets = async () => {
      try {
        const response = await axiosInstance.get("api/Problems/getall");
        //Ticket By Status
        var open = 0,
          inProgress = 0,
          pending = 0,
          closed = 0,
          canceled = 0,
          resolve = 0;
        response.data.forEach((ticket) => {
          if (ticket.status.toUpperCase() === "Open".toUpperCase()) {
            open++;
          }
          if (ticket.status.toUpperCase() == "Pending".toUpperCase()) {
            pending++;
          }
          if (ticket.status.toUpperCase() == "InProgress".toUpperCase()) {
            inProgress++;
          }
          if (ticket.status.toUpperCase() == "Closed".toUpperCase()) {
            closed++;
          }
          if (ticket.status.toUpperCase() == "Canceled".toUpperCase()) {
            canceled++;
          }
          if (ticket.status.toUpperCase() == "Resolve".toUpperCase()) {
            resolve++;
          }
        });
        setTicketByStatus([
          open,
          pending,
          inProgress,
          closed,
          canceled,
          resolve,
        ]);
        //Ticket By Priority
        var low = 0,
          medium = 0,
          high = 0,
          urgenry = 0;
        response.data.forEach((ticket) => {
          if (ticket.priority.toUpperCase() === "Low".toUpperCase()) {
            low++;
          }
          if (ticket.priority.toUpperCase() == "Medium".toUpperCase()) {
            medium++;
          }
          if (ticket.priority.toUpperCase() == "High".toUpperCase()) {
            high++;
          }
          if (ticket.priority.toUpperCase() == "Urgenry".toUpperCase()) {
            urgenry++;
          }
        });
        setTicketByPriority([low, medium, high, urgenry]);
        //Ticket By impact
        var lowImpact = 0,
          mediumImpact = 0,
          highImpact = 0;
        response.data.forEach((ticket) => {
          if (ticket.impact.toUpperCase() === "Low".toUpperCase()) {
            lowImpact++;
          }
          if (ticket.impact.toUpperCase() == "Medium".toUpperCase()) {
            mediumImpact++;
          }
          if (ticket.impact.toUpperCase() == "High".toUpperCase()) {
            highImpact++;
          }
        });
        setTicketByType([lowImpact, mediumImpact, highImpact]);
        setIsLoading(false);
      } catch (error) {
        console.error(
          "Error get all Request Tickets [PieChartProblem]:",
          error
        );
        setIsLoading(false);
      }
    };
    getChangeTickets();
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
