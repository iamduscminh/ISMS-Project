import React from 'react'
import classNames from 'classnames'
import styles from './TippyItem.module.scss';
import {HiOutlineDesktopComputer} from 'react-icons/hi';

const cx = classNames.bind(styles);
const TippyItem = () => {
  return (
    <div className='w-full bg-[#f5f5f5] flex justify-center items-center '>
      <div className='w-[10%] text-[#fff] text-[0.75rem]'>
        <div className='w-[100%] aspect-square bg-[#2684FF] flex justify-center items-center rounded-sm'>
          <HiOutlineDesktopComputer/>
        </div>
      </div>
      <div>
        <div><span>Setting Name</span></div>
        <div><span>Description about This Setting Name</span></div>
      </div>
    </div>
  )
}

export default TippyItem
