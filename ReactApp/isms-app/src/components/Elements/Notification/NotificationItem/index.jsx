import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconTag from "../../IconTag";
function NotificationItem({ url, title, body, time, displayContent, isRead }) {
  const navigate = useNavigate();
  // const history = useHistory();
  const handleNavigateNoti = () => {
    console.log("check");
    // history.push("/");
  };
  return (
    <div
      className="p-1 flex items-end border-t hover:bg-slate-300"
      onClick={handleNavigateNoti}
    >
      {!isRead && (
        <IconTag name={"BsDot"} className={"text-blue-600  text-3xl "} />
      )}
      <div className="noti-content w-[90%]">
        {displayContent ? (
          <h3 className="p-1">{body}</h3>
        ) : (
          <h3 className="p-1 truncate">{title}</h3>
        )}

        <div className="top-section flex justify-between">
          <span className="text-sm text-gray-500">{time}</span>
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
