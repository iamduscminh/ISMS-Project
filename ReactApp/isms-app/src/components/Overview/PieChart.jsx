import clsx from "clsx";
import ChartCritical from "./ChartCritical";
import Chart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  ticketPriorities,
  ticketStatus,
  ticketTypes,
} from "../../components/Filter/InitState";
function sum(obj) {
  return Object.keys(obj).reduce(
    (sum, key) => sum + parseFloat(obj[key] || 0),
    0
  );
}
const Label = ({ index, label }) => {
  let color = "bg-[#2C834E]";
  if (index === 1) color = "bg-[#FA8418]";
  if (index === 2) color = "bg-[#F8DE22]";
  if (index === 3) color = "bg-[#272829]";
  if (index === 4) color = "bg-[#48B8F6]";
  if (index === 5) color = "bg-[#F61E1E]";
  return <ChartCritical color={color} label={label} />;
};

const PieChart = ({ data, title, index }) => {
  const axiosInstance = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  const [ticketByPriority, setTicketByPriority] = useState([]);
  const [ticketByStatus, setTicketByStatus] = useState([]);
  const [ticketByType, setTicketByType] = useState([]);

  useEffect(() => {
    const getProblemAndChangeTickets = async () => {
      try {
        const response = await axiosInstance.get(
          "api/Dashboards/countRequestTicket"
        );
        const problemTickets = response.data.problem;
        const changeTickets = response.data.change;
        const incidentTickets = response.data.incident;
        const serviceRequests = sum(response.data.serviceRequests);

        setTicketByType([
          incidentTickets,
          serviceRequests,
          changeTickets,
          problemTickets,
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error getProblemAndChangeTickets [Dashboard]:", error);
        setIsLoading(false);
      }
    };
    const getRequestTicketByStatus = async () => {
      try {
        const response = await axiosInstance.get(
          "api/Dashboards/countRequestTicketByStatus"
        );
        //Ticket By Status
        setTicketByStatus([
          response.data.requestTicket.Open,
          response.data.requestTicket.Pending,
          response.data.requestTicket.InProgress,
          response.data.requestTicket.Closed,
          response.data.requestTicket.Canceled,
          response.data.requestTicket.Resolved,
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getRequestTicketByStatus [PieChart]:", error);
        setIsLoading(false);
      }
    };
    const getRequestTicketByPriority = async () => {
      try {
        const response = await axiosInstance.get(
          "api/Dashboards/countRequestTicketByPriority"
        );
        //Ticket By Priority
        setTicketByPriority([
          response.data.requestTicket.Low,
          response.data.requestTicket.Medium,
          response.data.requestTicket.High,
          response.data.requestTicket.Urgency,
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error getRequestTicketByPriority [PieChart]:", error);
        setIsLoading(false);
      }
    };
    getRequestTicketByPriority();
    getProblemAndChangeTickets();
    getRequestTicketByStatus();
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
                labels: ["Incident", "Request", "Change", "Problem"],
                colors: ["#2C834E", "#FA8418", "#C70039", "#4477CE"],
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
                  "Pending",
                  "In Progress",
                  "Closed",
                  "Cancel",
                  "Resolve",
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
