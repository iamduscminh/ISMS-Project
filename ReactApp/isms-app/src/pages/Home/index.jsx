import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { BsSearch, BsFillInfoSquareFill } from "react-icons/bs";
import { HiOutlineDesktopComputer } from "react-icons/hi";
const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home-container")}>
      <div className={cx("home-top-section")}>
        <h1>Welcome, how can we help you?</h1>
        <div className={cx("top-search-container")}>
          <a href="#">
            <BsSearch className={cx("top-search-button")} />
          </a>
          <input
            type="search"
            name="search-all"
            id="home_top_search"
            className={cx("top-search-input")}
          />
        </div>
      </div>
      <div className={cx("home-mid-section")}>
        <div className={cx("home-mid-content")}>
          <a href="#" className={cx("card-item")}>
            <BsFillInfoSquareFill className={cx("card-item-icon")} />
            <div className={cx("card-item-text")}>
              <h3>Request a service</h3>
              <p>Send your problem to It Service</p>
            </div>
          </a>
          <a href="#" className={cx("card-item")}>
            <HiOutlineDesktopComputer className={cx("card-item-icon")} />
            <div className={cx("card-item-text")}>
              <h3>Report for hardware problem</h3>
              <p>Raise your problem to IT Service about your device</p>
            </div>
          </a>
        </div>
      </div>
      <div className={cx("home-bottom-section")}>
        <div className={cx("home-bottom-content")}>
          <h2>Your Request</h2>
          <div className={cx("top-requests")}>
            <a className={cx("top-request-item")} href="#">
              <div className={cx("request-content")}>
                <div className={cx("request-content-title")}>
                  <p>Device Problem : Support me with computer problem #RQ01</p>
                </div>
                <div className={cx("request-content-date")}>
                  <span>Created on 19 May 13:17 PM</span>
                </div>
              </div>
              <div className={cx("request-status")}>
                <span>Inprogress</span>
              </div>
            </a>
            <a className={cx("top-request-item")} href="#">
              <div className={cx("request-content")}>
                <div className={cx("request-content-title")}>
                  <p>Device Problem : Support me with computer problem #RQ01</p>
                </div>
                <div className={cx("request-content-date")}>
                  <span>Created on 19 May 13:17 PM</span>
                </div>
              </div>
              <div className={cx("request-status")}>
                <span>Inprogress</span>
              </div>
            </a>
            <a className={cx("top-request-item")} href="#">
              <div className={cx("request-content")}>
                <div className={cx("request-content-title")}>
                  <p>Device Problem : Support me with computer problem #RQ01</p>
                </div>
                <div className={cx("request-content-date")}>
                  <span>Created on 19 May 13:17 PM</span>
                </div>
              </div>
              <div className={cx("request-status")}>
                <span>Inprogress</span>
              </div>
            </a>
          </div>
          <a href="#">View All</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
