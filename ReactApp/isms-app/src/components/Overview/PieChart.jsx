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

  const [ticketTypesSelected, setTicketTypesSelected] = useState(ticketTypes);
  const [ticketPrioritiesSelected, setTicketPrioritiesSelected] =
    useState(ticketPriorities);
  const [ticketStatusSelected, setTicketStatusSelected] =
    useState(ticketStatus);
  const [changeTicket, setChangeTicket] = useState(0);
  const [problemTicket, setProblemTicket] = useState(0);
  const [ticketByPriority, setTicketByPriority] = useState([]);
  const [ticketByStatus, setTicketByStatus] = useState([]);
  const [ticketByType, setTicketByType] = useState([]);

  useEffect(() => {
    const getChangeTickets = async () => {
      try {
        const response = await axiosInstance.get(
          "api/ServiceCategories/getall"
        );
        setChangeTicket(response.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching service categories:", error);
        setIsLoading(false);
      }
    };
    const getProblemTickets = async () => {
      try {
        const response = await axiosInstance.get(
          "api/ServiceCategories/getall"
        );
        setProblemTicket(response.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching service categories:", error);
        setIsLoading(false);
      }
    };
    const getRequestTickets = async () => {
      try {
        const response = await axiosInstance.get("api/RequestTickets");
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
          high = 0;
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
        });
        setTicketByPriority([low, medium, high]);
        //Ticket By Type
        var incident = 0,
          serviceRequest = 0;
        response.data.forEach((ticket) => {
          if (ticket.isIncident === true) {
            incident++;
          } else serviceRequest++;
        });
        setTicketByType([
          incident,
          serviceRequest,
          changeTicket,
          problemTicket,
        ]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error get all Request Tickets [PieChart]:", error);
        setIsLoading(false);
      }
    };

    getProblemTickets();
    getChangeTickets();
    getRequestTickets();
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
                labels: ["Low", "Medium", "High"],
                colors: ["#2C834E", "#FA8418", "#C70039"],
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
