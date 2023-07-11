import { React, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./DetailRequest.module.scss";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import RequestComment from "../../components/Elements/RequestComment";
import ModalDialog from "../../components/Elements/PopupModal";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as Icon from "../../components/Elements/Icon";
const cx = classNames.bind(styles);
function CreateRequest() {
  const reasonCancelRef = useRef(null);
  const cancelRequestDetail = () => {
    console.log(reasonCancelRef.current.value);
  };

  return (
    <div
      className={cx("detail-request-container w-full h-full py-5 bg-[#f5f7f9]")}
    >
      <div
        className={cx(
          "detail-request-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow"
        )}
      >
        <div className={cx("detail-request-header w-full bg-gray-200")}>
          <nav className={cx("detail-request-header-nav px-6 pt-3 pb-3")}>
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
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <a
                  className={cx("header-nav-url text-blue-700")}
                  href="/catalog"
                  title="Create Request"
                  aria-label="Create Request"
                >
                  <UnderlineAnimation>Request Tickets</UnderlineAnimation>
                </a>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <Icon.AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <a
                  className={cx("header-nav-url")}
                  href="#"
                  title="Reset Password"
                  aria-label="Reset Password"
                >
                  <span>#043AC5</span>
                </a>
              </li>
            </ul>
          </nav>
          <div
            className={cx(
              "detail-request-header-content px-6 pb-3 flex items-center justify-between"
            )}
          >
            <div className="detail-request-header-left  flex items-center">
              <div className={cx("detail-request-header-icon")}>
                <Icon.BsFillInfoSquareFill
                  className={cx("h-[50px] w-[50px]")}
                />
              </div>
              <div className={cx("detail-request-header-description ml-5")}>
                <h4 className="text-2xl font-bold">Reset Password</h4>
                <span>Reset your Password Account</span>
              </div>
            </div>
            <div className="detail-request-header-right">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                New Request
              </button>
            </div>
          </div>
        </div>

        <div className={cx("p-5 w-full h-full flex")}>
          <div className={cx("detail-request-content w-[60%] flex flex-col")}>
            <div className={cx("detail-request-content")}>
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                New Macbook computer request
              </h2>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 text-lg font-bold text-gray-800 "
                >
                  Description
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder=""
                ></textarea>
              </div>
            </div>
            <div className={cx("detail-request-activity")}>
              <h6 className="text-lg font-bold text-gray-800">Activity</h6>
              <hr />
              <RequestComment
                isAutoCmt={false}
                name={"Duc Minh"}
                comment={"Confirm!"}
                time={"at 26/May/23 12:34 PM"}
              />
              <RequestComment
                isAutoCmt={true}
                name={"Duc Minh"}
                comment={"Your request status has changed to In Progress."}
                time={"at 26/May/23 12:34 PM"}
              />
            </div>
          </div>
          <div className={cx("w-[40%] p-5 ml-4 mt-10")}>
            <div className={cx("detail-request-status")}>
              <h6 className="text-lg font-bold ">Status</h6>
              <hr />
              <h3 className="text-3xl font-extrabold ">INPROGRESS</h3>
              <ModalDialog
                title={"Cancel Request"}
                actionText={"Cancel Request"}
                actionHandler={cancelRequestDetail}
                triggerComponent={
                  <div className="inline-block cursor-pointer">
                    <div className="flex items-center hover:bg-gray-500 hover:text-white">
                      <Icon.FaExchangeAlt />
                      <p className="text-lg font-bold ml-3">Cancel Request</p>
                    </div>
                  </div>
                }
              >
                <div className="mb-1">
                  <label
                    htmlFor="reason_cancel"
                    className="block mb-2 text-sm font-medium text-gray-500 "
                  >
                    Reason Cancel
                  </label>
                  <textarea
                    id="reason_cancel"
                    ref={reasonCancelRef}
                    rows="5"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-40 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Write the reason you want cancel this request"
                  ></textarea>
                </div>
              </ModalDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRequest;
