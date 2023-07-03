import React from 'react';
import styles from './ListTicket.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ListTicket = () => {
  return (
    <div>
      <div className='relative w-full h-[18vh] bg-[#42526E] pt-[1.5rem] pl-[4rem]'>
        <h3 className='text-[1rem] text-[#fff] font-medium mb-[0.5rem]'>ServiceTicket/allTicket</h3>
        <h2 className='text-[1.4rem] text-[#fff] font-medium'>Query All Service Ticket</h2>
      </div>
    </div>
  )
}

export default ListTicket