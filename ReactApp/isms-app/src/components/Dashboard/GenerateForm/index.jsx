import React, { useId, useState } from "react";
import { dateRangesOptions } from "../../Filter/InitState";
import BtnForm from "./BtnForm";
import DateRangeField from "./DateRangeField";
import ExportField from "./ExportField";
import { columnsOptions, exportOptions, exportTableOptions } from "./InitState";
import Message from "./Message";
import SelectColumnsField from "./SelectColumnsField";
import AdminReportPreview from "../../../pages/AdminReportPreview";
const GenerateForm = ({ dataTicket, dataChange, dataProblem, setOpen }) => {
  const id = useId();
  const [reportName, setReportName] = useState("Ticket Reports");
  const [exportToSelected, setExportToSelected] = useState(exportOptions?.[0]);
  const [tableSelected, setTableSelected] = useState(exportTableOptions?.[0]);
  const [columns, setColumns] = useState(columnsOptions);
  const [dateRanges, setDateRanges] = useState(dateRangesOptions?.[2]);
  let handleOnClickExport = () => {
    if (tableSelected.value === "request") {
      AdminReportPreview.exportExcel(
        dataTicket,
        "List Request Ticket",
        reportName,
        exportToSelected.value
      );
    }
    if (tableSelected.value === "change") {
      AdminReportPreview.exportExcel(
        dataChange,
        "List Change Ticket",
        reportName,
        exportToSelected.value
      );
    } else {
      AdminReportPreview.exportExcel(
        dataProblem,
        "List Problem Ticket",
        reportName,
        exportToSelected.value
      );
    }
  };
  return (
    <form
      style={{ boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.20)" }}
      className="flex flex-col flex-1 overflow-y-auto"
    >
      <div className="flex-none text-lg xl:text-2xl font-bold text-center py-4 xl:py-7 bg-[#D9D9D9]">
        Export Data
      </div>
      <div className=" flex-1 overflow-y-auto text-sm border border-black py-6 xl:py-10 px-[26px] bg-white">
        <div className="font-bold">Export and send report</div>
        <div className="max-w-[650px] mx-auto mt-6 xl:mt-10 space-y-5">
          <div className="flex flex-col">
            <label htmlFor={`file-name-${id}`}>File name</label>
            <input
              id={`file-name-${id}`}
              placeholder="Input file name..."
              type="text"
              onChange={(e) => {
                setReportName(e.target.value);
              }}
              defaultValue="Ticket reports"
              className="py-2 px-5 border border-black focus:outline-none mt-1"
            />
            <Message />
          </div>

          <div className="flex flex-col">
            <label htmlFor={`file-extension-${id}`}> Export As</label>
            {/* <input
              id={`file-extension-${id}`}
              placeholder="Input file name..."
              type="email"
              className="py-2 px-5 border border-black focus:outline-none mt-1"
            /> */}
            <ExportField
              selected={exportToSelected}
              setSelected={setExportToSelected}
              onChange={(e) => {
                setExportToSelected(e.target.value);
              }}
              options={exportOptions}
              placeholder="Select file extension"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`file-extension-${id}`}> Select Tables</label>
            <ExportField
              selected={tableSelected}
              setSelected={setTableSelected}
              onChange={(e) => {
                setTableSelected(e.target.value);
              }}
              options={exportTableOptions}
              placeholder="Select file extension"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`display-columns-${id}`}>Select Columns</label>
            {/* <input
              id={`display-columns-${id}`}
              placeholder="Input file name..."
              type="email"
              className="py-2 px-5 border border-black focus:outline-none mt-1"
            /> */}
            <SelectColumnsField
              selectedValues={columns}
              setSelectedValues={setColumns}
              onChange={(e) => {
                setColumns(e.target.value);
              }}
              options={columnsOptions}
              placeholder="Select display columns"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor={`date-range-${id}`}>Date range</label>
            {/* <input
              id={`email-to-${id}`}
              placeholder="Input file name..."
              type="email"
              className="py-2 px-5 border border-black focus:outline-none mt-1"
            /> */}
            <DateRangeField
              selected={dateRanges}
              setSelected={setDateRanges}
              options={dateRangesOptions}
              placeholder="Select range"
            />
          </div>

          {/* <div className="flex flex-col">
            <label htmlFor={`email-to-${id}`}>Send report to</label>
            <input
              id={`email-to-${id}`}
              placeholder="Input file name..."
              type="email"
              className="py-2 px-5 border border-black focus:outline-none mt-1"
            />
          </div> */}

          <div className="flex justify-center gap-x-[85px]">
            <BtnForm
              title="Export"
              className="bg-[#1B7D4E] text-white"
              type="submit"
              onClick={(e) => {
                handleOnClickExport();
                e.preventDefault();
                setOpen(false);
              }}
            />
            <BtnForm
              title="Cancel"
              className="text-black"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default GenerateForm;
