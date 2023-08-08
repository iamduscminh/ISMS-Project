import React from "react";
import {
  ticketPriorities,
  ticketStatus,
  ticketTypes,
} from "../../components/Filter/InitState";
import FilterDropdownSelect from "../../components/Filter/DropdownSelect";
import { useState, useEffect } from "react";
import CardStatistic from "../../components/Overview/CardStatistic";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Dashboard = () => {
  const axiosInstance = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);

  const [ticketTypesSelected, setTicketTypesSelected] = useState(ticketTypes);
  const [ticketPrioritiesSelected, setTicketPrioritiesSelected] =
    useState(ticketPriorities);
  const [ticketStatusSelected, setTicketStatusSelected] =
    useState(ticketStatus);
  const [createTicket, setCreateTicket] = useState(0);
  const [changeTicket, setChangeTicket] = useState(0);
  const [problemTicket, setProblemTicket] = useState(0);
  const [ticketByPriority, setTicketByPriority] = useState([]);
  const [ticketByStatus, setTicketByStatus] = useState([]);
  const [ticketByType, setTicketByType] = useState([]);

  const ticketTypesSelectedNormalized = ticketTypesSelected?.map(
    (item) => item?.value
  );
  const ticketPrioritiesSelectedNormalized = ticketPrioritiesSelected?.map(
    (item) => item?.value
  );
  const ticketStatusSelectedNormalized = ticketStatusSelected?.map(
    (item) => item?.value
  );

  useEffect(() => {
    const getChangeTickets = async () => {
      try {
        const response = await axiosInstance.get(
          "api/ServiceCategories/getall"
        );
        setChangeTicket(response.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching service categories:", error);
        setIsLoading(false);
      }
    };
    const getProblemTickets = async () => {
      try {
        const response = await axiosInstance.get(
          "api/ServiceCategories/getall"
        );
        setProblemTicket(response.data.length);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching service categories:", error);
        setIsLoading(false);
      }
    };
    const getRequestTickets = async () => {
      try {
        const response = await axiosInstance.get("api/RequestTickets");
        //Created ticket
        setCreateTicket(response.data.length);
        //Ticket By Status
        var open = 0,
          inProgress = 0,
          pending = 0,
          closed = 0,
          canceled = 0,
          resolve = 0;
        response.data.forEach((ticket) => {
          if (ticket.status.toUpperCase() === "Open".toUpperCase()) {
            open++;
          }
          if (ticket.status.toUpperCase() == "Pending".toUpperCase()) {
            pending++;
          }
          if (ticket.status.toUpperCase() == "InProgress".toUpperCase()) {
            inProgress++;
          }
          if (ticket.status.toUpperCase() == "Closed".toUpperCase()) {
            closed++;
          }
          if (ticket.status.toUpperCase() == "Canceled".toUpperCase()) {
            canceled++;
          }
          if (ticket.status.toUpperCase() == "Resolve".toUpperCase()) {
            resolve++;
          }
        });
        setTicketByStatus([
          open,
          pending,
          inProgress,
          closed,
          canceled,
          resolve,
        ]);
        //Ticket By Priority
        var low = 0,
          medium = 0,
          high = 0;
        response.data.forEach((ticket) => {
          if (ticket.priority.toUpperCase() === "Low".toUpperCase()) {
            low++;
          }
          if (ticket.priority.toUpperCase() == "Medium".toUpperCase()) {
            medium++;
          }
          if (ticket.priority.toUpperCase() == "High".toUpperCase()) {
            high++;
          }
        });
        setTicketByPriority([low, medium, high]);
        //Ticket By Type
        var incident = 0,
          serviceRequest = 0;
        response.data.forEach((ticket) => {
          console.log(ticket.serviceItemId);
          if (ticket.isIncident === true) {
            incident++;
          } else serviceRequest++;
        });
        setTicketByType([
          incident,
          serviceRequest,
          changeTicket,
          problemTicket,
        ]);
        console.log(ticketByType);
        setIsLoading(false);
      } catch (error) {
        console.error("Error get all Request Tickets:", error);
        setIsLoading(false);
      }
    };

    getProblemTickets();
    getChangeTickets();
    getRequestTickets();
  }, [axiosInstance]);
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
          ) && <CardStatistic title="Open Ticket" value={ticketByStatus[0]} />}
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[1]?.value
          ) && (
            <CardStatistic title="Pending Ticket" value={ticketByStatus[1]} />
          )}
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[2]?.value
          ) && (
            <CardStatistic title="InProcess Ticket" value={ticketByStatus[2]} />
          )}
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[3]?.value
          ) && (
            <CardStatistic title="Closed Ticket" value={ticketByStatus[3]} />
          )}
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[4]?.value
          ) && (
            <CardStatistic title="Cancel Ticket" value={ticketByStatus[4]} />
          )}
          {ticketStatusSelectedNormalized?.includes(
            ticketStatus?.[5]?.value
          ) && (
            <CardStatistic title="Resolve Ticket" value={ticketByStatus[5]} />
          )}
          <CardStatistic title="USERS" value={100} />
          <CardStatistic title="Create Ticket" value={createTicket} />
          {ticketTypesSelectedNormalized?.includes(ticketTypes?.[0]?.value) && (
            <CardStatistic title="INCIDENT" value={ticketByType[0]} />
          )}
          {ticketTypesSelectedNormalized?.includes(ticketTypes?.[1]?.value) && (
            <CardStatistic title="Service Request" value={ticketByType[1]} />
          )}
          {ticketTypesSelectedNormalized?.includes(ticketTypes?.[2]?.value) && (
            <CardStatistic title="Change" value={changeTicket} />
          )}
          {ticketTypesSelectedNormalized?.includes(ticketTypes?.[3]?.value) && (
            <CardStatistic title="Problem" value={problemTicket} />
          )}
          {ticketPrioritiesSelectedNormalized?.includes(
            ticketPriorities?.[0]?.value
          ) && (
            <CardStatistic
              title="LOW PRIORITY TICKET"
              value={ticketByPriority[0]}
            />
          )}
          {ticketPrioritiesSelectedNormalized?.includes(
            ticketPriorities?.[1]?.value
          ) && (
            <CardStatistic
              title="MEDIUM PRIORITY TICKET"
              value={ticketByPriority[1]}
            />
          )}
          {ticketPrioritiesSelectedNormalized?.includes(
            ticketPriorities?.[2]?.value
          ) && (
            <CardStatistic
              title="HIGH PRIORITY TICKET"
              value={ticketByPriority[2]}
            />
          )}
          {ticketPrioritiesSelectedNormalized?.includes(
            ticketPriorities?.[2]?.value
          )}
          <CardStatistic title="RESOLUTION DURATION DAYS" value={124.84} />
          <CardStatistic title="OPEN TICKET DURATION DAYS" value={124.84} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
