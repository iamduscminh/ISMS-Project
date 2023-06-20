/* eslint-disable no-unused-vars */
import Footer from "../components/Footer";

function FooterOnly({ children }) {
  return (
    <div>
      <div>{children}</div>
      <Footer />
    </div>
  );
}
export default FooterOnly;
