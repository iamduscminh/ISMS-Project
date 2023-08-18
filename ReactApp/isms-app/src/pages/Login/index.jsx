import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import image from "../../assets/images";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import ChangeBgButton from "../../components/Animation/ChangeBgButton";
import useAuth from "../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { TypeAnimation } from "react-type-animation";
import request from "../../utils/axiosConfig";
import { PERMISSIONS } from "../../routes/Permissions";

const cx = classNames.bind(styles);

const LOGIN_URL = "api/Users/login";
const SECRET_KEY = "98d52c42-28ef-4e8c-baeb-30cacbc39327";

const Login = () => {
  //Lấy lại Context

  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   // Nếu có accessToken, chuyển hướng về trang chính
  //   if (auth.accessToken) {
  //     navigate('/');
  //   }
  // }, [auth.accessToken, navigate]);

  //Khai báo các hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorPass, setErrorPass] = useState("");
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
          setError((prev) => "⚠ Business Email is required");
        } else if (!validateEmail(email)) {
          setError((prev) => "⚠ Suggested format (name@company.com)");
        } else {
          setError("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [email]);

  useEffect(() => {
    const handleClickOutsidePass = (event) => {
      if (passRef.current && !passRef.current.contains(event.target)) {
        if (!password) {
          setErrorPass((prev) => "⚠ Password is required");
        } else {
          setErrorPass("");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutsidePass);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePass);
    };
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error != "" || errorPass != "") {
      return;
    }
    try {
      //Comment lại đợi API này
      const response = await request.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.token;
      const decodedToken = jwtDecode(accessToken);
      console.log(decodedToken);
      const from =
        location.state?.from?.pathname ||
        (decodedToken.roletype === "Admin" ? "/admin" : "/");

      const permissions = decodedToken.permissions
        ? decodedToken.permissions
        : Object.keys(PERMISSIONS);

      setAuth({
        email,
        password,
        userId: decodedToken.sub,
        permissions: permissions,
        roletype: decodedToken.roletype,
        roleName: decodedToken.role,
        accessToken,
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err.response?.data);
      if (!err?.response) {
        alert("No server response");
      } else if (err.response?.status === 400) {
        alert(err.response?.data.message);
      } else {
        alert("Login failed");
      }
    }
  };

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
            <p>
              Don’t have account yet?{" "}
              <UnderlineAnimation>
                <a href="#">Create your account</a>
              </UnderlineAnimation>
            </p>
            <img src={image.IllusForm} alt="" className={cx("illusForm")} />
          </div>
          <form className={cx("h-[63%]")} onSubmit={handleSubmit}>
            <div className={cx("w-full h-full flex flex-col mt-4")}>
              <label className={cx("input-label")}>
                <input
                  ref={inputRef}
                  value={email}
                  onChange={handleChange}
                  type="text"
                  placeholder=" "
                  className={cx("input-custom")}
                />
                <span
                  className={cx(
                    "absolute top-[0.25rem] left-[0.75rem] cursor-text"
                  )}
                >
                  Business Email
                </span>
              </label>

              <div
                className={cx(
                  "mb-[0.75rem] ml-[0.75rem] transition-all ease-150"
                )}
              >
                {error ? (
                  <span className={cx("text-[#B33233] text-[0.7rem]")}>
                    {error}
                  </span>
                ) : (
                  <span className={cx("text-[#B33233] text-[0.7rem]")}></span>
                )}
              </div>

              <label className={cx("input-label")}>
                <input
                  ref={passRef}
                  value={password}
                  onChange={handleChangePass}
                  type="password"
                  placeholder=" "
                  className={cx("input-custom")}
                />
                <span
                  className={cx(
                    "absolute top-[0.25rem] left-[0.75rem] cursor-text"
                  )}
                >
                  Password
                </span>
              </label>

              <div
                className={cx(
                  "mb-[0.2rem] ml-[0.75rem] transition-all ease-150"
                )}
              >
                {errorPass ? (
                  <span className={cx("text-[#B33233] text-[0.7rem]")}>
                    {errorPass}
                  </span>
                ) : (
                  <span className={cx("text-[#B33233] text-[0.7rem]")}></span>
                )}
              </div>

              <div className={cx("input-checkbox")}>
                <input type="checkbox" className={cx("checkbox-remember")} />
                <span>Remember Account</span>
              </div>

              <div className={cx("h-[15%] w-[100%] mt-2 flex  items-center")}>
                {/* <ChangeBgButton type="submit">Continue</ChangeBgButton> */}
                <button
                  type="submit"
                  className="w-[30%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 mb-2  focus:outline-none "
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div
            className={cx("h-[5%] flex flex-col items-center justify-center")}
          >
            <div className={cx("w-[60%] border-t-2 border-[#525252]")}></div>
            <h3 className={cx("mt-[0.2rem]")}>
              <UnderlineAnimation>
                <a href="#" className={cx("text-[#043AC5] text-[0.7rem]")}>
                  Login problem? FAQ can help
                </a>
              </UnderlineAnimation>
            </h3>
          </div>
        </div>
      </div>
      <div className={cx("separate")}></div>
    </div>
  );
};

export default Login;
