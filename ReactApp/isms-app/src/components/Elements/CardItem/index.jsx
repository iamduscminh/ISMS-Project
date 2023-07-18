import React from "react";
import classNames from "classnames/bind";
import styles from "./CardItem.module.scss";
import { Link } from "react-router-dom";
import IconTag from "../IconTag";
const cx = classNames.bind(styles);
function CardItem({ url, iconName, title, description }) {
  return (
    <Link to={url} className={cx("card-item")}>
      <div className={cx("card-item-icon")}>
        <IconTag name={iconName} />
      </div>
      <div className={cx("card-item-text")}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default CardItem;
