import AdminHeader from "../components/Admin Header";
import Footer from "../components/Footer";
import Sidebar from "./Sidebar";

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
