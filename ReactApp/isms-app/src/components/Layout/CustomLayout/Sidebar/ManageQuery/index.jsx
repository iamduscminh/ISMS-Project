import React from 'react'
import IconTag from '../../../../Elements/IconTag';
import { MdManageSearch } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

const ManageQuery = ({ changeSidebar, type }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        changeSidebar(0);
    };

    const handleCreateQuery = () => {
        navigate(`/admin/query/${type}/create`);
    }

    return (
        <div className="grow shrink w-[full] relative px-[0.5rem] py-[1rem]">
            <div onClick={handleClick} className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm">
                <IconTag name="BsFillArrowLeftCircleFill" className="text-[1.25rem] text-[#42526E] mr-[1rem]" />
                <span className="text-[#42526E] text-[0.75rem]">Back to project</span>
            </div>
            <div className="w-full h-[2px] bg-[#ebecf0] mt-[0.5rem]"></div>
            <div className='px-[0.75rem] py-[0.5rem] '>
                <h1 className='font-medium text-[#42526E] '>{type}</h1>
                <div className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm">
                    <span className="text-[#42526E] text-[0.8rem]">Query All</span>
                </div>


                <h1 className='font-medium text-[#42526E] mt-[1rem]'>Your Query</h1>
                <div>
                    <div className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm">
                        <span className="text-[#42526E] text-[0.8rem]">All Open Tickets</span>
                    </div>
                    <div className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm">
                        <span className="text-[#42526E] text-[0.8rem]">All Inprogress Tickets</span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[2px] bg-[#ebecf0] mt-[0.5rem]"></div>

            <div>
                <div onClick={handleCreateQuery} className="w-[full] flex justify-start items-center cursor-pointer hover:bg-[#ebecf0] px-[0.75rem] py-[0.5rem] rounded-sm">
                    <MdManageSearch className="text-[1.25rem] text-[#42526E] mr-[1rem]" />
                    <span className="text-[#42526E] text-[0.75rem]">Create Query</span>
                </div>
            </div>
        </div>
    )
}

export default ManageQuery
