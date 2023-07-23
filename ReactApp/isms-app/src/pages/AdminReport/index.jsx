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
          <ColumnChart />
          <LineChartNewTicket />
          <LineChartSatisfaction />
          <LineChartResponseTime />
          <LineChartSolvedAndClose />
        </div>
      </div>
    </>
  );
};

export default AdminReport;
