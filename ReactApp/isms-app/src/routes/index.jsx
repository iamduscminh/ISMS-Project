/* eslint-disable no-unused-vars */
import * as Layout from "../components/Layout/";
import * as Page from "../pages";

/* layout: null ko import layout nào cả
   layout: custom custom layout theo cách của ban!
   nếu ko sẽ mặc định dùng layout default */
//public route
const publicRoutes = [
  { path: "/", component: Page.Home },
  { path: "/following", component: Page.Following, layout: null },
  { path: "/login", component: Page.Login, layout: Layout.FooterOnly },
<<<<<<< HEAD
  { path: "/unauthorized", component: Page.Unauthorized, layout: Layout.FooterOnly },
  { path: "/profile", component: Page.Profile, layout: Layout.DefaultLayout }
=======
  {
    path: "/unauthorized",
    component: Page.Unauthorized,
    layout: Layout.FooterOnly,
  },
  { path: "/catalog", component: Page.Catalog },
>>>>>>> 16ea18b65087355cd818b8e2d49bca8e3e520cf7
];

//private route: dành cho những route cần đăng nhập
const privateRoutes = [
<<<<<<< HEAD
  
=======
  { path: "/profile", component: Page.Profile, layout: Layout.CustomLayout },
>>>>>>> 16ea18b65087355cd818b8e2d49bca8e3e520cf7
];

export { publicRoutes, privateRoutes };
