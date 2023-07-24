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
  { path: "/profile", component: Page.Profile, layout: Layout.DefaultLayout },
  {
    path: "/unauthorized",
    component: Page.Unauthorized,
    layout: Layout.FooterOnly,
  },
  { path: "/catalog", component: Page.Catalog },
  { path: "/createRequest/:id", component: Page.CreateRequest },
  { path: "/detailRequest", component: Page.DetailRequest },
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
  {
    path: "/admin/setting/services",
    component: Page.ServiceSettings,
    layout: Layout.CustomLayout,
  },
  { path: "/viewRequests", component: Page.ViewRequests },
  { path: "/viewRequestTypes", component: Page.ViewRequestTypes },
  { path: "/createRequestType", component: Page.CreateRequestType },
  { path: "/updateCustomField", component: Page.UpdateCustomField },
];

//private route: dành cho những route cần đăng nhập

//Route có Permission là PERM000000: Mange users
const PERM000000Routes = [];

//Route có Permission là PERM000001: Mange roles
const PERM000001Routes = [];

//Route có Permission là PERM000002: Manage tickets
const PERM000002Routes = [];

//Route có Permission là PERM000003: Manage service items
const PERM000003Routes = [];

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
