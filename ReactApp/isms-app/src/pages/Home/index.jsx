import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as Icon from "../../components/Elements/Icon";
import CardItem from "../../components/Elements/CardItem";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import request from "../../utils/axiosConfig";
const cx = classNames.bind(styles);

function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxiosPrivate();
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const [requestTicketData, setrequestTicketData] = useState([]);

  useEffect(() => {
    // const from = location.state?.from?.pathname || "/login";
    // if (!auth?.accessToken) navigate(from, { replace: true });

    const requester = { requester: auth?.email, requestTicketId: "" };
    const apiGetRequestTicketsUrl = `api/RequestTickets/getalltickets/${requester.requester}/${requester.requestTicketId}`;
    const fetchData = async () => {
      try {
        Swal.fire({
          title: "Loading...",
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          },
        });
        //--------------Get request tickets
        axiosInstance
          .get(apiGetRequestTicketsUrl)
          .then((response) => {
            const data = response.data
              .sort((a, b) => a.createdAt - b.createdAt)
              .slice(0, 5)
              .map((item, i) => ({
                id: item.requestTicketId,
                type: item.isIncident
                  ? "Issue Abnormal"
                  : item.serviceItemEntity?.serviceItemName,
                title: item.serviceItemEntity?.serviceItemName,
                status: item.status,
                createAt: new Date(item.createdAt).toLocaleString(
                  "en-US",
                  options
                ),
              }));
            setrequestTicketData(data);
            //console.log(data);
          })
          .catch((error) => {
            const result = Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${error}`,
              showCancelButton: true,
              cancelButtonText: "Cancel",
            });
          });
        Swal.close();
      } catch (error) {
        // Handle errors if needed
        console.log(error);
        Swal.close();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    };
    if (auth?.accessToken) fetchData();
  }, []);

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
            {requestTicketData.map((item, i) => {
              return (
                <Link
                  className={cx("top-request-item")}
                  to={`detailRequest/${item.id}`}
                  key={i}
                >
                  <div className={cx("request-content")}>
                    <div className={cx("request-content-title")}>
                      <p>{item.title}</p>
                    </div>
                    <div className={cx("request-content-date")}>
                      <span>Created on {item.createAt}</span>
                    </div>
                  </div>
                  <div className={cx("request-status")}>
                    <span>{item.status}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link
            className="text-xl font-bold text-blue-400 hover:text-blue-950 hover:underline"
            to="/viewRequests"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
