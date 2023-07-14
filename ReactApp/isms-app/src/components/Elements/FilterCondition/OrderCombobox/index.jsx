import React from 'react'
import {AiOutlineArrowUp} from 'react-icons/ai'

const OrderCombobox = () => {
  return (
    <div>
        <div className=' relative w-[8rem] bg-[#DCE4FF] rounded-md flex justify-between items-center px-[0.75rem] cursor-pointer'>
            <span>none</span>
            <AiOutlineArrowUp/>
            <div className='absolute'></div>
        </div>
    </div>
  )
}

export default OrderCombobox