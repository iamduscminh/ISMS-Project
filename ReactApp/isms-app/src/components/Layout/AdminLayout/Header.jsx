import React, { useState } from "react";
import BtnMenus from "./BtnMenus";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#7F91B0] py-4 xl:py-7 px-8 xl:pl-[70px] xl:pr-12 flex justify-between items-center">
      <h6 className="text-white text-lg xl:text-3xl font-bold">Dashboard</h6>
      <div className="flex space-x-4 xl:space-x-10 items-center">
        <img
          src="/images/icon-notify.svg"
          alt=""
          className="p-2 w-8 xl:w-[38px] rounded-full hover:bg-slate-400 cursor-pointer"
        />
        <div className="flex space-x-3 items-center cursor-pointer">
          <div className="w-8 xl:w-9 h-8 xl:h-9 rounded-full bg-[#D9D9D9] flex items-center justify-center">
            <img src="/images/avatar.svg" alt="" className="w-4 xl:w-5" />
          </div>
          <div className="text-sm flex flex-col text-white">
            <span className="font-bold">Doan Tu</span>
            <span>Administrator</span>
          </div>
        </div>
        <BtnMenus open={open} setOpen={setOpen} />
      </div>
    </header>
  );
};

export default Header;
