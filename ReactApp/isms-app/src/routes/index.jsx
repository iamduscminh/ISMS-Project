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
  { path: "/admin/", component: Page.ListTicket, layout: Layout.CustomLayout},
  { path: "/admin/query", component: Page.TicketQuery, layout: Layout.CustomLayout},
  { path: "/admin/sla", component: Page.SLA, layout: Layout.CustomLayout},
  { path: "/admin/ticket/:ticketId", component: Page.TicketDetail, layout: Layout.CustomLayout},
  { path: "/viewRequests", component: Page.ViewRequests },
  { path: "/viewRequestTypes", component: Page.ViewRequestTypes },
  { path: "/createRequestType", component: Page.CreateRequestType },
  { path: "/updateCustomField", component: Page.UpdateCustomField },
];

//private route: dành cho những route cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
