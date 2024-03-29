import React, { useEffect, useState } from "react";
import styles from "./ListTicket.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { BsSearch } from "react-icons/bs";
import { FaRegClone, FaEdit } from "react-icons/fa";
import { MdFavorite, MdDeleteForever } from "react-icons/md";
import Tippy from "@tippyjs/react/headless";
import Swal from "sweetalert2";
import SearchResultItem from "../../../components/Elements/SearchResultItem";
import Search from "./Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import image from "../../../assets/images";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { URL } from "../../../utils/Url";
const cx = classNames.bind(styles);

const ListTicket = () => {
  const navigate = useNavigate();
  const { typeTicket, queryId } = useParams();
  const [selectedRow, setSelectedRow] = React.useState();
  const [contextMenu, setContextMenu] = React.useState(null);
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();
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

  const [ticketData, setTicketData] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 150, editable: false },
    {
      field: "title",
      headerName: "Title",
      width: 250,
      editable: true,
      description: "This column described overview of ticket",
    },
    {
      field: "service",
      headerName: "Service",
      width: 180,
      editable: true,
    },
    {
      field: "requestType",
      headerName: "RequestType",
      width: 250,
      editable: true,
    },

    {
      field: "reporter",
      headerName: "Reporter",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden">
            {params.row.requesterAvatar && (
              <img
                className="w-full h-full object-cover object-center"
                src={params.row.requesterAvatar}
                alt=""
              />
            )}
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
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden">
            {params.row.assigneeAvatar && (
              <img
                className="w-full h-full object-cover object-center"
                src={params.row.assigneeAvatar}
                alt=""
              />
            )}
          </div>
          <div className="ml-[0.5rem]">
            <span>{params.value}</span>
          </div>
        </div>
      ),
    },
    {
      field: "group",
      headerName: "Group",
      width: 100,
      editable: true,
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
      width: 200,
      valueFormatter: (params) =>
        format(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 100,
      editable: true,
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
  ///Ticket GET DATA
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const token = auth?.accessToken;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    withCredentials: true,
  };
  useEffect(() => {
    const QueryStatement = JSON.stringify({ service: [queryId] });
    const apiQueryTicketUrl = `${URL.REQUEST_TICKET_URL}/querytickets`;
    const queryDto = {
      QueryId: queryId,
      QueryType: typeTicket ?? "all",
      QueryStatement: typeTicket == "service" ? QueryStatement : "",
    };
    console.log(queryDto);
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get request tickets
        axiosInstance
          .post(apiQueryTicketUrl, queryDto, { headers })
          .then((response) => {
            console.log(response.data);
            const data = response.data.map((item, i) => ({
              id: item.ticketId,
              title: item.title,
              service: item?.serviceCategoryName ?? "None",
              requestType: item.isIncident
                ? "Issue Abnormal"
                : item?.serviceItemName ?? "None",
              group: item.groupName,
              requesterAvatar: item.requesterAvatar,
              assigneeAvatar: item.assigneeAvatar,
              reporter: item.requesterFullName,
              assignee: item.assigneeFullName,
              status: item.status,
              createdDate: new Date(item.createdAt).toLocaleString(
                "en-US",
                options
              ),
              priority: item.priority,
            }));
            setTicketData(data);
            //console.log(response.data);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
              showCancelButton: true,
              cancelButtonText: "Cancel",
            });
          });
        Swal.close();
      } catch (error) {
        // Handle errors if needed
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    };
    fetchData();
  }, [typeTicket, queryId]);
  const handleRowClick = (params) => {
    console.log(typeTicket);
    const { id } = params.row;
    if (typeTicket == "change") navigate("/admin/change/" + id);
    else if (typeTicket == "problem") navigate("/admin/problem/" + id);
    else navigate("/admin/ticket/" + id);
  };

  const handleDeleteQuery = () => {
    console.log("delete");
  };
  const handleEditQuery = () => {
    navigate(`/admin/query/all/update/QUER000001`);
  };
  return (
    <div>
      <div className="relative w-full h-[22vh] bg-[#42526E] pt-[1.5rem] pl-[4.5rem]">
        <h3 className="text-[1rem] text-[#fff] font-medium mb-[0.5rem]">
          ServiceTicket/ allTicket
        </h3>
        <h2 className="text-[1.2rem] text-[#fff] font-medium">
          Query All Service Ticket
        </h2>
      </div>
      <div>
        <div className="w-[98%] pl-[4.5rem] relative translate-y-[-56px] z-10">
          {queryId && typeTicket != "service" && (
            <div className={cx("action-wrapper")}>
              <MdDeleteForever
                onClick={handleDeleteQuery}
                className={cx("action-icon")}
              />
              <FaEdit onClick={handleEditQuery} className={cx("action-icon")} />
            </div>
          )}
          <Search data={ticketData} />

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
                    pageSize: 20,
                  },
                },
              }}
              getRowClassName={getColorClassName}
              rowHeight={48}
              pageSizeOptions={[20]}
              disableRowSelectionOnClick
              onRowClick={handleRowClick}
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
