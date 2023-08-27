import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../utils/Url";
import useAuth from "../../../../hooks/useAuth";
const LinkTicketForm = ({ currentIncident }) => {
  const axiosInstance = useAxiosPrivate();

  const [listIncidents, setListIncident] = useState();
  const [listIncidentsForProblem, setListIncidentForProblem] = useState();
  const [listUsers, setListUsers] = useState();
  const [listSLA, setListSLA] = useState();
  const [ticketData, setTicketData] = useState({
    Title: "",
    Description: "",
  });
  const [choice, setChoice] = useState();

  const { auth } = useAuth();
  const navigate = useNavigate();

  console.log(ticketData);
  const handleCreateTicket = () => {
    console.log(choice);
    if (choice === "Change") {
      const createTicket = async () => {
        if (ticketData.Title === "" || ticketData.Description === "") {
          alert("Title and description is require");
          return;
        }
        try {
          const response = await axiosInstance.post(
            `${URL.CHANGE_URL}/create`,
            {
              ...ticketData,
              ReasonForChange: "",
              RequesterId: auth.userId,
            }
          );
          console.log(response.data);
          navigate(`/admin/change/${response.data.changeId}`);
        } catch (err) {
          if (err.response.status === 400) {
            err.response.data.message
              ? alert(err.response.data.message)
              : alert("There is an error in the data sent");
          } else {
            alert("System error, sorry, please contact administrator: ", err);
          }
        }
      };
      createTicket();
    } else {
      const createTicket = async () => {
        if (ticketData.Title === "" || ticketData.Description === "") {
          alert("Title and description is require");
          return;
        }
        try {
          const response = await axiosInstance.post(
            `${URL.PROBLEM_URL}/create`,
            {
              ...ticketData,
              RootCause: "",
              RequesterId: auth.userId,
            }
          );
        } catch (err) {
          if (err.response.status === 400) {
            err.response.data.message
              ? alert(err.response.data.message)
              : alert("There is an error in the data sent");
          } else {
            alert("System error, sorry, please contact administrator: ", err);
          }
        }
      };
      createTicket();
    }
  };

  const handleSelectChoice = (choice) => {
    setChoice(choice);
  };

  const handleChangeTitle = (e) => {
    setTicketData((prev) => ({
      ...prev,
      Title: e.target.value.trim(),
    }));
  };

  const handleChangeDescription = (e) => {
    setTicketData((prev) => ({
      ...prev,
      Description: e.target.value.trim(),
    }));
  };

  const handleChangeIncidents = (e) => {
    const newArray = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    const array = [currentIncident, ...newArray];
    setTicketData((prev) => ({
      ...prev,
      RequestTicketIds: array,
    }));
  };

  const handleChangeAssignee = (e) => {
    setTicketData((prev) => ({
      ...prev,
      AssigneeId: e.target.value,
    }));
  };

  const handleChangeSLA = (e) => {
    setTicketData((prev) => ({
      ...prev,
      Slaid: e.target.value,
    }));
  };

  useEffect(() => {
    const getListIncidents = async () => {
      try {
        const response = await Promise.all([
          axiosInstance.get(`${URL.REQUEST_TICKET_URL}/changes`),
          axiosInstance.get(`${URL.USER_URL}/getall`),
          axiosInstance.get(`${URL.SLA_URL}/getall`),
          axiosInstance.get(`${URL.REQUEST_TICKET_URL}/problems`),
        ]);
        console.log(response[0].data);
        setListIncident(response[0].data);
        setListUsers(response[1].data);
        setListSLA(response[2].data);
        setListIncidentForProblem(response[3].data);
        setTicketData({
          RequestTicketIds: [currentIncident],
          AssigneeId: response[1].data[0].userId,
          Slaid: response[2].data[0].slaid,
          Title: "",
          Description: "",
        });
      } catch (err) {
        if (err.response.status === 400) {
          alert(err.response.data.message);
        } else {
          alert("System error, sorry, please contact administrator: ", err);
        }
      }
    };
    getListIncidents();
  }, [useAxiosPrivate]);

  return (
    <div>
      <div className="mb-4">
        <label for="selectChoice" class="block text-gray-700 font-bold mb-2">
          Select Choice
        </label>
        <select
          id="selectChoice"
          name="selectChoice"
          className="w-full px-4 py-2 border rounded-md"
          onChange={(e) => handleSelectChoice(e.target.value)}
        >
          <option value="Problem">Problem</option>
          <option value="Change">Change</option>
        </select>
      </div>
      <div className="mb-4">
        <label for="title" class="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChangeTitle}
        />
      </div>
      <div className="mb-4">
        <label for="description" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChangeDescription}
        ></textarea>
      </div>
      <div className="mb-4">
        <label for="incidents" className="block text-gray-700 font-bold mb-2">
          Incidents
        </label>
        <select
          id="incidents"
          name="incidents"
          className="w-full px-4 py-2 border rounded-md"
          multiple
          onChange={handleChangeIncidents}
        >
          {choice === "Change"
            ? listIncidents?.map((item, index) =>
                item.requestTicketId === currentIncident ? (
                  <option
                    selected
                    disabled
                    key={index}
                    value={item.requestTicketId}
                  >
                    {item.requestTicketId} - {item.title}
                  </option>
                ) : (
                  <option key={index} value={item.requestTicketId}>
                    {item.requestTicketId} - {item.title}
                  </option>
                )
              )
            : listIncidentsForProblem?.map((item, index) =>
                item.requestTicketId === currentIncident ? (
                  <option
                    selected
                    disabled
                    key={index}
                    value={item.requestTicketId}
                  >
                    {item.requestTicketId} - {item.title}
                  </option>
                ) : (
                  <option key={index} value={item.requestTicketId}>
                    {item.requestTicketId} - {item.title}
                  </option>
                )
              )}
        </select>
      </div>
      <div className="mb-4">
        <label for="assignee" className="block text-gray-700 font-bold mb-2">
          Assignee
        </label>
        <select
          id="assignee"
          name="assignee"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChangeAssignee}
        >
          {listUsers?.map((item, index) => (
            <option key={index} value={item.userId}>
              {item.fullName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label for="sla" className="block text-gray-700 font-bold mb-2">
          SLA
        </label>
        <select
          id="sla"
          name="sla"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChangeSLA}
        >
          {listSLA?.map((item, index) => (
            <option key={index} value={item.slaid}>
              {item.slaname}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex justify-end ">
        <button
          onClick={handleCreateTicket}
          className="ml-auto px-[0.75rem] py-[0.45rem] bg-[#043ac5] text-[#fff] font-medium"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default LinkTicketForm;
