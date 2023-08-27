import React, { useState, useEffect } from "react";
import BtnGenerateReport from "../../components/Dashboard/BtnGenerateReport";
import FilterDateRange from "../../components/Filter/DateRange";
import {
  RANGE_VALUES,
  dateRangesOptions,
} from "../../components/Filter/InitState";
import LineChartCreatedAndResolved from "../../components/Overview/LineChartCreatedAndResolved";
import CardStatistic from "../../components/Overview/CardStatistic";
import clsx from "clsx";
import styles from "./styles.module.scss";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function getPreviousDay(date, number, index) {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() + number + index);

  return previous;
}
function formatDate(date) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  const [month, day, year] = formattedDate.split(" ");

  const capitalizedMonth = month.toUpperCase();

  return `${day} ${capitalizedMonth} ${year}`;
}

const today = new Date();
const AdminStatistics = () => {
  const axiosInstance = useAxiosPrivate();
  const [dateRanges, setDateRanges] = useState(dateRangesOptions?.[0]);
  const [dataTickets, setDataTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [created, setCreated] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [arrayResolve, setArrayResolve] = useState([]);
  const [arrayCreate, setArrayCreate] = useState([]);
  const [dataToExport, setDataToExport] = useState([]);

  const temp = (days, creates, resolves) => ({
    created: Array(days)
      .fill(1)
      .map((_, index) => ({
        x: `${formatDate(getPreviousDay(today, -days, index + 1))}`,
        y: creates[index],
      })),
    resolved: Array(days)
      .fill(1)
      .map((_, index) => ({
        x: `${formatDate(getPreviousDay(today, -days, index + 1))}`,
        y: resolves[index],
      })),
  });
  const data = {
    [RANGE_VALUES.LAST_WEEK]: temp(
      dateRanges.number,
      arrayCreate,
      arrayResolve
    ),
    [RANGE_VALUES.PAST_14_DAYS]: temp(
      dateRanges.number,
      arrayCreate,
      arrayResolve
    ),
    [RANGE_VALUES.LAST_MONTH]: temp(
      dateRanges.number,
      arrayCreate,
      arrayResolve
    ),
  };
  useEffect(() => {
    var arrayResolved = new Array(dateRanges.number).fill(0);
    var arrayCreated = new Array(dateRanges.number).fill(0);

    const getAllTickets = async () => {
      try {
        const response = await axiosInstance.get(
          "api/Dashboards/countRequestTicketByStatus"
        );
        setCreated(
          response.data.requestTicket.Open +
            response.data.requestTicket.InProgress +
            response.data.requestTicket.Pending +
            response.data.requestTicket.Resolved +
            response.data.requestTicket.Closed +
            response.data.requestTicket.Canceled
        );
        setResolved(response.data.requestTicket.Resolved);
      } catch (error) {
        console.error("Error getAllTickets [AdminStatistics]:", error);
      }
    };
    const query = {
      fromDate: getPreviousDay(today, -dateRanges.number + 1, 0),
      toDate: today,
      needDividedByServiceItem: false,
    };
    const controller = new AbortController();

    const getTicketsPerDay = async () => {
      const response = await axiosInstance.post(
        "api/Dashboards/countbyday",
        JSON.stringify(query),
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDataTickets(response.data);
      if (response.data.length <= 0) {
        setArrayResolve(arrayResolved);
        setArrayCreate(arrayCreated);
      }
      response.data.map((item) => {
        for (let i = 0; i < dateRanges.number; i++) {
          if (
            formatDate(item.date) === formatDate(getPreviousDay(today, -i, 0))
          ) {
            arrayCreated[dateRanges.number - i - 1] = item.totalCreated;
            arrayResolved[dateRanges.number - i - 1] = item.totalResolved;
          }
        }
        setArrayResolve(arrayResolved);
        setArrayCreate(arrayCreated);
      });
    };

    getTicketsPerDay();
    getAllTickets();
  }, [axiosInstance, dateRanges]);

  const tableData = data?.[dateRanges?.value];

  const excelData = tableData?.created?.map((item) => {
    const totalResolved = tableData?.resolved?.find((i) => i?.x === item?.x)?.y;

    return {
      Date: item?.x,
      Created: item?.y,
      Resolved: totalResolved,
    };
  });
  return (
    <>
      <div className="bg-[#42526E] py-4 px-8 xl:pl-[58px] xl:pr-[70px] xl:py-9 flex flex-col md:flex-row items-start gap-4 md:items-center justify-between">
        <FilterDateRange
          selected={dateRanges}
          setSelected={setDateRanges}
          options={dateRangesOptions}
          placeholder="Select range"
          title="Date range"
          className="w-full md:w-[280px]"
          //onChange={hanldeGetData}
          // setArrayResolve={handleSetArrayResolve}
          // setArrayCreate={handleSetArrayCreate}
        />
        <BtnGenerateReport
          open={openDialog}
          setOpen={setOpenDialog}
          // data={tableData}
          data={excelData}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="py-[45px] px-10 space-y-8 xl:space-y-[75px]">
          <div className="flex gap-4 xl:gap-9 flex-wrap">
            <CardStatistic
              title="Created"
              value={created}
              className="xl:!h-auto"
            />
            <CardStatistic
              title="Resolved"
              value={resolved}
              className="xl:!h-auto"
            />
          </div>
          <LineChartCreatedAndResolved data={tableData} />

          <table className={clsx(styles.table, "w-full text-left")}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Created</th>
                <th>Resolved</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.created?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.x}</td>
                  <td>{item?.y}</td>
                  <td>
                    {tableData?.resolved?.find((i) => i?.x === item?.x)?.y}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminStatistics;
