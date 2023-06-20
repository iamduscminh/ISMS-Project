import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import React from "react";
import image from "../../assets/images";

import { TypeAnimation } from "react-type-animation";

const cx = classNames.bind(styles);

const Login = () => {
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
            "Quicken Your Service Management",
            1000,
            " Speed up Your IT Service Efficiency",
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
            "form-login absolute h-[83%] w-[35%] bg-[#FFFFFF] top-[25%] left-[51%] border-[#817A7A] border border-solid rounded-xl shadow-lg px-6 pt-7 pb-3 flex flex-col"
          )}
        >
          <div className={cx("h-[37%] flex flex-col")}>
            <h2>Log in QuickService with your account</h2>
            <p>Don’t have account yet?<a href="#">Create your account</a></p>
            <img src={image.IllusForm} alt="" className={cx('illusForm')}/>
          </div>
          <div className={cx("h-[53%]")}>mid</div>
          <div className={cx("h-[10%]")}>bot</div>
        </div>
      </div>
      <div className={cx("separate")}></div>
    </div>
  );
};

export default Login;
