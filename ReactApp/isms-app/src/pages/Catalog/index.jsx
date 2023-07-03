import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Catalog.module.scss";
import { BsSearch, BsFillInfoSquareFill } from "react-icons/bs";
import { AiOutlineRight } from "react-icons/ai";
import UnderlineAnimation from "../../components/Animation/UnderlineText";
import CardItem from "../../components/Elements/CardItem";
const cx = classNames.bind(styles);

function Catalog() {
  return (
    <div className={cx("catalog-container w-full h-full py-5 bg-[#f5f7f9]")}>
      <div
        className={cx(
          "catalog-section mt-4 mx-auto max-w-7xl min-h-screen bg-white rounded shadow"
        )}
      >
        <div className={cx("catalog-header w-full bg-gray-200")}>
          <nav className={cx("catalog-header-nav px-6 pt-3 pb-3")}>
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
                  <AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <Link className={cx("header-nav-url")}>
                  <span>Service Catalog</span>
                </Link>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <div className={cx("header-nav-arrow")}>
                  <AiOutlineRight />
                </div>
              </li>
              <li className={cx("header-nav-item ml-1")}>
                <Link className={cx("header-nav-url")}>
                  <span>All</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div
            className={cx("catalog-header-content px-6 pb-3 flex items-center")}
          >
            <div className={cx("catalog-header-icon")}>
              <BsFillInfoSquareFill className={cx("h-[50px] w-[50px]")} />
            </div>
            <div className={cx("catalog-header-description ml-5")}>
              <h4 className="text-2xl font-bold">Service Catalog</h4>
              <span>
                Browse the list of services offered and raise a request
              </span>
            </div>
          </div>
        </div>
        <div className={cx("catalog-content p-3 flex")}>
          <div
            className={cx(
              "catalog-sidebar w-[25%] py-2 px-3 flex flex-col text-[18px]"
            )}
          >
            <div className={cx("catalog-service")}>
              <span className={cx("font-bold text-blue-700")}>
                All Services Items
              </span>
              <AiOutlineRight />
            </div>
            <div className={cx("catalog-service")}>
              <span>Computers</span>
            </div>
            <div className={cx("catalog-service")}>
              <span>Account and Login</span>
            </div>
            <div className={cx("catalog-service")}>
              <span>Network</span>
            </div>
          </div>
          <div className={cx("catalog-requestTypes")}>
            <div className={cx("requestType-card grid grid-cols-3 gap-4")}>
              <CardItem
                url="#"
                title="Request a service"
                description="Send your problem to It Service"
                iconComponent={<BsFillInfoSquareFill />}
              />
              <CardItem
                url="#"
                title="Request a service"
                description="Send your problem to It Service"
                iconComponent={<BsFillInfoSquareFill />}
              />
              <CardItem
                url="#"
                title="Request a service"
                description="Send your problem to It Service"
                iconComponent={<BsFillInfoSquareFill />}
              />
              <CardItem
                url="#"
                title="Request a service"
                description="Send your problem to It Service"
                iconComponent={<BsFillInfoSquareFill />}
              />
              <CardItem
                url="#"
                title="Request a service"
                description="Send your problem to It Service"
                iconComponent={<BsFillInfoSquareFill />}
              />
              <CardItem
                url="#"
                title="Request a service"
                description="Send your problem to It Service"
                iconComponent={<BsFillInfoSquareFill />}
              />
              <CardItem
                url="#"
                title="Request a service"
                description="Send your problem to It Service"
                iconComponent={<BsFillInfoSquareFill />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
