import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { BsSearch } from "react-icons/bs";
const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx("home-container")}>
      <div className={cx("home-top-section")}>
        <h1>Welcome, how can we help you?</h1>
        <div className={cx("home-top-search")}>
          <div className="top-search-container">
            <BsSearch />
            <input type="search" name="search-all" id="home_top_search" />
          </div>
        </div>
      </div>
      <div className={cx("home-mid-section")}>
        <div className={cx("home-mid-content")}>
          <a href="#" className={cx("card-item")}>
            <div className={cx("card-item-text")}>
              <h3></h3>
              <p></p>
            </div>
          </a>
        </div>
      </div>
      <div className={cx("home-bottom-section")}>
        <div className={cx("home-bottom-content")}>
          <h4>Your Request</h4>
          <div className="top-requests">
            <div className="top-request-item">
              <div className="request-content"></div>
              <div className="request-status"></div>
            </div>
          </div>
          <a href="#">View All</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
