import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import image from '../../assets/images';
import ProfileItem from '../../components/Elements/ProfileItem';
import {HiOutlineIdentification, HiOutlineCake} from 'react-icons/hi';
import {VscVmActive} from 'react-icons/vsc';
import {AiOutlineMail} from 'react-icons/ai';
import {MdWorkOutline} from 'react-icons/md';
import {BsPhone} from 'react-icons/bs';

function Profile() {
  return (
    <div className='w-full h-[77vh] relative'>
      <div className='w-full h-[25%] bg-[#42526E] mb-[6vw] relative'>
        <img src={image.wallpaper} alt="" className='w-full h-full object-cover object-center '/>
        <div className='absolute w-[10%] aspect-square bg-[#f5f5f5] rounded-full overflow-hidden left-[15%] top-[50%] border-4 border-[#fff]'>
          <img src={image.avatar} alt="" className='w-full h-full object-cover object-center'/>
        </div>
        <span className='absolute left-[25%] top-[120%] text-[1.4rem] font-medium text-[#42526E]'>Calyrex Spectrier</span>
      </div>
      <button className='w-[17%] border-2 border-[#A4A4A4] text-[#42526E] font-medium left-[15%] relative mb-[1rem]'>Edit Your Profile</button>
      <div className='w-[65%] left-[15%] relative rounded-[8px] border-2 border-[#C3B6B6] shadow-md grid grid-cols-3 gap-3'>
        <ProfileItem name="User Identification" value="#111111111" icon={HiOutlineIdentification}/>
        <ProfileItem name="Personal Email" value="doananhtu@gmail.com" icon={AiOutlineMail}/>
        <ProfileItem name="Job Title" value="Customer Care Staff" icon={MdWorkOutline}/>
        <ProfileItem name="Effective Date" value="Jun 14, 2023" icon={VscVmActive}/>
        <ProfileItem name="Phone Number" value="0967856010" icon={BsPhone}/>
        <ProfileItem name="User Identification" value="#111111111" icon={HiOutlineIdentification}/>
        <ProfileItem name="Work Email" value="tuda@quickservice.com.vn" icon={AiOutlineMail}/>  
        <ProfileItem name="Birth Date" value="July 25, 2001" icon={HiOutlineCake}/>
      </div>
    </div>
  )
}

export default Profile;
