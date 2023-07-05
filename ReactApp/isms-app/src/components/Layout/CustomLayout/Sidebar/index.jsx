import image from '../../../../assets/images';
import React, { useState, useRef, useEffect } from 'react';
import Switch from "react-switch";
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Sidebar() {
  return <div className="grow-0 shrink-0 w-[14.5%] bg-[#f5f5f5] flex flex-col">
    <div className="grow shrink">Top</div>
    <div className="grow-0 shrink-0 h-[25%] bg-[#fff] pt-[0.5rem] pl-[1rem] flex flex-col justify-end">
      <div></div>
        <span className={cx('switch')}>
          <input type="checkbox" id="switcher" />
          <label for="switcher"></label>
        </span>
      <div className="w-full h-[35%] flex justify-start items-center mt-[0.5rem] ">
        <div className="w-[1.75rem] h-[1.75rem rounded-full overflow-hidden ">
          <img className='w-full h-full object-cover object-center' src={image.avatar2} alt="" />
        </div>
        <div className='ml-[0.7rem] flex justify-center items-start flex-col leading-none'>
          <div><span className='text-[0.9rem] font-medium'>Tu Doan</span></div>
          <div><span className='text-[0.7rem] text-[#686868]'>Administrator</span></div>
        </div>
      </div>
    </div>
  </div>
}

export default Sidebar;
