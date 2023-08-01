import * as Layout from "../components/Layout/";
import * as Page from "../pages";
import { ROUTES_PATHS } from "../../constants";

/* layout: null ko import layout nào cả
   layout: custom custom layout theo cách của ban!
   nếu ko sẽ mặc định dùng layout default */
//public route
const publicRoutes = [
  { path: "/", component: Page.Home },
  { path: "/following", component: Page.Following, layout: null },
  { path: "/login", component: Page.Login, layout: Layout.FooterOnly },
  { path: "/profile", component: Page.Profile, layout: Layout.DefaultLayout },
  {
    path: "/unauthorized",
    component: Page.Unauthorized,
    layout: Layout.FooterOnly,
  },
  { path: "/catalog", component: Page.Catalog },
  { path: "/createRequest/:id?", component: Page.CreateRequest },
  { path: "/detailRequest/:id", component: Page.DetailRequest },
  { path: "/admin/", component: Page.ListTicket, layout: Layout.CustomLayout },
  {
    path: "/admin/query",
    component: Page.TicketQuery,
    layout: Layout.CustomLayout,
  },
  { path: "/admin/sla", component: Page.SLA, layout: Layout.CustomLayout },
  {
    path: "/admin/ticket/:ticketId",
    component: Page.TicketDetail,
    layout: Layout.CustomLayout,
  },
  
  { path: "/viewRequests", component: Page.ViewRequests },
  {
    path: "/viewRequestTypes",
    component: Page.ViewRequestTypes,
    layout: Layout.CustomLayout,
  },
  {
    path: "/createRequestType",
    component: Page.CreateRequestType,
    layout: Layout.CustomLayout,
  },

  { path: "/updateCustomField/:id", component: Page.UpdateCustomField },

  {
    path: "/admin/setting/workflows",
    component: Page.ListWorkflow,
    layout: Layout.CustomLayout,
  },
  {
    path: "/admin/setting/workflows/:mode/:flowId?",
    component: Page.ViewWorkflow,
    layout: Layout.CustomLayout,
  },
  {
    path: "/createRequestType",
    component: Page.CreateRequestType,
    layout: Layout.CustomLayout,
  },
  // {
  //   path: "/viewCustomFields",
  //   component: Page.ViewCustomFields,
  //   layout: Layout.CustomLayout,
  // },
  {
    path: ROUTES_PATHS.ADMIN,
    component: Page.Dashboard,
    layout: Layout.AdminLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_TICKET,
    component: Page.AdminTicket,
    layout: Layout.AdminLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_REPORT,
    component: Page.AdminReport,
    layout: Layout.AdminLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_SETTING,
    component: Page.Dashboard,
    layout: Layout.AdminLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_CONTACT,
    component: Page.Dashboard,
    layout: Layout.AdminLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_ROLE,
    component: Page.AdminRole,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_USERS,
    component: Page.AdminUserManage,
    layout: Layout.CustomLayout,
  },
];

//private route: dành cho những route cần đăng nhập

//Route có Permission là PERM000000: Mange users
const PERM000000Routes = [{
  path: "/admin/setting/services",
  component: Page.ServiceSettings,
  layout: Layout.CustomLayout,
},];

//Route có Permission là PERM000001: Mange roles
const PERM000001Routes = [];

//Route có Permission là PERM000002: Manage tickets
const PERM000002Routes = [
  
];

//Route có Permission là PERM000003: Manage service items
const PERM000003Routes = [
  
];

//Route có Permission là PERM000004: Manage service categories
const PERM000004Routes = [];

//Route có Permission là PERM000005: Manage custom fields
const PERM000005Routes = [];

export {
  publicRoutes,
  PERM000000Routes,
  PERM000001Routes,
  PERM000002Routes,
  PERM000003Routes,
  PERM000004Routes,
  PERM000005Routes,
};
