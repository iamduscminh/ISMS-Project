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
        const response = await axiosInstance.get("api/Changes/getall");
        //Ticket By Status
        var open = 0,
          planning = 0,
          awaitingApproval = 0,
          pendingRelease = 0,
          pendingReview = 0,
          closed = 0;
        response.data.forEach((ticket) => {
          if (ticket.status.toUpperCase() === "Open".toUpperCase()) {
            open++;
          }
          if (ticket.status.toUpperCase() == "Planning".toUpperCase()) {
            planning++;
          }
          if (ticket.status.toUpperCase() == "AwaitingApproval".toUpperCase()) {
            awaitingApproval++;
          }
          if (ticket.status.toUpperCase() == "PendingRelease".toUpperCase()) {
            pendingRelease++;
          }
          if (ticket.status.toUpperCase() == "PendingReview".toUpperCase()) {
            pendingReview++;
          }
          if (ticket.status.toUpperCase() == "Closed".toUpperCase()) {
            closed++;
          }
        });
        setTicketByStatus([
          open,
          planning,
          awaitingApproval,
          pendingRelease,
          pendingReview,
          closed,
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
        //Ticket By Priority
        var standard = 0,
          minor = 0,
          major = 0,
          emergency = 0;
        response.data.forEach((ticket) => {
          if (ticket.changeType.toUpperCase() === "Standard".toUpperCase()) {
            standard++;
          }
          if (ticket.changeType.toUpperCase() == "Minor".toUpperCase()) {
            minor++;
          }
          if (ticket.changeType.toUpperCase() == "Major".toUpperCase()) {
            major++;
          }
          if (ticket.changeType.toUpperCase() == "Emergency".toUpperCase()) {
            emergency++;
          }
        });
        setTicketByType([standard, minor, major, emergency]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error get all Request Tickets [PieChartChange]:", error);
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
              width={420}
              height={700}
              series={[1, 1, 1, 1]}
              options={{
                labels: ["Standard", "Minor", "Major", "Emergency"],
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
              width={450}
              height={700}
              series={ticketByStatus}
              options={{
                labels: [
                  "Open",
                  "Planning",
                  "AwaitingApproval",
                  "PendingRelease",
                  "PendingReview",
                  "Closed",
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
