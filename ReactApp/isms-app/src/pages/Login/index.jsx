import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import React, { useRef, useEffect, useState } from 'react';
import image from "../../assets/images";
import UnderlineAnimation from '../../components/Animation/UnderlineText';
import ChangeBgButton from '../../components/Animation/ChangeBgButton';

import { TypeAnimation } from "react-type-animation";
import { AiFillWarning } from "react-icons/ai";

const cx = classNames.bind(styles);

const Login = () => {

  //Khai báo các hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const inputRef = useRef(null);
  const passRef = useRef(null);

  //Với dependecies là mảng rỗng thì useEffect() chỉ được gọi 1 lần khi mount
  //Dom gắn vào ref này sẽ focus ngay khi mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePass = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    // Kiểm tra định dạng email
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        if (!email) {
          setError(prev => '⚠ Business Email is required');
        }else if(!validateEmail(email)){
          setError(prev => '⚠ Suggested format (name@company.com)')
        }else{
          setError('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [email]);

  useEffect(() => {
    const handleClickOutsidePass = (event) => {
      if (passRef.current && !passRef.current.contains(event.target)) {
        if (!password) {
          setErrorPass(prev => '⚠ Password is required');
        }else{
          setErrorPass('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutsidePass);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsidePass);
    };
  }, [password]);

  return (
    <div
      className={cx("login-container w-full h-full bg-[#F5F5F5] flex flex-col")}
    >
      <div className={cx("content")}>
        <img src={image.logo} alt="" className={cx("logo")} />
        <img src={image.illustrator} alt="" className={cx("illustrator")} />
        <h1
          className={cx(
            "text-4xl text-[#FFFFFF] font-bold absolute top-[74%] left-[16%]"
          )}
        >
          Quick Service
        </h1>
        <TypeAnimation
          sequence={[
            "Accelerate Your IT Solutions!",
            1000,
            "Quicken Your Service Manage",
            1000,
            " Speed up Your IT Service",
            1000,
            "Fast-track Your IT Support",
            1000,
          ]}
          wrapper="div"
          cursor={false}
          repeat={Infinity}
          className={cx("text-animation")}
        />
        <div
          className={cx(
            "form-login absolute h-[87%] w-[35%] bg-[#FFFFFF] top-[25%] left-[51%] border-[#817A7A] border border-solid rounded-xl shadow-lg px-6 pt-7 pb-3 flex flex-col"
          )}
        >
          <div className={cx("h-[32%] flex flex-col mb-2")}>
            <h2>Log in QuickService with your account</h2>
            <p>Don’t have account yet? <UnderlineAnimation><a href="#">Create your account</a></UnderlineAnimation></p>
            <img src={image.IllusForm} alt="" className={cx('illusForm')} />
          </div>
          <div className={cx("h-[58%] flex flex-col mt-6")}>

            <label className={cx("input-label")}> 
              <input ref={inputRef} value={email} onChange={handleChange} type="text" placeholder=" " className={cx('input-custom')}/>
              <span className={cx("absolute top-[0.25rem] left-[0.75rem] cursor-text")}>Business Email</span>   
            </label>

            <div className={cx('mb-[1rem] ml-[0.75rem]')}>{error && <span className={cx('text-[#B33233] text-[0.7rem]')}>{error}</span>}</div>

            <label className={cx("input-label")}> 
              <input ref={passRef} value={password} onChange={handleChangePass} type="password" placeholder=" " className={cx('input-custom')}/>
              <span className={cx("absolute top-[0.25rem] left-[0.75rem] cursor-text")}>Password</span>
            </label>

            <div className={cx('mb-[1rem] ml-[0.75rem]')}>{errorPass && <span className={cx('text-[#B33233] text-[0.7rem]')}>{errorPass}</span>}</div>

            <div className={cx("input-checkbox")}>
              <input type="checkbox" className={cx('checkbox-remember')} />
              <span>Remember Account</span>
            </div>

            <div className={cx('h-[20%] w-[20%] self-end relative')}><ChangeBgButton>Continue</ChangeBgButton></div>
          </div>
          <div className={cx("h-[10%] flex flex-col items-center justify-center")}>
            <div className={cx('w-[60%] border-t-2 border-[#525252]')}></div>
            <h3 className={cx('mt-[0.2rem]')}><UnderlineAnimation><a href="#" className={cx('text-[#043AC5]')}>Login problem? FAQ can help</a></UnderlineAnimation></h3>
          </div>
        </div>
      </div>
      <div className={cx("separate")}></div>
    </div>
  );
};

export default Login;
