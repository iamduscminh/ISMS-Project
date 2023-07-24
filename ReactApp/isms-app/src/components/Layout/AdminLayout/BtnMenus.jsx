import { useClickAway } from "@uidotdev/usehooks";
import clsx from "clsx";
import React from "react";
import { sidebarMenus } from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const IconMenu = ({ className }) => (
  <svg
    className={className}
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const BtnMenus = ({ open, setOpen }) => {
  const ref = useClickAway(() => {
    setOpen(false);
  });
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location?.pathname;
  return (
    <div className="relative lg:hidden" ref={ref}>
      <button
        className={clsx(
          "rounded-full hover:bg-slate-500 outline-none border-none p-2 focus:outline-none",
          open && "bg-slate-500"
        )}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <IconMenu className="text-white w-[18px] h-[18px]" />
      </button>
      <ul
        className={clsx(
          "mt-1 absolute z-10 py-3 px-5 top-full right-0 rounded-lg shadow-xl bg-[#E0ECF2] space-y-3 w-[200px]",
          open ? "block" : "hidden"
        )}
      >
        {sidebarMenus?.main?.map((item) => {
          const isActive = item.href === currentPath;
          return (
            <li
              key={item?.label}
              className={clsx(
                "flex items-center space-x-2 cursor-pointer hover:text-[#76c1ff] transition-all",
                isActive && "text-[#76c1ff] font-semibold"
              )}
              onClick={() => {
                if (item?.href) navigate?.(item?.href);
              }}
            >
              <img src={item?.icon} alt="" className="w-6" />
              <span>{item?.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BtnMenus;
