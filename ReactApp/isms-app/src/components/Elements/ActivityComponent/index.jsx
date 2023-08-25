import React from 'react'
import image from '../../../assets/images';
import { CgArrowLongRight } from 'react-icons/cg';
import UserChange from './UserChange';
import DefaultChange from './DefaultChange';

const ActivityComponent = ({ activity }) => {
    if (activity.type == 'UserChange') {
        return (
            <DefaultChange activity={activity} />
        )
    } else {
        return (
            <UserChange activity={activity} />  
        )
    }

}

export default ActivityComponent
