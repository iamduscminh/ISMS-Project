import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./CreateRequest.module.scss";
import * as Icon from "../../components/Elements/Icon";
import UnderlineAnimation from "../../components/Animation/UnderlineText";

const cx = classNames.bind(styles);
function CreateRequest() {
  return (
    <div
      className={cx("cre-request-container w-full h-full py-5 bg-[#f5f7f9]")}
    >
      <div
        className={cx(
          "cre-request-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow"
        )}
      >
        <div className={cx("cre-request-header w-full bg-gray-200")}>
          <nav className={cx("cre-request-header-nav px-6 pt-3 pb-3")}>
            <ul
              className={cx("header-nav-content flex items-center text-[18px]")}
            >
              <li className={cx("header-nav-item ml-1")}>
                <Link className={cx("header-nav-url text-blue-700")} to="/">
                  <UnderlineAnimation>Home</UnderlineAnimation>
                </Link>
              </li>

              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <Link
                  className={cx("header-nav-url text-blue-700")}
                  href="/catalog"
                >
                  <UnderlineAnimation>Create Request</UnderlineAnimation>
                </Link>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <Link
                  className={cx("header-nav-url text-blue-700")}
                  href="/catalog"
                >
                  <UnderlineAnimation>Accounts</UnderlineAnimation>
                </Link>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <Link className={cx("header-nav-url")}>
                  <span>Reset Password</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div
            className={cx(
              "cre-request-header-content px-6 pb-3 flex items-center"
            )}
          >
            <div className={cx("cre-request-header-icon")}>
              <Icon.BsFillInfoSquareFill className={cx("h-[50px] w-[50px]")} />
            </div>
            <div className={cx("cre-request-header-description ml-5")}>
              <h4 className="text-2xl font-bold">Reset Password</h4>
              <span>Reset your Password Account</span>
            </div>
          </div>
        </div>
        {/* REQUEST FORM SECTION*/}
        <div className={cx("p-5 w-full h-full")}>
          <div className={cx("request-ticket-form-ctn w-[60%] m-auto")}>
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
