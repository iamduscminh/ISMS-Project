import React from 'react'
import { MdArrowDropDown } from 'react-icons/md'
const statusData = [
  {
    id: 1,
    text: "New",
  },
  {
    id: 2,
    text: "Reject",
  },
  {
    id: 3,
    text: "Inprogress",
  },
  {
    id: 4,
    text: "Resolved",
  },
  {
    id: 5,
    text: "Pending",
  },
  {
    id: 6,
    text: "Close",
  },
];

const roleData = [
  {
    id: 1,
    text: "Service Owner",
  },
  {
    id: 2,
    text: "Service Member",
  },
  {
    id: 3,
    text: "Security expert",
  },
  {
    id: 4,
    text: "Infrastructure engineer",
  },
  {
    id: 5,
    text: "Network Engineer",
  },
];
const TextInfo = () => {

  return (
    <div className='mt-[2rem] w-[70%]'>
      <div className='border border-slate-200'>
        <div className='w-full bg-slate-200 px-[1.5rem] py-[0.75rem] rounded-sm flex justify-between items-center'>
          <div className='text-[1.25rem] text-[#42526E] '> <span className='font-medium mr-[2rem]'>Activity 1:</span> Requirement accepted </div>
          <MdArrowDropDown className='text-[2rem] cursor-pointer' />
        </div>
        <div className='w-full px-[1.5rem] py-[0.75rem] bg-white'>
          <div className='flex'>
            <div className='flex mr-[5rem]' >
              <div className='w-[100%] mr-[2.5rem]'><h2 className='text-[#42526E] font-medium'>Link Status</h2></div>
              <select className='bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]'>
                {statusData.map((item) => (
                  <option className='bg-white text-[#42526E]' key={item.id} value={item.id}>{item.text}</option>
                ))}
              </select>
            </div>

            <div className='flex ' >
              <div className='w-[100%] mr-[2.5rem]'><h2 className='text-[#42526E] font-medium'>Link Status</h2></div>
              <select className='bg-slate-500 text-center rounded-md font-medium px-[0.5rem] text-[#fff]'>
                {roleData.map((item) => (
                  <option className='bg-white text-[#42526E]' key={item.id} value={item.id}>{item.text}</option>
                ))}
              </select>
            </div>

          </div>

          <div className='w-full flex mt-[2rem]' >
            <div className='w-[12.5%]'><h2 className='text-[#42526E] font-medium'>Status Trans</h2></div>
            <div>
              <div className='flex mb-[0.75rem]'>
                <div><span className='text-[#42526E] font-medium mr-[0.5rem]'>Done</span> Transition to <span className='text-[#42526E] font-medium ml-[0.5rem]'> Activity 2</span></div>
                <div className='ml-[3rem] flex items-center'><span className='mr-[1rem]'>Transition Condition</span> <input type="checkbox" /></div>
                <div className='ml-[3rem] text-[#043AC5]'><a href="" className='mr-[0.5rem]'>Edit</a> <a href="">Delete</a></div>
              </div>
              <div className='flex'>
                <div><span className='text-[#42526E] font-medium mr-[0.5rem]'>Done</span> Transition to <span className='text-[#42526E] font-medium ml-[0.5rem]'> Activity 2</span></div>
                <div className='ml-[3rem] flex items-center'><span className='mr-[1rem]'>Transition Condition</span> <input type="checkbox" /></div>
                <div className='ml-[3rem] text-[#043AC5]'><a href="" className='mr-[0.5rem]'>Edit</a> <a href="">Delete</a></div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div >
  )
}

export default TextInfo
