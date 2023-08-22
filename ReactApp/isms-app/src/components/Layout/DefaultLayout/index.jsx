import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminHeader from "../components/Admin Header";
import useAuth from "../../../hooks/useAuth";
import { PERMISSIONS } from "../../../routes/Permissions";

function DefaultLayout({ children }) {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <div className="h-screen">
      {!auth?.roletype ? <Header /> : <AdminHeader />}
      <div>{children}</div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
