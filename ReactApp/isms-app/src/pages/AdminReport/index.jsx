import React, { useState } from "react";
import FilterDateRange from "../../components/Filter/DateRange";
import { dateRangesOptions } from "../../components/Filter/InitState";
import ColumnChart from "../../components/Overview/ColumnChart";
import LineChartNewTicket from "../../components/Overview/LineChartNewTicket";
import LineChartSatisfaction from "../../components/Overview/LineChartSatisfaction";
import LineChartResponseTime from "../../components/Overview/LineChartResponseTime";
import LineChartSolvedAndClose from "../../components/Overview/LineChartSolvedAndClose";
import BtnGenerateReport from "../../components/Dashboard/BtnGenerateReport";

const AdminReport = () => {
  const [dateRanges, setDateRanges] = useState(dateRangesOptions?.[2]);
  const [openDialog, setOpenDialog] = useState(false);

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
        <BtnGenerateReport open={openDialog} setOpen={setOpenDialog} />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="py-[45px] px-10 space-y-8 xl:space-y-[75px]">
          <ColumnChart
            data={
              dateRanges?.value === "-30d"
                ? [200, 50, 24, 13, 65, 100, 120]
                : [170, 120, 52, 130, 125, 90, 20]
            }
          />
          <LineChartNewTicket
            data={Array(30)
              .fill(1)
              .map((_, index) => ({
                x: `Aug ${index + 1}`,
                y: Math.random() * 500 + 10,
              }))}
          />
          <LineChartSatisfaction
            data={{
              great: Array(30)
                .fill(1)
                .map((_, index) => ({
                  x: `Aug ${index + 1}`,
                  y: Math.random() * 300,
                })),
              okay: Array(30)
                .fill(1)
                .map((_, index) => ({
                  x: `Aug ${index + 1}`,
                  y: Math.random() * 200,
                })),
              bad: Array(30)
                .fill(1)
                .map((_, index) => ({
                  x: `Aug ${index + 1}`,
                  y: Math.random() * 50,
                })),
            }}
          />
          <LineChartResponseTime
            data={{
              responseTime: Array(30)
                .fill(1)
                .map((_, index) => ({
                  x: `Aug ${index + 1}`,
                  y: Math.random() * 300 + 50,
                })),
              assignTime: Array(30)
                .fill(1)
                .map((_, index) => ({
                  x: `Aug ${index + 1}`,
                  y: Math.random() * 50 + 20,
                })),
            }}
          />
          <LineChartSolvedAndClose
            data={{
              solved: Array(30)
                .fill(1)
                .map((_, index) => ({
                  x: `Aug ${index + 1}`,
                  y: Math.random() * 400 + 50,
                })),
              closed: Array(30)
                .fill(1)
                .map((_, index) => ({
                  x: `Aug ${index + 1}`,
                  y: Math.random() * 300 + 20,
                })),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AdminReport;
