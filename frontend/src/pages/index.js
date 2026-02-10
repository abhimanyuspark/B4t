import { lazy } from "react";

export const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));

export const Login = lazy(() => import("./auth/Login"));
export const Register = lazy(() => import("./auth/Register"));

export const DashBoard = lazy(() => import("./user/DashBoard"));
export const Add_Flight = lazy(() => import("./user/Add_Flight"));
export const Bookings = lazy(() => import("./user/Bookings"));
export const Support = lazy(() => import("./user/Support"));

export const NotFound = lazy(() => import("./common/NotFound"));
export const UnAuthorized = lazy(() => import("./common/UnAuthorized"));
export const Profile = lazy(() => import("./common/Profile"));
export const Notification = lazy(
  () => import("./user/notification/Notification"),
);
