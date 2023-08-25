import React from 'react'
import image from '../../../../assets/images'
import { CgArrowLongRight } from 'react-icons/cg';
import { parseISO, format } from "date-fns";
import {Link} from 'react-router-dom'


const UserChange = ({activity}) => {
    return (
        <div>
            <div className='flex items-center mb-[1rem]'>
                {activity.content !== "By" && <div className="w-[2.25rem] h-[2.25rem] rounded-full overflow-hidden mr-[0.5rem]">
                    <img
                        className="w-full h-full object-cover object-center"
                        src={activity.userEntity.avatar}
                        alt=""
                    />
                </div>}

                <div className="flex">
                    <div className="flex justify-start">
                        {activity.content !== "By" && <span className="font-medium text-[#42526E] mr-[0.5rem]">
                            <Link to={`/profile/${activity.userEntity.userId}`}>{activity.userEntity.fullName}</Link>
                        </span>
                        }
                        <span className="text-[#747272] text-[0.85rem]">{activity.content} at {format(parseISO(activity?.lastUpdate),"MMM-dd-yyyy HH:mm")}</span>
                    </div>
                    <div className='flex items-center ml-[2rem]'>
                        {activity.content === "By" && <div className="w-[3rem] h-[2.25rem] rounded-full overflow-hidden mr-[0.5rem]">
                            <img
                                className="w-full h-full object-cover object-center"
                                src={activity.userEntity.avatar}
                                alt=""
                            />
                        </div>}
                        {activity.content === "By" && <span className="font-medium text-[#42526E] mr-[1rem]">
                            <Link to={`/profile/${activity.userEntity.userId}`}>{activity.userEntity.fullName}</Link>
                        </span>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserChange
