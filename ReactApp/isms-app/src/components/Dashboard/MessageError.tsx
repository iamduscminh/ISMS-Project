import clsx from "clsx";
import React from "react";

const MessageError = ({ error, type }) => {
  return (
    <div
      className={clsx(
        "flex items-center space-x-2 xl:space-x-3",
        type === "small" && "mt-1"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(type === "small" ? "w-[15px]" : "w-[35px]")}
        viewBox="0 0 35 35"
        fill="none"
      >
        <path
          d="M1.45801 30.6248L17.4997 2.9165L33.5413 30.6248H1.45801ZM5.24967 28.4373H29.7497L17.4997 7.2915L5.24967 28.4373ZM17.6519 26.3592C17.9636 26.3592 18.2228 26.2538 18.4294 26.0429C18.636 25.8321 18.7393 25.5708 18.7393 25.2591C18.7393 24.9474 18.6338 24.6882 18.423 24.4816C18.2121 24.275 17.9508 24.1717 17.6391 24.1717C17.3274 24.1717 17.0683 24.2771 16.8617 24.488C16.6551 24.6989 16.5518 24.9601 16.5518 25.2718C16.5518 25.5836 16.6572 25.8427 16.868 26.0493C17.0789 26.2559 17.3402 26.3592 17.6519 26.3592ZM16.5518 22.3123H18.7393V14.1457H16.5518V22.3123Z"
          fill="#DE350B"
        />
      </svg>
      <p
        className={clsx(
          "text-[#DE350B]",
          type === "small" ? "text-xs xl:text-sm" : "text-lg xl:text-2xl"
        )}
      >
        {error}
      </p>
    </div>
  );
};

export default MessageError;