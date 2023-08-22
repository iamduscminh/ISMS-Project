import React from "react";
import AdminHeader from "../components/Admin Header";
import Sidebar from "../CustomLayout/Sidebar/DataAnalysis";
import Footer from "../components/Footer";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex font-poppins flex-1 overflow-y-auto">
        <Sidebar />
        <div className="flex-1 bg-[#E3E9E9] w-full flex flex-col">
          <main className="flex-1 flex flex-col overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      <footer className="flex flex-none bg-white justify-center items-center p-4">
        <Footer />
      </footer>
    </div>
  );
};

export default AdminLayout;
