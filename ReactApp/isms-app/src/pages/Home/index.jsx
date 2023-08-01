import React from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import * as Icon from "../../components/Elements/Icon";
import CardItem from "../../components/Elements/CardItem";
import useAuth from "../../hooks/useAuth";
import request from "../../utils/axiosConfig";
const cx = classNames.bind(styles);

function Home() {
  const { auth } = useAuth();
  console.log(auth?.accessToken);
  const apiUrl = "https://localhost:7134/api/ServiceCategories/getall";
  const headers = {
    Authorization: `Bearer ${auth?.accessToken}`,
    // Add any other required headers here
  };

  request
    .get(apiUrl, { headers })
    .then((response) => {
      // Handle the API response here
      //console.log("API Response:", response.data);
    })
    .catch((error) => {
      // Handle errors here
      //console.error("API Error:", error);
    });

  return (
    <div className={cx("home-container mt-14")}>
      <div className={cx("home-top-section")}>
        <h1>Welcome, how can we help you?</h1>
        <div className={cx("top-search-container")}>
          <a href="#">
            <Icon.BsSearch className={cx("top-search-button")} />
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
            iconName={"BsFillInfoSquareFill"}
          />
          <CardItem
            url="/createRequest"
            title="Report an issue"
            description="Having abnormal trouble? Send your issue to us"
            iconName={"GoReport"}
          />
          <CardItem
            url="/viewRequests"
            title="View All Request"
            description="Browse your list request ticket"
            iconName={"CiViewList"}
          />
          <CardItem
            url="#"
            title="Request Ticker Filter"
            description="Filter, search your list request ticket"
            iconName={"BiFilterAlt"}
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
