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
  {
    path: "/unauthorized",
    component: Page.Unauthorized,
    layout: Layout.FooterOnly,
  },
  { path: "/catalog", component: Page.Catalog },
  { path: "/create-request", component: Page.CreateRequest },
];

//private route: dành cho những route cần đăng nhập
const privateRoutes = [
  { path: "/profile", component: Page.Profile, layout: Layout.CustomLayout },
];

export { publicRoutes, privateRoutes };
