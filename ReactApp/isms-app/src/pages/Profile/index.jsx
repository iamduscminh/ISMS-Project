import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import image from "../../assets/images";
import ProfileItem from "../../components/Elements/ProfileItem";
import {
  HiOutlineIdentification,
  HiOutlineCake,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import { VscVmActive } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { BsPhone } from "react-icons/bs";
import Switch from "react-switch";

const cx = classNames.bind(styles);
function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [userName, setUserName] = useState("Calyrex Spectrier");

  const [itemValue, setItemValue] = useState({
    userIdentification: "#25072001",
    effectiveDate: "2023-07-02",
    workEmail: "tuda@service.com",
    personalEmail: "doantu@gmail.com",
    phoneNumber: "0967856010",
    birthDate: "2001-07-25",
    jobTitle: "Customer Care Staff",
    department: "Customer Service",
  });

  const [privateValue, setPrivateValue] = useState({
    personalEmailSwitchVal: true,
    phoneNumberSwitchVal: true,
    birthDateVal: true
  });

  const [inputErrors, setInputErrors] = useState({});

  const wallpaperRef = useRef(null);
  const avatarRef = useRef(null);


  //Thay đổi giữa state show và edit profile
  const handleEditProfile = () => {
    const hasErrors = Object.values(inputErrors).some((error) => error !== '');

    if (!hasErrors) {
      setIsEditing((prev) => !prev);
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (wallpaperRef.current && wallpaperRef.current.contains(event.target)) {
        setSelectedImage(reader.result);
      } else if (
        avatarRef.current &&
        avatarRef.current.contains(event.target)
      ) {
        setSelectedAvatar(reader.result);
      }
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

  const handleAvatarClick = () => {
    if (isEditing) {
      console.log(1);
      avatarRef.current.click();
    }
  };

  const handleOnChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleProfileItemValueChange = (name, value) => {
    validateInput(name, value);
    setItemValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const validateInput = (name, value) => {
    // Kiểm tra và cập nhật lỗi validate cho từng input
    let error = '';

    if (name === 'personalEmail') {
      const isValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      if (!isValidEmail) {
        error = 'Invalid email format';
      }
    }
    if(name === 'phoneNumber'){
      const isValidPhone = /^\d{10}$/.test(value);
      if (!isValidPhone) {
        error = 'Invalid Phone Number';
        console.log(1);
      }
    }

    // Cập nhật lỗi validate cho input
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };
  const handleSwitchChange = () => {
    setPrivateValue((prevValues) => ({
      ...prevValues,
      personalEmailSwitchVal: !prevValues.personalEmailSwitchVal,
    }));
  };
  return (
    <div className="w-full h-[75vh] relative mb-[1.2rem]">
      <div className={"w-full h-[25%] bg-[#42526E] mb-[5.75vw] relative"}>
        <div
          onClick={handleImageClick}
          className={cx(`${isEditing ? "wallpaper-wrapper" : ""}`)}
        ></div>
        <img
          src={selectedImage || image.wallpaper}
          alt=""
          onClick={handleImageClick}
          className={`w-full h-full object-cover object-center`}
        />

        <div className="absolute w-[10%] aspect-square bg-[#f5f5f5] rounded-full overflow-hidden left-[15%] top-[50%] border-4 border-[#fff] z-10">
          <img
            src={selectedAvatar || image.avatar}
            alt=""
            className="w-full h-full object-cover object-center z-10"
          />
          <div
            onClick={handleAvatarClick}
            className={cx(`${isEditing ? "avatar-wrapper" : ""}`)}
          ></div>
        </div>
        {!isEditing ? (
          <span className="absolute left-[25%] top-[120%] text-[1.4rem] font-medium text-[#42526E] z-10">
            {userName}
          </span>
        ) : (
          <input
            type="text"
            value={userName}
            onChange={handleOnChangeUserName}
            className="absolute left-[25%] top-[120%] text-[1.4rem] font-medium text-[#42526E] z-10 border-b-4 w-[12rem]"
          />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={wallpaperRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />

      <input
        type="file"
        accept="image/*"
        ref={avatarRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />

      {!isEditing ? (
        <button
          className="w-[17%] border-2 border-[#42526E] text-[#42526E] font-medium left-[15%] relative mb-[0.5rem]"
          onClick={handleEditProfile}
        >
          Edit Your Profile
        </button>
      ) : (
        <button
          className="w-[17%] border-2 border-[#42526E] text-[#42526E] font-medium left-[15%] relative mb-[0.5rem]"
          onClick={handleEditProfile}
        >
          Confirm Change
        </button>
      )}

      <div className="w-[65%] left-[15%] relative rounded-[8px] border-2 border-[#C3B6B6] shadow-md grid grid-cols-3 gap-0">
        <ProfileItem
          name="User Identification"
          value={itemValue.userIdentification}
          icon={HiOutlineIdentification}
          isEditing={false}
          inputType="text"
        />
        <ProfileItem
          name="Personal Email"
          value={itemValue.personalEmail}
          icon={AiOutlineMail}
          isEditing={isEditing}
          inputType="email"
          onChange={(value) =>
            handleProfileItemValueChange("personalEmail", value)
          }
          error={inputErrors.personalEmail}
        >
          <Switch
            disabled={!isEditing ? true : false}
            checked={privateValue.personalEmailSwitchVal}
            onChange={handleSwitchChange}
            width={24}
            height={12}
            handleDiameter={12}
            onColor="#42526E"
          />
        </ProfileItem>
        <ProfileItem
          name="Job Title"
          value={itemValue.jobTitle}
          icon={MdWorkOutline}
          isEditing={isEditing}
          inputType="text"
          onChange={(value) => handleProfileItemValueChange("jobTitle", value)}
        />
        <ProfileItem
          name="Effective Date"
          value={itemValue.effectiveDate}
          icon={VscVmActive}
          isEditing={false}
          inputType="date"
        />
        <ProfileItem
          name="Phone Number"
          value={itemValue.phoneNumber}
          icon={BsPhone}
          isEditing={isEditing}
          inputType="text"
          onChange={(value) =>
            handleProfileItemValueChange("phoneNumber", value)
          }
          error={inputErrors.phoneNumber}
        >
          <Switch
            disabled={!isEditing ? true : false}
            checked={privateValue.phoneNumberSwitchVal}
            onChange={() => { }}
            width={24}
            height={12}
            handleDiameter={12}
            onColor="#42526E"
          />
        </ProfileItem>
        <ProfileItem
          name="Department"
          value={itemValue.department}
          icon={HiOutlineOfficeBuilding}
          isEditing={isEditing}
          inputType="text"
          onChange={(value) =>
            handleProfileItemValueChange("department", value)
          }
        />
        <ProfileItem
          name="Work Email"
          value={itemValue.workEmail}
          icon={AiOutlineMail}
          isEditing={false}
          inputType="email"
        />
        <ProfileItem
          name="Birth Date"
          value={itemValue.birthDate}
          icon={HiOutlineCake}
          isEditing={isEditing}
          inputType="date"
          onChange={(value) => handleProfileItemValueChange("birthDate", value)}
        >
          <Switch
            disabled={!isEditing ? true : false}
            checked={privateValue.birthDateVal}
            onChange={() => { }}
            width={24}
            height={12}
            handleDiameter={12}
            onColor="#42526E"
          />
        </ProfileItem>
      </div>
    </div>
  );
}

export default Profile;
