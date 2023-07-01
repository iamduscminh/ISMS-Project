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

const cx = classNames.bind(styles);
function Profile() {

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const wallpaperRef = useRef(null);

  //Thay đổi giữa state show và edit profile
  const handleEditProfile = () => {
    setIsEditing(prev => !prev);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      wallpaperRef.current.click();
    }
  };

  return (
    <div className='w-full h-[75vh] relative mb-[1.2rem]'>
      <div className={'w-full h-[25%] bg-[#42526E] mb-[6vw] relative'}>
        <div onClick={handleImageClick}  className={cx(`${isEditing ? 'wallpaper-wrapper' : '' }`)}></div>
        <img src={selectedImage || image.wallpaper} alt="" onClick={handleImageClick} className={`w-full h-full object-cover object-center`}/>

        <div className='absolute w-[10%] aspect-square bg-[#f5f5f5] rounded-full overflow-hidden left-[15%] top-[50%] border-4 border-[#fff] z-10'>
          <img src={image.avatar} alt="" className='w-full h-full object-cover object-center z-10'/>
        </div>
        <span className='absolute left-[25%] top-[120%] text-[1.4rem] font-medium text-[#42526E] z-10'>Calyrex Spectrier</span>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={wallpaperRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />

      {!isEditing ? 
      (<button className='w-[17%] border-2 border-[#42526E] text-[#42526E] font-medium left-[15%] relative mb-[1rem]' onClick={handleEditProfile}>Edit Your Profile</button>) : 
      (<button className='w-[17%] border-2 border-[#42526E] text-[#42526E] font-medium left-[15%] relative mb-[1rem]' onClick={handleEditProfile}>Confirm Change</button>)
      }

      <div className='w-[65%] left-[15%] relative rounded-[8px] border-2 border-[#C3B6B6] shadow-md grid grid-cols-3 gap-2'>
        <ProfileItem name="User Identification" value="#111111111" icon={HiOutlineIdentification} isEditing={isEditing} inputType="text"/>
        <ProfileItem name="Personal Email" value="doantu@gmail.com" icon={AiOutlineMail} isEditing={isEditing} inputType="email"/>
        <ProfileItem name="Job Title" value="Customer Care Staff" icon={MdWorkOutline} isEditing={isEditing} inputType="text"/>
        <ProfileItem name="Effective Date" value="Jun 14, 2023" icon={VscVmActive} isEditing={isEditing} inputType="date"/>
        <ProfileItem name="Phone Number" value="0967856010" icon={BsPhone} isEditing={isEditing} inputType="text"/>
        <ProfileItem name="User Identification" value="#111111111" icon={HiOutlineIdentification} isEditing={isEditing} inputType="text"/>
        <ProfileItem name="Work Email" value="tuda@service.com" icon={AiOutlineMail} isEditing={isEditing} inputType="email"/>  
        <ProfileItem name="Birth Date" value="July 25, 2001" icon={HiOutlineCake} isEditing={isEditing} inputType="date"/>
      </div>
    </div>
  )
}

export default Profile;
