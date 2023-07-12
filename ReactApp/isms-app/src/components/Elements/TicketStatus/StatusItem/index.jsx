import React from 'react'
import classNames from 'classnames/bind';


const StatusItem = ({status}) => {
  return (
    <div className='flex items-center justify-center px-[0.5rem] py-[0.2rem] rounded-[7px] bg-[]'>
      <span>{status.text}</span>
    </div>
  )
}

export default StatusItem
