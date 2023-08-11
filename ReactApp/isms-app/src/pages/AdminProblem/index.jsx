import React, { useState, useEffect } from "react";
import FilterDropdownSelect from "../../components/Filter/DropdownSelect";
import {
  changePriorities,
  changeStatus,
  problemImpact,
} from "../../components/Filter/InitState";
import CardStatistic from "../../components/Overview/CardStatistic";
import TableProblemStatistic from "../../components/Overview/TableProblemStatistic";
import PieChart from "../../components/Overview/PieChartProblem";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminProblem = () => {
  const axiosInstance = useAxiosPrivate();
  const [ticketChangesSelected, setChangeTypesSelected] =
    useState(problemImpact);
  const [ticketPrioritiesSelected, setChangePrioritiesSelected] =
    useState(changePriorities);
  const [ticketStatusSelected, setChangeStatusSelected] =
    useState(changeStatus);
  const [createTicket, setCreateTicket] = useState(0);

  const dataByImpacts = [
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
  ];
  const dataByPriorities = [
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
    { label: "Urgency" },
  ];
  const dataByStatus = [
    { label: "Open" },
    { label: "InProgress" },
    { label: "Pending" },
    { label: "Resolved" },
    { label: "Closed" },
    { label: "Canceled" },
  ];

  useEffect(() => {
    const getAllAdminProblem = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/Dashboards/countRequestTicket"
        );
        setCreateTicket(response.data.problem);
      } catch (error) {
        console.error("Error get all Tickets [AdminProblem]:", error);
      }
    };

    getAllAdminProblem();
  }, [axiosInstance]);

  return (
    <>
      <div className="bg-[#42526E] py-4 px-8 xl:pl-[58px] xl:pr-[70px] xl:py-9 grid md:grid-cols-3 gap-y-5 gap-x-8 xl:gap-x-[92px]">
        <FilterDropdownSelect
          selectedValues={ticketChangesSelected}
          setSelectedValues={setChangeTypesSelected}
          options={problemImpact}
          placeholder="Select type"
          title="Problem Impact"
        />
        <FilterDropdownSelect
          selectedValues={ticketPrioritiesSelected}
          setSelectedValues={setChangePrioritiesSelected}
          options={changePriorities}
          placeholder="Select priority"
          title="Problem Priority"
        />
        <FilterDropdownSelect
          selectedValues={ticketStatusSelected}
          setSelectedValues={setChangeStatusSelected}
          options={changeStatus}
          placeholder="Select status"
          title="Problem Status"
        />
      </div>
      <div className="flex-1 md:overflow-y-auto">
        <div className="py-[45px] px-10 space-y-6 xl:space-y-10 gap-6 xl:gap-y-[60px] xl:gap-x-[68px]">
          <div className="flex flex-col gap-6 xl:flex-row xl:gap-x-[60px]">
            <CardStatistic
              title="Problems"
              value={createTicket}
              className="w-full xl:w-[340px]"
            />
            <TableProblemStatistic />
          </div>
          <div className="grid gap-6 xl:grid-cols-3 xl:gap-x-[30px]">
            <PieChart index={0} title="Problems by Type" data={dataByImpacts} />
            <PieChart
              index={1}
              title="Problems by Priority"
              data={dataByPriorities}
            />
            <PieChart
              index={2}
              title="Problems by Status"
              data={dataByStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProblem;
