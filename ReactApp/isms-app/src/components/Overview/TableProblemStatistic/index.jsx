import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function formatDate(date) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  const [month, day, year] = formattedDate.split(" ");

  const capitalizedMonth = month.toUpperCase();

  return `${day} ${capitalizedMonth} ${year}`;
}

const TableStatistic = () => {
  const axiosInstance = useAxiosPrivate();
  const [createTicket, setCreateTicket] = useState([]);

  useEffect(() => {
    const fetchServiceCategories = async () => {
      try {
        const response = await axiosInstance.get("api/Problems/getall");
        setCreateTicket(response.data);
        console.log(createTicket);
      } catch (error) {
        console.error("Error get all Tickets [TableProblemStatistic]:", error);
      }
    };

    fetchServiceCategories();
  }, [axiosInstance]);

  return (
    <div className="py-2 px-3 max-h-[400px] overflow-y-auto rounded bg-white border border-black flex-1">
      <table className={styles.table}>
        <tr>
          <th>ProblemID</th>
          <th>Description</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Impact</th>
          <th>Due Time</th>
        </tr>
        {createTicket.map((ticket, index) => {
          return (
            <tr key={index}>
              <td>{ticket.problemId}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.impact}</td>
              <td>{formatDate(ticket.dueTime)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableStatistic;
