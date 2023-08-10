import React, { useState } from 'react'
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'

const listOrderElement = ['Priority', 'Request Type', 'Service', 'Assignee', 'Reporter', 'Group', 'Created', 'None']

const OrderCombobox = ({onSelect, data}) => {
  console.log(data);
  const [checkOrder, setCheckOrder] = useState(false);

  const [isAsc, setIsAsc] = useState(data.orderASC);
  const [orderValue, setOrderValue] = useState(data.orderBy);

  const handleChooseValue = (selectedItem) => {
    setOrderValue(selectedItem);
    setCheckOrder(false);
    onSelect(selectedItem, isAsc)
  }

  const showOrder = () => {
    setCheckOrder(prev=>!prev);
  }

  const changeOrder = () => {
    setIsAsc(!isAsc);
    onSelect(orderValue, !isAsc)
  }
  return (
    <div>
        <div  className='relative w-[8rem] bg-[#DCE4FF] rounded-md flex justify-between items-center px-[0.75rem] cursor-pointer z-[500]'>
            <span onClick={showOrder} className='px-[0.25rem] text-[#42526E] font-medium'>{orderValue || 'None'}</span>
            {isAsc ? <AiOutlineArrowUp onClick={changeOrder}/> : <AiOutlineArrowDown onClick={changeOrder}/>}
            {checkOrder && <div className='absolute z-[200] bottom-0 left-0 translate-y-[105%] w-full text-[1rem] border-2 rounded-md'>
              {listOrderElement.map((item, index) => (
                <div onClick={() => handleChooseValue(item)} key={index} className='w-full bg-[#fff]  px-[1rem] text-[#42526E] font-medium border-b-2 z-[500] '>{item}</div>
              ))}
            </div>}
        </div>
    </div>
  )
}

export default OrderCombobox