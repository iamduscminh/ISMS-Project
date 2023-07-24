 
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminHeader from "../components/Admin Header";
import useAuth from "../../../hooks/useAuth";
import { PERMISSIONS } from "../../../routes/Permissions";

function DefaultLayout({ children }) {
  const { auth } = useAuth();
  return (
    <div className="h-screen">
      {/* {auth?.roles?.find((role) => role === ROLES.Administrator) ? (
        <Header />
      ) : (
        <AdminHeader />
      )} */}
      <AdminHeader />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
export default DefaultLayout;
