import React, { useState, useEffect } from "react";
import FilterDropdownSelect from "../../components/Filter/DropdownSelect";
import {
  changePriorities,
  changeStatus,
  changeTypes,
} from "../../components/Filter/InitState";
import CardStatistic from "../../components/Overview/CardStatistic";
import TableChangeStatistic from "../../components/Overview/TableChangeStatistic";
import PieChart from "../../components/Overview/PieChartChange";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminChange = () => {
  const axiosInstance = useAxiosPrivate();
  const [ticketChangesSelected, setChangeTypesSelected] = useState(changeTypes);
  const [ticketPrioritiesSelected, setChangePrioritiesSelected] =
    useState(changePriorities);
  const [ticketStatusSelected, setChangeStatusSelected] =
    useState(changeStatus);
  const [createTicket, setCreateTicket] = useState(0);

  const dataByTypes = [
    { label: "Standard" },
    { label: "Minor" },
    { label: "Major" },
    { label: "Emergency" },
  ];
  const dataByPriorities = [
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
    { label: "Urgency" },
  ];
  const dataByStatus = [
    { label: "Open" },
    { label: "Planning" },
    { label: "AwaitingApproval" },
    { label: "PendingRelease" },
    { label: "PendingReview" },
    { label: "Closed" },
  ];

  useEffect(() => {
    const getAllAdminChange = async () => {
      try {
        const response = await axiosInstance.get(
          "/api/Dashboards/countRequestTicket"
        );
        setCreateTicket(response.data.change);
      } catch (error) {
        console.error("Error get all Tickets [AdminChange]:", error);
      }
    };

    getAllAdminChange();
  }, [axiosInstance]);

  return (
    <>
      <div className="bg-[#42526E] py-4 px-8 xl:pl-[58px] xl:pr-[70px] xl:py-9 grid md:grid-cols-3 gap-y-5 gap-x-8 xl:gap-x-[92px]">
        <FilterDropdownSelect
          selectedValues={ticketChangesSelected}
          setSelectedValues={setChangeTypesSelected}
          options={changeTypes}
          placeholder="Select type"
          title="Change Type"
        />
        <FilterDropdownSelect
          selectedValues={ticketPrioritiesSelected}
          setSelectedValues={setChangePrioritiesSelected}
          options={changePriorities}
          placeholder="Select priority"
          title="Change Priority"
        />
        <FilterDropdownSelect
          selectedValues={ticketStatusSelected}
          setSelectedValues={setChangeStatusSelected}
          options={changeStatus}
          placeholder="Select status"
          title="Change Status"
        />
      </div>
      <div className="flex-1 md:overflow-y-auto">
        <div className="py-[45px] px-10 space-y-6 xl:space-y-10 gap-6 xl:gap-y-[60px] xl:gap-x-[68px]">
          <div className="flex flex-col gap-6 xl:flex-row xl:gap-x-[60px]">
            <CardStatistic
              title="Changes"
              value={createTicket}
              className="w-full xl:w-[340px]"
            />
            <TableChangeStatistic />
          </div>
          <div className="grid gap-6 xl:grid-cols-3 xl:gap-x-[30px]">
            <PieChart
              index={0}
              title="Changes by Type"
              data={dataByTypes}
              dataType={dataByTypes}
            />
            <PieChart
              index={1}
              title="Changes by Priority"
              data={dataByPriorities}
              dataType={dataByPriorities}
            />
            <PieChart
              index={2}
              title="Changes by Status"
              data={dataByStatus}
              dataType={dataByStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChange;
