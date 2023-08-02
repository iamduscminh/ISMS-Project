import React, {useState, useRef} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ModalDialog from "../../../../../components/Elements/PopupModal";

const ListWorkflow = () => {
  const navigate = useNavigate();

  const workflowNameRef = useRef();
  const descriptionRef = useRef();

  const [RequireMessage, setRequireMessage] = useState(false)
  
  const handleEditWorkflow = (flowId) => {
    navigate(`/admin/setting/workflows/edit/${flowId}`);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      editable: false,
      cellClassName: "text-[#42526E]",
    },
    {
      field: "workflow",
      headerName: "Workflow",
      width: 300,
      editable: true,
      cellClassName: "font-semibold text-[#42526E]",
    },
    {
      field: "description",
      headerName: "Description",
      width: 480,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: true,
    },
    {
      field: "lastUpdate",
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
          key={params.id}
          className="flex text-[1.25rem] text-[#42526E] font-medium"
        >
          <AiFillEye className="cursor-pointer mr-[0.5rem]" />
          <CiEdit
            className="cursor-pointer mr-[0.5rem]"
            onClick={() => handleEditWorkflow(params.value)}
          />
          <TiDelete className="cursor-pointer" />
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: "WF0001",
      workflow: "Quick Service Demo Workflow",
      description: "This is demo workflow for showing in QuickService",
      status: "Active",
      lastUpdate: "2023/07/25",
    },
    {
      id: "WF0002",
      workflow: "Quick Service Demo Workflow",
      description: "This is demo workflow for showing in QuickService",
      status: "Inactive",
      lastUpdate: "2023/07/25",
    },
  ];

  const rowsWithAction = rows.map((row) => ({
    ...row,
    action: row.id, // Thêm thuộc tính "action" với giá trị bằng "id"
  }));

  const handleCreateNewWorkflow = () =>{
    if(workflowNameRef.current.value===""){
      setRequireMessage(true);
      return;
    }
    console.log(workflowNameRef.current.value);
    console.log(descriptionRef.current.value);
    
    navigate("/admin/setting/workflows/create");
  }
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
              <button
                className="mr-[5rem] bg-[#043AC5] px-[1rem] py-[0.5rem] text-[#fff]"
              >
                Add Workflow
              </button>
            }
          >
            <div className="flex flex-col">
              <label>Workflow Name {RequireMessage && <span className="text-[red]">(required)</span>}</label>
              <input ref={workflowNameRef} type="text" className="w-[90%] border border-[#42526E] rounded-md px-[1rem] py-[0.5rem]"/>
              <label>Description</label>
              <input ref={descriptionRef} type="text" className="w-[90%] border border-[#42526E] rounded-md px-[1rem] py-[0.5rem]"/>
            </div>
          </ModalDialog>
        </div>
        <DataGrid
          className="w-[95%] m-auto mt-[2rem]"
          rows={rowsWithAction}
          columns={columns}
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
