/* eslint-disable no-unused-vars */
import Footer from "../components/Footer";

function FooterOnly({ children }) {
  return (
    <div>
      <div className="h-[86vh] bg-blue-200">{children}</div>
      <Footer />
    </div>
  );
}
export default FooterOnly;
