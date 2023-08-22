import React from 'react'
import image from '../../../assets/images';
import { CgArrowLongRight } from 'react-icons/cg';
import UserChange from './UserChange';
import DefaultChange from './DefaultChange';

const ActivityComponent = ({ activity }) => {
    if (activity.type == 'UserChange') {
        return (
            <UserChange activity={activity} />
        )
    } else {
        return (
            <DefaultChange activity={activity} />
        )
    }

}

export default ActivityComponent
