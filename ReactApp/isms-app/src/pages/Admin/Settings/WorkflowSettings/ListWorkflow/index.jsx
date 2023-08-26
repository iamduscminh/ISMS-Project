import React, { useState, useRef, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ModalDialog from "../../../../../components/Elements/PopupModal";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { URL } from "../../../../../utils/Url";
import useAuth from "../../../../../hooks/useAuth";

const ListWorkflow = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const { auth } = useAuth();

  const workflowNameRef = useRef();
  const descriptionRef = useRef();

  const [RequireMessage, setRequireMessage] = useState(false);
  const [listWorkflow, setListWorkflow] = useState([]);

  useEffect(() => {
    const fetchWorkflow = async () => {
      try {
        const response = await axiosInstance.get(`${URL.WORKFLOW_URL}/getall`);
        setListWorkflow(response.data);
      } catch (err) {
        console.log(err);
        if (err.status === 403) {
          navigate('/unauthorized');
        } else {
          alert("System error, sorry, please contact administrator: " + err);
        }
      }
    };
    fetchWorkflow();
  }, [axiosInstance]);

  const handleEditWorkflow = (flowId) => {
    navigate(`/admin/setting/workflows/${flowId}`);
  };

  const handleDeleteWorkflow = (flowId) => {
    const deleteWorkflow = async () => {
      try {
        const response = await axiosInstance.delete(
          `${URL.WORKFLOW_URL}/delete?workflowId=${flowId}`
        );
        const updateListWorkflow = listWorkflow.filter(i=>i.workflowId !== flowId);
        setListWorkflow(updateListWorkflow);
      } catch (err) {
        alert("System error, sorry, please contact administrator: ", err);
      }
    };
    deleteWorkflow();
  };

  const columns = [
    {
      field: "workflowId",
      headerName: "ID",
      width: 150,
      editable: false,
      cellClassName: "text-[#42526E]",
    },
    {
      field: "workflowName",
      headerName: "Workflow",
      width: 250,
      editable: true,
      cellClassName: "font-semibold text-[#42526E]",
    },
    {
      field: "description",
      headerName: "Description",
      width: 450,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Last Update",
      width: 155,
      valueFormatter: (params) =>
        format(new Date(params.value), "yyyy/MM/dd HH:mm:ss"),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div
          key={params.workflowId}
          className="flex text-[1.25rem] text-[#42526E] font-medium"
        >
          <CiEdit
            className="cursor-pointer mr-[0.5rem]"
            onClick={() => handleEditWorkflow(params.value)}
          />
          <ModalDialog
            title={"Create New Workflow"}
            actionText={"Create"}
            actionHandler={()=>handleDeleteWorkflow(params.value)}
            triggerComponent={<TiDelete className="cursor-pointer" />}
          >
            <div>Are you sure to delete this Workflow</div>
          </ModalDialog>
        </div>
      ),
    },
  ];

  const rows = listWorkflow;

  const rowsWithAction = rows.map((row) => ({
    ...row,
    action: row.workflowId, // Thêm thuộc tính "action" với giá trị bằng "id"
  }));

  const handleCreateNewWorkflow = () => {
    if (workflowNameRef.current.value === "") {
      setRequireMessage(true);
      return;
    }

    const createWorkflow = async () => {
      try {
        const response = await axiosInstance.post(
          `${URL.WORKFLOW_URL}/create`,
          JSON.stringify({
            WorkflowName: workflowNameRef.current.value,
            CreatedBy: auth.userId,
            Description: descriptionRef.current.value,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          navigate(
            `/admin/setting/workflows/${response.data.workflowDTO.workflowId}`
          );
        } else {
          throw response;
        }
      } catch (err) {
        // Optionally, show an error message to the user
        if (err.status === 403) {
          alert("You are not allowed to add Workflow Category");
        } else {
          alert(err.message);
        }
      }
    };

    createWorkflow();
  };
  return (
    <div className="w-full">
      <div className="w-full bg-[#42526E] pt-[1.5rem] pb-[1rem]">
        <div className="text-[#fff] ml-[2rem]">
          <span>QuickService / ServiceSettings / Workflow settings</span>
        </div>
        <div className="text-[#fff] text-[1.5rem] font-semibold ml-[2rem]">
          <span>Workflows</span>
        </div>
        <p className="text-[#fff] w-[60%] ml-[2rem]">
          A Quick Service workflow is a set of Activities that an Request ticket
          moves through during its lifecycle, and typically represents a Service
          process within your organization.
        </p>
      </div>
      <div className="w-full mt-[2rem]">
        <div className="flex justify-end mb-[2rem]">
          <ModalDialog
            title={"Create New Workflow"}
            actionText={"Create"}
            actionHandler={handleCreateNewWorkflow}
            triggerComponent={
              <button className="mr-[5rem] bg-[#043AC5] px-[1rem] py-[0.5rem] text-[#fff]">
                Add Workflow
              </button>
            }
          >
            <div className="flex flex-col">
              <label>
                Workflow Name{" "}
                {RequireMessage && (
                  <span className="text-[red]">(required)</span>
                )}
              </label>
              <input
                ref={workflowNameRef}
                type="text"
                className="w-[90%] border border-[#42526E] rounded-md px-[1rem] py-[0.5rem]"
              />
              <label>Description</label>
              <input
                ref={descriptionRef}
                type="text"
                className="w-[90%] border border-[#42526E] rounded-md px-[1rem] py-[0.5rem]"
              />
            </div>
          </ModalDialog>
        </div>
        <DataGrid
          className="w-[95%] m-auto mt-[2rem]"
          rows={rowsWithAction}
          columns={columns}
          getRowId={(row) => row.workflowId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          rowHeight={48}
          pageSizeOptions={[8]}
          hideFooterSelectedRowCount={true}
        />
      </div>
    </div>
  );
};

export default ListWorkflow;
