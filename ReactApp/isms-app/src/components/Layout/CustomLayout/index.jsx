/* eslint-disable no-unused-vars */
import AdminHeader from "../components/Admin Header";
import Footer from "../components/Footer";
import Sidebar from "./Sidebar";

// eslint-disable-next-line react/prop-types
function CustomLayout({ children }) {
  return (
    <div className="h-screen">
      <AdminHeader />
      <div className="flex h-[90vh] relative">
        <Sidebar />
        <div className="shrink grow">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
export default CustomLayout;
