import React from "react";
import classNames from "classnames/bind";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
function CardItem({ url, iconComponent, title, description }) {
  return (
    <Link to={url} className={cx("card-item")}>
      <div className={cx("card-item-icon")}>{iconComponent}</div>
      <div className={cx("card-item-text")}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default CardItem;
