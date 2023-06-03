/* eslint-disable no-unused-vars */
//Layouts
import CustomLayout from "../components/Layout/CustomLayout";
import Home from "../pages/Home";
import Following from "../pages/Following";
import Profile from "../pages/Profile";
/* layout: null ko import layout nào cả
   layout: custom custom layout theo cách của ban!
   nếu ko sẽ mặc định dùng layout default */
//public route
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/following", component: Following, layout: null },
  { path: "/profile", component: Profile, layout: CustomLayout },
];

//private route: dành cho những route cần đăng nhập
const privateRoutes = [];

export default publicRoutes;
