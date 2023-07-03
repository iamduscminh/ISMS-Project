import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "age", headerName: "Age", type: "number", width: 100 },
];

const rows = [
  { id: 1, firstName: "John", lastName: "Doe", age: 25 },
  { id: 2, firstName: "Jane", lastName: "Smith", age: 32 },
  { id: 3, firstName: "Bob", lastName: "Johnson", age: 45 },
];

const MyDataGrid = () => {
  const handleRowClick = (params) => {
    const { id } = params.row;

    console.log(id);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default MyDataGrid;
