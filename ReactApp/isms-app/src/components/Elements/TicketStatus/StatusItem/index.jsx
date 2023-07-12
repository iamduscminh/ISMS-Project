import React from 'react'
import classNames from 'classnames/bind';
import styles from './StatusItem.Module.scss';
import StatusData from './StatusData';

const cx = classNames.bind(styles);

const StatusItem = ({status, onSelect}) => {

  if(StatusData.Handle.includes(status.text)){
    return (
      <div onClick={(e)=>onSelect(status)} className={cx(`flex items-center justify-center px-[0.5rem] py-[0.2rem] bg-[#deebff] font-medium cursor-pointer border-b hover:bg-[#fff]`)}>
        <span className={cx(`text-[#0747a6]`)}>{status.text}</span>
      </div>
    )
  }else if(StatusData.NotHandle.includes(status.text)){
    return (
      <div onClick={(e)=>onSelect(status)}  className={cx(`flex items-center justify-center px-[0.5rem] py-[0.2rem] bg-[#dfe1e6] font-medium cursor-pointer border-b hover:bg-[#fff]`)}>
        <span className={cx(`text-[#42526e]`)}>{status.text}</span>
      </div>
    )
  }else{
    return (
      <div onClick={(e)=>onSelect(status)}  className={cx(`flex items-center justify-center px-[0.5rem] py-[0.2rem] bg-[#c5e9d9] font-medium cursor-pointer border-b hover:bg-[#fff]`)}>
        <span className={cx(`text-[#127251]`)}>{status.text}</span>
      </div>
    )
  }
}

export default StatusItem
