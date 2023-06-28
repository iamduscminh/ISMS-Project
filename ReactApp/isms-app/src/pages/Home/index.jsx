import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { BsSearch, BsFillInfoSquareFill } from "react-icons/bs";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import CardItem from "../../components/Elements/CardItem";
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
        <div className={cx("home-mid-content grid grid-cols-2 gap-5")}>
          <CardItem
            url="/catalog"
            title="Request a service"
            description="Send your problem to It Service"
            iconComponent={<BsFillInfoSquareFill />}
          />
          <CardItem
            url="#"
            title="View All Request"
            description="Browse your list request ticket"
            iconComponent={<HiOutlineDesktopComputer />}
          />
          <CardItem
            url="#"
            title="Report for hardware problem"
            description="Raise your problem to IT Service about your device"
            iconComponent={<HiOutlineDesktopComputer />}
          />
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
