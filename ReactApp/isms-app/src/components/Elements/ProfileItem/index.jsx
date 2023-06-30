import React from 'react'
import PropTypes from 'prop-types';

const ProfileItem = ({name, value, icon: IconComponent}) => {
  return (
    <div className='flex flex-col justify-start mt-[1rem] pl-[1rem] ml-[1.75rem] mb-[0.75rem]'>
        <h1 className='text-[#42526E] font-medium text-[1.2rem] mb-[0.75rem]'>{name}</h1>
        <div className='flex leading-none items-center'>
            <IconComponent className="text-[#42526E] mr-[1.75rem] text-[1.4rem]"/>
            <h4 className='text-[#828282]'>{value}</h4>
        </div>
    </div>
  )
}
ProfileItem.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.value,
    icon: PropTypes.elementType.isRequired,
  };
export default ProfileItem