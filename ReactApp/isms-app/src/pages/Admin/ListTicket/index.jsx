import React, { useState } from 'react';
import styles from './ListTicket.module.scss';
import classNames from "classnames/bind";
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

const ListTicket = () => {
  const [ticketData, setTicketData] = useState([
    { id: 1, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
    { id: 2, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
    { id: 3, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
    { id: 4, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
    { id: 5, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
    { id: 6, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
    { id: 7, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
    { id: 8, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
    { id: 9, description: 'Demo test Service Ticket', service: 'Hardware', reporter: 'Tu Doan', assignee: 'Calyrex', status: 'WIP', createdDate: '2023/07/04 14:00:00', sla: '2023/07/04 14:00:00' },
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50, editable: false },
    {
      field: 'description',
      headerName: 'Description',
      width: 220,
      editable: true,
      description: 'This column described overview of ticket'
    },
    {
      field: 'service',
      headerName: 'Service',
      width: 120,
      editable: true,
    },
    {
      field: 'reporter',
      headerName: 'Reporter',
      width: 105,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: 'assignee',
      headerName: 'Assignee',
      width: 105,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: 'createdDate',
      headerName: 'Created Date',
      width: 160,
      valueFormatter: (params) => format(new Date(params.value), 'yyyy/MM/dd HH:mm:ss'),
    },
    {
      field: 'sla',
      headerName: 'SLA',
      width: 160,
      valueFormatter: (params) => format(new Date(params.value), 'yyyy/MM/dd HH:mm:ss'),
    },
  ];
  const headerHeight = "2rem";

  return (
    <div>
      <div className='relative w-full h-[20vh] bg-[#42526E] pt-[1.5rem] pl-[4rem]'>
        <h3 className='text-[1rem] text-[#fff] font-medium mb-[0.5rem]'>ServiceTicket/allTicket</h3>
        <h2 className='text-[1.4rem] text-[#fff] font-medium'>Query All Service Ticket</h2>
      </div>
      <div>
        <div className='w-[90%] pl-[4rem] relative translate-y-[-56px] z-10'>
          <div className='w-[100%] '>
            <DataGrid
              sx={{
                backgroundColor: '#FFFFFF'
              }}
              rows={ticketData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 9,
                  },
                },
              }}
              pageSizeOptions={[9]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListTicket