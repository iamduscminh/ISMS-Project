import React from "react";

const ChartLayout = ({ children, title, subTitle }) => {
  return (
    <section>
      <div
        className="text-lg bg-[#DBD9D9] px-4 py-[5px] text-center border-b border-black"
        style={{ boxShadow: "0px 6px 4px 0px rgba(0, 0, 0, 0.20)" }}
      >
        {title}
      </div>
      <div className="px-4 py-[30px] text-sm bg-white space-y-4">
        {subTitle}
        {children}
      </div>
    </section>
  );
};

export default ChartLayout;
