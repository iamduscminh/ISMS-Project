import React from "react";
import classNames from "classnames/bind";
import styles from "./CreateRequest.module.scss";
import { AiOutlineRight } from "react-icons/ai";
import { BsSearch, BsFillInfoSquareFill } from "react-icons/bs";
import UnderlineAnimation from "../../components/Animation/UnderlineText";

const cx = classNames.bind(styles);
function CreateRequest() {
  return (
    <div
      className={cx("cre-request-container w-full h-full py-5 bg-[#f5f7f9]")}
    >
      <div className={cx("cre-request-section")}>
        <div className={cx("cre-request-header w-full bg-gray-200")}>
          <nav className={cx("cre-request-header-nav px-6 pt-5 pb-3")}>
            <ul
              className={cx("header-nav-content flex items-center text-[18px]")}
            >
              <li className={cx("header-nav-item ml-1")}>
                <a
                  className={cx("header-nav-url text-blue-700")}
                  href="/"
                  title="Home"
                  aria-label="Home"
                >
                  <UnderlineAnimation>Home</UnderlineAnimation>
                </a>
              </li>

              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <a
                  className={cx("header-nav-url text-blue-700")}
                  href="/catalog"
                  title="Create Request"
                  aria-label="Create Request"
                >
                  <UnderlineAnimation>Create Request</UnderlineAnimation>
                </a>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <a
                  className={cx("header-nav-url text-blue-700")}
                  href="/catalog"
                  title="Account"
                  aria-label="Accounts"
                >
                  <UnderlineAnimation>Accounts</UnderlineAnimation>
                </a>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <a
                  className={cx("header-nav-url")}
                  href="#"
                  title="Reset Password"
                  aria-label="Reset Password"
                >
                  <span>Reset Password</span>
                </a>
              </li>
            </ul>
          </nav>
          <div
            className={cx(
              "cre-request-header-content px-6 pb-3 flex items-center"
            )}
          >
            <div className={cx("cre-request-header-icon")}>
              <BsFillInfoSquareFill className={cx("h-[50px] w-[50px]")} />
            </div>
            <div className={cx("cre-request-header-description ml-5")}>
              <h3>Reset Password</h3>
              <span>Reset your Password Account</span>
            </div>
          </div>
        </div>
        {/* REQUEST FORM SECTION*/}
        <div className={cx("p-5 w-full h-full")}>
          <div className={cx("request-ticket-form-ctn")}>
            <form>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-500 "
                >
                  Request Title
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-500 "
                >
                  Description
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Write description content of request ticket"
                ></textarea>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;
