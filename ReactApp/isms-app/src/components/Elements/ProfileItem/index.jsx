import React, {useState} from 'react'
import PropTypes from 'prop-types';

const ProfileItem = ({ name, value, icon: IconComponent, isEditing, inputType, onChange, children, error }) => {

  const [editedValue, setEditedValue] = useState(value);
  const today = new Date().toISOString().split('T')[0];
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setEditedValue(inputValue);
    onChange(inputValue);
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
      <div className='flex flex-col justify-start mt-[1rem] pl-[1rem] ml-[1.75rem]'>
        <h1 className='text-[#42526E] font-medium text-[1.2rem] mb-[0.75rem]'>{name}</h1>
        <div className='flex leading-none items-center'>
          <IconComponent className="text-[#42526E] mr-[1.75rem] text-[1.4rem]" />
          <input type={inputType}
                 onChange={handleInputChange} 
                 className="text-[#828282] border-b-2 border-[#828282] w-[8.5rem] mr-[0.5rem]"
                 value={editedValue}
                 max={today}
                 />
          {children}
        </div>
        {error && (
          <span className="ml-[3rem] text-[0.6rem] mt-[0.1rem] text-red-500">
            {error}
          </span>
        )}
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