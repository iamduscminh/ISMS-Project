import React from "react";
import styles from './UserItem.Module.scss';
import classNames from 'classnames/bind';
import image from '../../../../assets/images';

const cx = classNames.bind(styles);
const UserItem = ({ data, onSelect }) => {
  const handleClick = (item) => {
    onSelect(item);
  };
  return (
    <>
      {data.map((item) => (
        <li
          key={item.id}
          className={cx("option")}
          onClick={() => handleClick(item)}
        >
          <div className="w-[1.75rem] h-[1.75rem] rounded-full overflow-hidden mr-[1rem]">
            <img
              className="w-full h-full object-cover object-center"
              src={item.avatar}
              alt=""
            />
          </div>
          <span className={cx("option-text")}>{item.username}</span>
        </li>
      ))}
    </>
  );
};

export default UserItem;
