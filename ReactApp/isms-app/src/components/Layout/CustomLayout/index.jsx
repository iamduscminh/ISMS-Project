/* eslint-disable no-unused-vars */
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "./Sidebar";

// eslint-disable-next-line react/prop-types
function CustomLayout({ children }) {
  return (
    <div>
      <Header />
      <Sidebar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
export default CustomLayout;
