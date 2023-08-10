import React, { useState } from "react";
import image from "../../../assets/images";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
const AdminTicketGrid = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 50, editable: false },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      editable: true,
      description: "This column described overview of ticket",
    },
    {
      field: "service",
      headerName: "Service",
      width: 120,
      editable: true,
    },
    {
      field: "requestType",
      headerName: "RequestType",
      width: 160,
      editable: true,
    },
    {
      field: "group",
      headerName: "Group",
      width: 100,
      editable: true,
    },
    {
      field: "reporter",
      headerName: "Reporter",
      width: 105,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={image.avatar3}
              alt=""
            />
          </div>
          <div className="ml-[0.5rem]">
            <span>{params.value}</span>
          </div>
        </div>
      ),
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 105,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={image.avatar2}
              alt=""
            />
          </div>
          <div className="ml-[0.5rem]">
            <span>{params.value}</span>
          </div>
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 155,
      valueFormatter: (params) =>
        format(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 60,
      editable: true,
    },
  ];
  const [ticketData, setTicketData] = useState([
    {
      id: 1,
      description: "Demo test Service Ticket",
      service: "Hardware",
      requestType: "Request new hardware",
      group:'Group 1',
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      priority:'High'
    },
    {
      id: 2,
      description: "Demo test Service Ticket",
      service: "Hardware",
      requestType: "Request new hardware",
      group:'Group 1',
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      priority:'High'
    },
    {
      id: 3,
      description: "Demo test Service Ticket",
      service: "Hardware",
      requestType: "Request new hardware",
      group:'Group 1',
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      priority:'High'
    },
    {
      id: 4,
      description: "Demo test Service Ticket",
      service: "Hardware",
      requestType: "Request new hardware",
      group:'Group 1',
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      priority:'High'
    },
    {
      id: 5,
      description: "Demo test Service Ticket",
      service: "Hardware",
      requestType: "Request new hardware",
      group:'Group 1',
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      priority:'High'
    },
  ]);
  return (
    <div className="w-[97%] h-[50vh]">
      <DataGrid
        sx={{
          backgroundColor: "#FFFFFF",
        }}
        rows={ticketData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        rowHeight={40}
        pageSizeOptions={[8]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default AdminTicketGrid;
