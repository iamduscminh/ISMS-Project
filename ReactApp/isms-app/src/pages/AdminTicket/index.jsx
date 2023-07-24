import React, { useState } from "react";
import FilterDropdownSelect from "../../components/Filter/DropdownSelect";
import {
  ticketPriorities,
  ticketStatus,
  ticketTypes,
} from "../../components/Filter/InitState";
import CardStatistic from "../../components/Overview/CardStatistic";
import TableStatistic from "../../components/Overview/TableStatistic";
import PieChart from "../../components/Overview/PieChart";

const AdminTicket = () => {
  const [ticketTypesSelected, setTicketTypesSelected] = useState(ticketTypes);
  const [ticketPrioritiesSelected, setTicketPrioritiesSelected] =
    useState(ticketPriorities);
  const [ticketStatusSelected, setTicketStatusSelected] =
    useState(ticketStatus);

  const dataByTypes = [{ label: "Request" }, { label: "Incident" }];
  const dataByPriorities = [
    { label: "Low" },
    { label: "Medium" },
    { label: "High" },
  ];
  const dataByStatus = [
    { label: "Open" },
    { label: "Solve" },
    { label: "Pending" },
    { label: "Closed" },
  ];

  return (
    <>
      <div className="bg-[#42526E] py-4 px-8 xl:pl-[58px] xl:pr-[70px] xl:py-9 grid md:grid-cols-3 gap-y-5 gap-x-8 xl:gap-x-[92px]">
        <FilterDropdownSelect
          selectedValues={ticketTypesSelected}
          setSelectedValues={setTicketTypesSelected}
          options={ticketTypes}
          placeholder="Select type"
          title="Ticket Type"
        />
        <FilterDropdownSelect
          selectedValues={ticketPrioritiesSelected}
          setSelectedValues={setTicketPrioritiesSelected}
          options={ticketPriorities}
          placeholder="Select priority"
          title="Ticket Priority"
        />
        <FilterDropdownSelect
          selectedValues={ticketStatusSelected}
          setSelectedValues={setTicketStatusSelected}
          options={ticketStatus}
          placeholder="Select status"
          title="Ticket Status"
        />
      </div>
      <div className="flex-1 md:overflow-y-auto">
        <div className="py-[45px] px-10 space-y-6 xl:space-y-10 gap-6 xl:gap-y-[60px] xl:gap-x-[68px]">
          <div className="flex flex-col gap-6 xl:flex-row xl:gap-x-[60px]">
            <CardStatistic
              title="Ticket"
              value={1253}
              className="w-full xl:w-[340px]"
            />
            <TableStatistic />
          </div>
          <div className="grid gap-6 xl:grid-cols-3 xl:gap-x-[30px]">
            <PieChart index={0} title="Tickets by Type" data={dataByTypes} />
            <PieChart
              index={1}
              title="Tickets by Priority"
              data={dataByPriorities}
            />
            <PieChart index={2} title="Tickets by Status" data={dataByStatus} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTicket;
