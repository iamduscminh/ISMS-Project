import * as Layout from "../components/Layout/";
import * as Page from "../pages";
import { ROUTES_PATHS } from "../../constants";

/* layout: null ko import layout nào cả
   layout: custom custom layout theo cách của ban!
   nếu ko sẽ mặc định dùng layout default */
//public route
const publicRoutes = [
  { path: "/login", component: Page.Login, layout: Layout.FooterOnly },
  {
    path: "/unauthorized",
    component: Page.Unauthorized,
    layout: Layout.FooterOnly,
  },

  {
    path: "/admin/:typeTicket?/:queryId?",
    component: Page.ListTicket,
    layout: Layout.CustomLayout,
  },
];

//private route: dành cho những route cần đăng nhập

//Route có Permission là PERM000000: Mange users
const PERM000000Routes = [
  {
    path: ROUTES_PATHS.ADMIN_USERS,
    component: Page.AdminUserManage,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000001: Mange roles
const PERM000001Routes = [
  {
    path: ROUTES_PATHS.ADMIN_ROLE,
    component: Page.AdminRole,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_ROLE_PERMISSION_ADD,
    component: Page.AdminRolePermissionAdd,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_ROLE_EDIT,
    component: Page.AdminRoleEdit,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000002: Manage tickets
const PERM000002Routes = [
  {
    path: "/admin/query/:type/:mode/:queryId?",
    component: Page.TicketQuery,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000003: Manage service items
const PERM000003Routes = [
  {
    path: "/createRequestType",
    component: Page.CreateRequestType,
    layout: Layout.CustomLayout,
  },
  {
    path: "/requestType/:id",
    component: Page.RequestType,
    layout: Layout.CustomLayout,
  },
  {
    path: "/viewRequestTypes",
    component: Page.ViewRequestTypes,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000004: Manage service categories
const PERM000004Routes = [
  {
    path: "/admin/setting/serviceCategories",
    component: Page.ServiceSettings,
    layout: Layout.CustomLayout,
  },
  {
    path: "/admin/setting/workflows",
    component: Page.ListWorkflow,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000005: Manage custom fields
const PERM000005Routes = [
  {
    path: "/updateCustomField/:id",
    component: Page.UpdateCustomField,
    layout: Layout.CustomLayout,
  },
  {
    path: "/viewCustomFields",
    component: Page.ViewCustomFields,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000006: Manage attachments
const PERM000006Routes = [];

//Route có Permission là PERM000007: Manage groups
const PERM000007Routes = [
  {
    path: ROUTES_PATHS.ADMIN_GROUPS,
    component: Page.AdminGroups,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_GROUPS_EDIT,
    component: Page.AdminGroupEdit,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000008: Manage service desk hours
const PERM000008Routes = [];

//Route có Permission là PERM000009 Manage services
const PERM000009Routes = [];

//Route có Permission là PERM000010 Manage service types
const PERM000010Routes = [];

//Route có Permission là PERM000011 Manage slametrics
const PERM000011Routes = [];

//Route có Permission là PERM000012 Manage slas
const PERM000012Routes = [
  { path: "/admin/sla", component: Page.SLA, layout: Layout.CustomLayout },
];

//Route có Permission là PERM000013 Manage workflows
const PERM000013Routes = [
  {
    path: "/admin/setting/workflows/:flowId",
    component: Page.ViewWorkflow,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000014 Manage workflow steps
const PERM000014Routes = [];

//Route có Permission là PERM000015 Manage yearly holiday list
const PERM000015Routes = [];

//Route có Permission là PERM000016 Manage business hours
const PERM000016Routes = [];

//Route có Permission là PERM000017 Manage comments
const PERM000017Routes = [];

//Route có Permission là PERM000018 Only Need Login
const PERM000018Routes = [
  {
    path: "/admin/ticket/:ticketId",
    component: Page.TicketDetail,
    layout: Layout.CustomLayout,
  },
  {
    path: "/admin/change/:changId",
    component: Page.ChangeDetail,
    layout: Layout.CustomLayout,
  },
  {
    path: "/admin/problem/:problemId",
    component: Page.ProblemDetail,
    layout: Layout.CustomLayout,
  },
  {
    path: "/admin/:typeTicket?/:queryId?",
    component: Page.ListTicket,
    layout: Layout.CustomLayout,
  },
  {
    path: "/viewRequestTypes",
    component: Page.ViewRequestTypes,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN,
    component: Page.Dashboard,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_TICKET,
    component: Page.AdminTicket,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_REPORT,
    component: Page.AdminReport,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_REPORT_PREVIEW,
    component: Page.AdminReportPreview,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_CHANGE,
    component: Page.AdminChange,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_PROBLEM,
    component: Page.AdminProblem,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_STATISTICS,
    component: Page.AdminStatistics,
    layout: Layout.CustomLayout,
  },
  {
    path: ROUTES_PATHS.ADMIN_SERVICE_REQUEST_REPORT,
    component: Page.AdminServiceRequestReport,
    layout: Layout.CustomLayout,
  },
];

//Route có Permission là PERM000019 Manage dashboard
const PERM000019Routes = [];

//Route có Permission là PERM000021 Manage changes
const PERM000020Routes = [];

//Route có Permission là PERM000022 Manage problems
const PERM000021Routes = [];
//
const loginRoutes = [
  { path: "/", component: Page.Home },
  { path: "/catalog", component: Page.Catalog },
  { path: "/createRequest/:id?", component: Page.CreateRequest },
  { path: "/detailRequest/:id", component: Page.DetailRequest },
  { path: "/viewRequests", component: Page.ViewRequests },
  {
    path: "/profile/:userId?",
    component: Page.Profile,
    layout: Layout.DefaultLayout,
  },
  { path: "/filterTicket", component: Page.FilterTicket },
  { path: "/notification", component: Page.Notification },
  {
    path: "/notificationAdmin",
    component: Page.Notification,
    layout: Layout.CustomLayout,
  },
];

export {
  publicRoutes,
  loginRoutes,
  PERM000000Routes,
  PERM000001Routes,
  PERM000002Routes,
  PERM000003Routes,
  PERM000004Routes,
  PERM000005Routes,
  PERM000006Routes,
  PERM000007Routes,
  PERM000008Routes,
  PERM000009Routes,
  PERM000010Routes,
  PERM000011Routes,
  PERM000012Routes,
  PERM000013Routes,
  PERM000014Routes,
  PERM000015Routes,
  PERM000016Routes,
  PERM000017Routes,
  PERM000018Routes,
  PERM000019Routes,
  PERM000020Routes,
  PERM000021Routes,
};
