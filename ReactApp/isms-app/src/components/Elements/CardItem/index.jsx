import React from "react";
import classNames from "classnames/bind";
import styles from "./CardItem.module.scss";
const cx = classNames.bind(styles);
function CardItem({ url, iconComponent, title, description }) {
  return (
    <a href={url} className={cx("card-item")}>
      <div className={cx("card-item-icon")}>{iconComponent}</div>
      <div className={cx("card-item-text")}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
}

export default CardItem;
