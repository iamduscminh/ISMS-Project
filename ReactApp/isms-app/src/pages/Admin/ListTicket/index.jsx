import React, { useEffect, useState } from "react";
import styles from "./ListTicket.module.scss";
import classNames from "classnames/bind";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { BsSearch } from "react-icons/bs";
import { FaRegClone, FaEdit } from "react-icons/fa";
import { MdFavorite, MdDeleteForever } from "react-icons/md";
import Tippy from "@tippyjs/react/headless";
import SearchResultItem from "../../../components/Elements/SearchResultItem";
import Search from "./Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import image from "../../../assets/images";

const cx = classNames.bind(styles);

const ListTicket = () => {
  const [selectedRow, setSelectedRow] = React.useState();
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const [ticketData, setTicketData] = useState([
    {
      id: 1,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
    {
      id: 2,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
    {
      id: 3,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
    {
      id: 4,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
    {
      id: 5,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
    {
      id: 6,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
    {
      id: 7,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
    {
      id: 8,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
    {
      id: 9,
      description: "Demo test Service Ticket",
      service: "Hardware",
      reporter: "Tu Doan",
      assignee: "Calyrex",
      status: "WIP",
      createdDate: "2023/07/04 14:00:00",
      sla: "2023/07/04 14:00:00",
    },
  ]);

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
      field: "sla",
      headerName: "SLA",
      width: 155,
      valueFormatter: (params) =>
        format(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    },
  ];
  const headerHeight = "2rem";

  const handleComment = () => {
    console.log(selectedRow);
  };

  const handleAssign = () => {
    console.log(selectedRow);
  };

  const handleDelete = () => {
    console.log(selectedRow);
  };

  const handleLinkIssues = () => {
    console.log(selectedRow);
  };

  const getColorClassName = (params) => {
    const id = params.row.id;
    if (id == 5 || id == 3) {
      return cx("rowRed"); // Lớp CSS tô màu đỏ
    }
    if (id == 1 || id == 7) {
      return cx("rowYellow"); // Lớp CSS tô màu vàng
    }
    return ""; // Không có lớp CSS tô màu
  };

  return (
    <div>
      <div className="relative w-full h-[22vh] bg-[#42526E] pt-[1.5rem] pl-[4.5rem]">
        <h3 className="text-[0.9rem] text-[#fff] font-medium mb-[0.5rem]">
          ServiceTicket/allTicket
        </h3>
        <h2 className="text-[1.2rem] text-[#fff] font-medium">
          Query All Service Ticket
        </h2>
      </div>
      <div>
        <div className="w-[92%] pl-[4.5rem] relative translate-y-[-56px] z-10">
          <div className={cx("action-wrapper")}>
            <FaRegClone className={cx("action-icon")} />
            <MdDeleteForever className={cx("action-icon")} />
            <FaEdit className={cx("action-icon")} />
            <MdFavorite className={cx("action-icon")} />
          </div>

          <Search />

          <div className="w-[100%] ">
            <DataGrid
              sx={{
                backgroundColor: "#FFFFFF",
              }}
              rows={ticketData}
              columns={columns}
              componentsProps={{
                row: {
                  onContextMenu: handleContextMenu,
                  style: { cursor: "context-menu" },
                },
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 8,
                  },
                },
              }}
              getRowClassName={getColorClassName}
              rowHeight={48}
              pageSizeOptions={[8]}
              checkboxSelection
              disableRowSelectionOnClick
            />
            <Menu
              open={contextMenu !== null}
              onClose={handleClose}
              anchorReference="anchorPosition"
              anchorPosition={
                contextMenu !== null
                  ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                  : undefined
              }
              componentsProps={{
                root: {
                  onContextMenu: (e) => {
                    e.preventDefault();
                    handleClose();
                  },
                },
              }}
            >
              <MenuItem onClick={handleComment}>Comments</MenuItem>
              <MenuItem onClick={handleAssign}>Assign</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              <MenuItem onClick={handleLinkIssues}>Link Issues</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTicket;
