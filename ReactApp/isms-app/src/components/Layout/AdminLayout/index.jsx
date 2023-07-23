import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex font-poppins">
      <Sidebar />
      <div className="lg:pl-[250px] xl:pl-[300px] bg-[#E3E9E9] w-full h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
