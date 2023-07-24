import React from "react";
import {
  ticketPriorities,
  ticketStatus,
  ticketTypes,
} from "../../components/Filter/InitState";
import FilterDropdownSelect from "../../components/Filter/DropdownSelect";
import { useState } from "react";
import CardStatistic from "../../components/Overview/CardStatistic";

const Dashboard = () => {
  const [ticketTypesSelected, setTicketTypesSelected] = useState(ticketTypes);
  const [ticketPrioritiesSelected, setTicketPrioritiesSelected] =
    useState(ticketPriorities);
  const [ticketStatusSelected, setTicketStatusSelected] =
    useState(ticketStatus);

  const ticketTypesSelectedNormalized = ticketTypesSelected?.map(
    (item) => item?.value
  );
  const ticketPrioritiesSelectedNormalized = ticketPrioritiesSelected?.map(
    (item) => item?.value
  );
  const ticketStatusSelectedNormalized = ticketStatusSelected?.map(
    (item) => item?.value
  );

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
        <div className="py-[45px] px-10 grid sm:grid-cols-3 gap-6 xl:gap-[60px]">
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[0]?.value
          ) && <CardStatistic title="Created Ticket" value={1253} />}
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[1]?.value
          ) && <CardStatistic title="Pending Ticket" value={1253} />}
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[2]?.value
          ) && <CardStatistic title="Solve Ticket" value={1253} />}
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[3]?.value
          ) && <CardStatistic title="CLOSED TICKET" value={1598} />}

          <CardStatistic title="USERS" value={100} />
          {ticketTypesSelectedNormalized?.includes(ticketTypes?.[0]?.value) && (
            <CardStatistic title="INCIDENT" value={1014} />
          )}
          {ticketTypesSelectedNormalized?.includes(ticketTypes?.[1]?.value) && (
            <CardStatistic title="REQUEST" value={1291} />
          )}
          {ticketPrioritiesSelectedNormalized?.includes(
            ticketPriorities?.[0]?.value
          ) && <CardStatistic title="LOW PRIORITY TICKET" value={708} />}
          {ticketPrioritiesSelectedNormalized?.includes(
            ticketPriorities?.[1]?.value
          ) && <CardStatistic title="MEDIUM PRIORITY TICKET" value={708} />}
          {ticketPrioritiesSelectedNormalized?.includes(
            ticketPriorities?.[2]?.value
          ) && <CardStatistic title="HIGH PRIORITY TICKETS" value={901} />}
          <CardStatistic title="RESOLUTION DURATION DAYS" value={124.84} />
          <CardStatistic title="OPEN TICKET DURATION DAYS" value={124.84} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
