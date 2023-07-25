import React from 'react'

const ListWorkflow = () => {
  return (
    <div className='w-full'>
      <div className='w-full bg-[#42526E] pt-[1.5rem] pb-[1.5rem]'>
        <div className='text-[#fff] ml-[2rem]'><span>QuickService / ServiceSettings / Workflow settings</span></div>
        <div className='text-[#fff] text-[1.5rem] font-semibold ml-[2rem]'><span>Workflows</span></div>
      </div>
      <div className='w-full mt-[2rem]'>
        <div className='flex justify-end'><button className='mr-[5rem] bg-[#043AC5] px-[1rem] py-[0.5rem] text-[#fff]'>Add Workflow</button></div>
        
      </div>
    </div>
  )
}

export default ListWorkflow
