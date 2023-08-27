import React from "react";
import IconTag from "../../IconTag";
const NotificationBell = ({ notificationCount }) => {
  return (
    <div className="relative">
      <IconTag
        name={"IoMdNotifications"}
        className={"absolute  text-white text-2xl "}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Bell icon SVG */}
      </svg>
      {notificationCount > 0 && (
        <span className="absolute bottom-3 left-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
