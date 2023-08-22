import React from 'react'
import image from '../../../../assets/images'
import { CgArrowLongRight } from 'react-icons/cg';


const UserChange = ({activity}) => {
    return (
        <div>
            <div className='flex items-center'>
                <div className="w-[2.25rem] h-[2.25rem] rounded-full overflow-hidden mr-[0.5rem]">
                    <img
                        className="w-full h-full object-cover object-center"
                        src={activity.image}
                        alt=""
                    />
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-start">
                        <span className="font-medium text-[#42526E] mr-[1rem]">
                            <a href="">{activity.username}</a>
                        </span>
                        <span className="text-[#747272] ">{activity.action} at 10:33:26 {activity.tỉme}</span>
                    </div>
                    <div className='flex items-center'>
                        <span className='text-[#747272] mr-[2rem]'>{activity.action}</span>
                        <CgArrowLongRight className='text-[2rem] text-[#42526E] mr-[2rem]' />
                        <div className="w-[2.25rem] h-[2.25rem] rounded-full overflow-hidden mr-[0.5rem]">
                            <img
                                className="w-full h-full object-cover object-center"
                                src={activity.update.image}
                                alt=""
                            />
                        </div>
                        <span className="font-medium text-[#42526E] mr-[1rem]">
                            <a href="">{activity.update.updateUser}</a>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserChange
