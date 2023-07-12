import React from 'react'
import classNames from "classnames/bind";
import styles from './TicketStatus.module.scss';

const cx = classNames.bind(styles);
const TicketStatus = () => {
  return (
    <div className='w-[full] flex items-center justify-center'>
      <div className='w-[60%]'>
        <div className='w-[full] bg-[#043AC5] text-center text-[#fff] rounded-[10px] px-[1rem] py-[0.75rem] font-medium cursor-pointer'>Work in Progress</div>
      </div>
    </div>
  )
}

export default TicketStatus
