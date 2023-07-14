import React from 'react'
import classNames from 'classnames/bind';
import styles from './FilterCondition.module.scss';
import OrderCombobox from './OrderCombobox';

const cx = classNames.bind(styles);
const FilterCondition = () => {
  return (
    <div className='mt-[0.75rem]'>
        <div className='flex'>
            <h3 className='text-[#42526E] font-medium text-[1rem]'>Order by</h3>
            <OrderCombobox/>
        </div>
        <div></div>
    </div>
  )
}

export default FilterCondition