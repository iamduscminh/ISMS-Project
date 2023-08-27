import React, { useState, useEffect } from "react";
import BtnGenerateReport from "../../components/Dashboard/BtnGenerateReport";
import FilterDateRange from "../../components/Filter/DateRange";
import {
  RANGE_VALUES,
  dateRangesOptions,
} from "../../components/Filter/InitState";
import LineChartServiceRequest from "../../components/Overview/LineChartServiceRequest";
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
const AdminServiceRequestReport = () => {
  const axiosInstance = useAxiosPrivate();
  const [dateRanges, setDateRanges] = useState(dateRangesOptions?.[0]);
  const [openDialog, setOpenDialog] = useState(false);
  const [created, setCreated] = useState([]);
  const [resolved, setResolved] = useState([]);
  const [install, setInstall] = useState([]);
  const [wifi, setWifi] = useState([]);
  const [arrayResolve, setArrayResolve] = useState([]);
  const [arrayCreate, setArrayCreate] = useState([]);

  const temp = (days, newHardwares, vpns, installations, wifis) => ({
    newHardware: Array(days)
      .fill(1)
      .map((_, index) => ({
        x: `${formatDate(getPreviousDay(today, -days, index + 1))}`,
        y: newHardwares[index],
      })),
    vpn: Array(days)
      .fill(1)
      .map((_, index) => ({
        x: `${formatDate(getPreviousDay(today, -days, index + 1))}`,
        y: vpns[index],
      })),
    installation: Array(days)
      .fill(1)
      .map((_, index) => ({
        x: `${formatDate(getPreviousDay(today, -days, index + 1))}`,
        y: installations[index],
      })),
    wifi: Array(days)
      .fill(1)
      .map((_, index) => ({
        x: `${formatDate(getPreviousDay(today, -days, index + 1))}`,
        y: wifis[index],
      })),
  });
  const data = {
    [RANGE_VALUES.LAST_WEEK]: temp(
      dateRanges.number,
      arrayCreate,
      arrayResolve,
      install,
      wifi
    ),
    [RANGE_VALUES.PAST_14_DAYS]: temp(
      dateRanges.number,
      arrayCreate,
      arrayResolve,
      install,
      wifi
    ),
    [RANGE_VALUES.LAST_MONTH]: temp(
      dateRanges.number,
      arrayCreate,
      arrayResolve,
      install,
      wifi
    ),
  };
  useEffect(() => {
    var arrayVPN = new Array(dateRanges.number).fill(0);
    var arrayNewHardware = new Array(dateRanges.number).fill(0);
    var arrayInstall = new Array(dateRanges.number).fill(0);
    var arrayWifi = new Array(dateRanges.number).fill(0);
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
        console.error(
          "Error getAllTickets [AdminServiceRequestReport]:",
          error
        );
      }
    };
    const query = {
      fromDate: getPreviousDay(today, -dateRanges.number + 1, 0),
      toDate: today,
      needDividedByServiceItem: true,
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
      const serviceNames = [
        "Request new hardware",
        "Set up VPN to the office",
        "Request for software installation",
        "Get a guest wifi account",
      ];

      response.data
        .filter((item) => serviceNames.includes(item.serviceItemName))
        .map((item) => {
          for (let i = 0; i < dateRanges.number; i++) {
            if (
              formatDate(item.date) === formatDate(getPreviousDay(today, -i, 0))
            ) {
              if (item.serviceItemName === "Request new hardware")
                arrayNewHardware[dateRanges.number - i - 1] = item.totalCreated;
              if (item.serviceItemName === "Set up VPN to the office")
                arrayVPN[dateRanges.number - i - 1] = item.totalCreated;
              if (item.serviceItemName === "Request for software installation")
                arrayWifi[dateRanges.number - i - 1] = item.totalCreated;
              if (item.serviceItemName === "Get a guest wifi account")
                arrayInstall[dateRanges.number - i - 1] = item.totalCreated;
            }
          }
          setArrayCreate(arrayNewHardware);
          setArrayResolve(arrayVPN);
          setInstall(arrayWifi);
          setWifi(arrayInstall);
        });
    };

    getTicketsPerDay();
    getAllTickets();
  }, [axiosInstance, dateRanges]);

  const tableData = data?.[dateRanges?.value];

  const excelData = tableData?.newHardware?.map((item) => {
    const totalVPN = tableData?.vpn?.find((i) => i?.x === item?.x)?.y;
    const totalInstallation = tableData?.installation?.find(
      (i) => i?.x === item?.x
    )?.y;
    const totalWifi = tableData?.wifi?.find((i) => i?.x === item?.x)?.y;

    return {
      Date: item?.x,
      "Request New Hardware": item?.y,
      "Set up VPN to the office": totalVPN,
      "Request for software installation": totalInstallation,
      "Get a guest wifi account": totalWifi,
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
        />
        <BtnGenerateReport
          open={openDialog}
          setOpen={setOpenDialog}
          data={excelData}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="py-[45px] px-10 space-y-8 xl:space-y-[75px]">
          <div className="flex gap-4 xl:gap-9 flex-wrap">
            <CardStatistic
              title="Request new hardware"
              value={38}
              className="xl:!h-auto"
            />
            <CardStatistic
              title="Set up VPN"
              value={21}
              className="xl:!h-auto"
            />
            <CardStatistic
              title="Request for software installation"
              value={8}
              className="xl:!h-auto"
            />
            <CardStatistic
              title="Wifi account"
              value={10}
              className="xl:!h-auto"
            />
          </div>
          <LineChartServiceRequest data={tableData} />

          <table className={clsx(styles.table, "w-full text-left")}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Request new hardware</th>
                <th>Set up VPN to the office</th>
                <th>Request for software installation</th>
                <th>Get a guest wifi account</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.newHardware?.map((item, index) => (
                <tr key={index}>
                  <td>{item?.x}</td>
                  <td>{item?.y}</td>
                  <td>{tableData?.vpn?.find((i) => i?.x === item?.x)?.y}</td>
                  <td>
                    {tableData?.installation?.find((i) => i?.x === item?.x)?.y}
                  </td>
                  <td>{tableData?.wifi?.find((i) => i?.x === item?.x)?.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminServiceRequestReport;
