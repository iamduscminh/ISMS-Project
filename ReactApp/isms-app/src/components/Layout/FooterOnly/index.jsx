/* eslint-disable no-unused-vars */
import Footer from "../components/Footer";

// eslint-disable-next-line react/prop-types
function FooterOnly({ children }) {
  return (
    <div>
      <div className="h-[105vh]">{children}</div>
      <Footer />
    </div>
  );
}
export default FooterOnly;
