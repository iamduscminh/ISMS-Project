import React from "react";
import styles from "./styles.module.scss";

const TableStatistic = () => {
  return (
    <div className="py-2 px-3 max-h-[400px] overflow-y-auto rounded bg-white border border-black flex-1">
      <table className={styles.table}>
        <tr>
          <th>Ticket ID</th>
          <th>Description</th>
          <th>Type</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Create Date</th>
          <th>SLA</th>
        </tr>
        {Array(20)
          .fill(1)
          ?.map((item, index) => (
            <tr key={index}>
              <td>ITSTEST-1</td>
              <td>Demo</td>
              <td>Request</td>
              <td>Open</td>
              <td>Low</td>
              <td>2023/Jun/1 14:00:00</td>
              <td>2023/Jun/4 14:00:00</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default TableStatistic;
