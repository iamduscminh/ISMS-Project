import React from "react";
import { Link } from "react-router-dom";
import IconTag from "../../IconTag";
function NotificationItem({ url, title, sender, time }) {
  return (
    <Link to={url} className="">
      <div className="p-1 flex items-end border-t">
        <IconTag name={"BsDot"} className={"text-blue-600  text-3xl "} />
        <div className="noti-content w-[90%]">
          <div className="top-section flex justify-between">
            <p className="text-sm text-gray-500">{sender}</p>
            <span className="text-sm text-gray-500">{time}</span>
          </div>
          <h3 className="truncate">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default NotificationItem;
