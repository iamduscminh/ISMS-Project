import React, {useState} from 'react'
import PropTypes from 'prop-types';

const ProfileItem = ({ name, value, icon: IconComponent, isEditing, inputType, onChange, children }) => {

  const [editedValue, setEditedValue] = useState(value);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
    onChange(e.target.value);
  };
  if (!isEditing) {
    return (
      <div className='flex flex-col justify-start mt-[1rem] pl-[1rem] ml-[1.75rem] mb-[0.4rem]'>
        <h1 className='text-[#42526E] font-medium text-[1.2rem] mb-[0.75rem]'>{name}</h1>
        <div className='flex leading-none items-center'>
          <IconComponent className="text-[#42526E] mr-[1.75rem] text-[1.4rem]" />
          <h4 className='text-[#828282] mr-[0.5rem]'>{value}</h4>
          {children}
        </div>
      </div>
    )
  } else {
    return (
      <div className='flex flex-col justify-start mt-[1rem] pl-[1rem] ml-[1.75rem] mb-[0.4rem]'>
        <h1 className='text-[#42526E] font-medium text-[1.2rem] mb-[0.75rem]'>{name}</h1>
        <div className='flex leading-none items-center'>
          <IconComponent className="text-[#42526E] mr-[1.75rem] text-[1.4rem]" />
          <input type={inputType} 
                 onChange={handleInputChange} 
                 className="text-[#828282] border-b-2 border-[#828282] w-[8.5rem] mr-[0.5rem]"
                 value={editedValue} />
          {children}
        </div>
      </div>
    )
  }

}
ProfileItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};
export default ProfileItem