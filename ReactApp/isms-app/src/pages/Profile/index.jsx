import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import image from '../../assets/images';

function Profile() {
  return (
    <div className='w-full h-[74vh] relative'>
      <div className='w-full h-[25%] bg-[#42526E] mb-[8vw]'>
        <img src={image.wallpaper} alt="" className='w-full h-full object-cover object-center'/>
        <div className='absolute w-[10%] aspect-square bg-[#f5f5f5] rounded-full overflow-hidden left-[15%] top-[15%] border-4 border-[#fff]'>
          <img src={image.avatar} alt="" className='w-full h-full object-cover object-center'/>
        </div>
        <span className='absolute top-0 left-[25%] top-[31%] text-[1.4rem] font-medium text-[#42526E]'>Calyrex Spectrier</span>
      </div>
    </div>
  )
}

export default Profile;
