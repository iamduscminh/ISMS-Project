import React from 'react';
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import PropTypes from 'prop-types';

const Dropdown = ({dropdownOptions}) => {
  const handleOptionSelect = (option) => {
    console.log('Selected option:', option);
    // Xử lý logic khi lựa chọn một option
  };

  return (
    <Tooltip
      interactive
      trigger="click"
      placement="bottom-start"
      content={
        <ul>
          {dropdownOptions.map((option) => (
            <li key={option} onClick={() => handleOptionSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      }
    >
      <button>Dropdown</button>
    </Tooltip>
  );
};

Dropdown.propTypes = {
    dropdownOptions: PropTypes.array.isRequired
};

export default Dropdown;