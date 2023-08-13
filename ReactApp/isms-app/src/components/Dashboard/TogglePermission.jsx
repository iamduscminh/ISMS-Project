import clsx from "clsx";
import React from "react";

const IconX = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
  >
    <path
      d="M12.0507 11.3874C12.0942 11.4309 12.1287 11.4826 12.1523 11.5395C12.1759 11.5964 12.188 11.6574 12.188 11.719C12.188 11.7806 12.1759 11.8416 12.1523 11.8985C12.1287 11.9554 12.0942 12.0071 12.0507 12.0507C12.0071 12.0942 11.9554 12.1288 11.8985 12.1523C11.8416 12.1759 11.7806 12.188 11.719 12.188C11.6574 12.188 11.5964 12.1759 11.5395 12.1523C11.4826 12.1288 11.4309 12.0942 11.3874 12.0507L7.50026 8.16296L3.61315 12.0507C3.52519 12.1386 3.4059 12.188 3.28151 12.188C3.15712 12.188 3.03783 12.1386 2.94987 12.0507C2.86191 11.9627 2.8125 11.8434 2.8125 11.719C2.8125 11.5946 2.86191 11.4753 2.94987 11.3874L6.83757 7.50026L2.94987 3.61315C2.86191 3.52519 2.8125 3.4059 2.8125 3.28151C2.8125 3.15712 2.86191 3.03783 2.94987 2.94987C3.03783 2.86191 3.15712 2.8125 3.28151 2.8125C3.4059 2.8125 3.52519 2.86191 3.61315 2.94987L7.50026 6.83757L11.3874 2.94987C11.4753 2.86191 11.5946 2.8125 11.719 2.8125C11.8434 2.8125 11.9627 2.86191 12.0507 2.94987C12.1386 3.03783 12.188 3.15712 12.188 3.28151C12.188 3.4059 12.1386 3.52519 12.0507 3.61315L8.16296 7.50026L12.0507 11.3874Z"
      fill="#F7F4F4"
    />
  </svg>
);

const IconAllow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
  >
    <path
      d="M13.9312 1.43555L14.8174 2.31445L5.00293 12.1362L0.183594 7.31689L1.06982 6.43066L5.00293 10.3638L13.9312 1.43555Z"
      fill="#FDFDFD"
    />
  </svg>
);

const TogglePermission = ({ value, togglePermission }) => {
  return (
    <div
      onClick={togglePermission}
      className="max-w-[240px] mx-auto bg-[#DCE4FF] cursor-pointer rounded-xl py-2 px-3 grid grid-cols-2"
    >
      <div
        className={clsx(
          "flex justify-center items-center space-x-3 bg-[#F61E1E] rounded-2xl text-sm text-white",
          value === true && "invisible"
        )}
      >
        <IconX /> <span>Deny</span>
      </div>
      <div
        className={clsx(
          "flex justify-center items-center space-x-3 bg-[#2C834E] rounded-2xl text-sm text-white",
          value === false && "invisible"
        )}
      >
        <IconAllow /> <span>Allow</span>
      </div>
    </div>
  );
};

export default TogglePermission;
