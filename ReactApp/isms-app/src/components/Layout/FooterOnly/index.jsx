import Footer from "../components/Footer";

function FooterOnly({ children }) {
  return (
    <div>
      <div className="h-[103vh]">{children}</div>
      <Footer />
    </div>
  );
}
export default FooterOnly;
