import React from "react";
import classNames from 'classnames/bind';
import styles from './ServiceTypeItem.module.scss';
import { MdKeyboardArrowDown,MdElectricalServices } from "react-icons/md";

const cx = classNames.bind(styles);

const ServiceTypeItem = ({data, onSelect}) => {
  const handleClick = (item) => {
    onSelect(item);
  };
  return (
    <>
      {data.map((item) => (
        <li key={item.id} className={cx("option")} onClick={() => handleClick(item)}>
          <div className="w-[1.3rem] mr-[0.5rem] aspect-square rounded-md bg-[#FF7452] flex items-center justify-center text-[#fff] text-[1.5rem]">
            {item.icon}
          </div>
          <span className={cx("option-text")}>{item.serviceName}</span>
        </li>
      ))}
    </>
  );
};

export default ServiceTypeItem;
