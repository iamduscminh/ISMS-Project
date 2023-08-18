import React, { useState, useEffect } from "react";
import FilterDateRange from "../../components/Filter/DateRange";
import { dateRangesOptions } from "../../components/Filter/InitState";
import ColumnChart from "../../components/Overview/ColumnChart";
import LineChartNewTicket from "../../components/Overview/LineChartNewTicket";
import LineChartSatisfaction from "../../components/Overview/LineChartSatisfaction";
import LineChartResponseTime from "../../components/Overview/LineChartResponseTime";
import LineChartSolvedAndClose from "../../components/Overview/LineChartSolvedAndClose";
import BtnGenerateReport from "../../components/Dashboard/BtnGenerateReport";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import template from "./ReportTemplate.txt";
function sum(obj) {
  return Object.keys(obj).reduce(
    (sum, key) => sum + parseFloat(obj[key] || 0),
    0
  );
}
const today = new Date();
let document = new Document();
const AdminReport = () => {
  const [dateRanges, setDateRanges] = useState(dateRangesOptions);
  const [openDialog, setOpenDialog] = useState(false);
  const [totalTickets, setTotalTickets] = useState();
  const [allTickets, setAllTickets] = useState([]);
  const [allChanges, setAllChanges] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const parser = new DOMParser();
  const axiosInstance = useAxiosPrivate();

  function handleSetData(item) {
    setAllTickets(item);
  }
  const generatePdf = async (e) => {
    var doc = new jsPDF("p", "mm", "a4");
    window["html2canvas"] = html2canvas;
    await doc.html(document.querySelector("#template"), {
      callback: function (pdf) {
        pdf.save("Report.pdf");
      },
      html2canvas: {
        async: true,
        scale: 0.35,
        logging: true,
        allowTaint: true,
        useCORS: true,
      },
    });
  };
  useEffect(() => {
    const getAllTickets = () => {
      fetch("https://localhost:7134/api/RequestTickets")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setAllTickets(data);
        });
    };
    const getAllChanges = () => {
      fetch("https://localhost:7134/api/Changes/getall")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setAllChanges(data);
        });
    };
    const getAllProblems = () => {
      axiosInstance
        .get("https://localhost:7134/api/Problems/getall")
        .then((data) => {
          setAllProblems(data);
        });
    };
    const getTemplateReport = async () => {
      await fetch(template)
        .then((row) => row.text())
        .then((text) => {
          let stringReplace = text
            .replace("[NumberOfTickets]", `${1530}`)
            .replace("[AvgReponseTime]", `1h17min`)
            .replace("[DelayTickets]", `6`)
            .replace("[OpenTickets]", `${159}`)
            .replace("[ReponseTime]", `1h20min`)
            .replace("[IncreaseTickets]", `${58}`)
            .replace("[HanldeTickets]", `${1046}`)
            .replace("[SolvedTickets]", `${392}`)
            .replace("[AssignTime]", `25.6min`);
          document = parser.parseFromString(stringReplace, "text/html");
        });
    };

    getTemplateReport();
    getAllTickets();
    getAllChanges();
    getAllProblems();
    // getTickets();
  }, [axiosInstance]);
  const handleGenerateReport = (e) => {
    generatePdf();
  };
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
        <button
          className="text-sm xl:text-lg w-[150px] py-2 bg-[#4AA976] text-white focus:outline-none border-0 font-semibold p-2"
          onClick={() => handleGenerateReport()}
        >
          Generate Report
        </button>
        <BtnGenerateReport
          dataTicket={allTickets}
          dataChange={allChanges}
          dataProblem={allProblems}
          open={openDialog}
          setOpen={setOpenDialog}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="py-[45px] px-10 space-y-8 xl:space-y-[75px]">
          <ColumnChart
            total={totalTickets}
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
