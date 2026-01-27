import { lazy } from "react";

export const Login = lazy(() => import("./auth/Login"));
export const Register = lazy(() => import("./auth/Register"));
export const DashBoard = lazy(() => import("./dashboard/DashBoard"));
export const NotFound = lazy(() => import("./auth/NotFound"));
export const UnAuthorized = lazy(() => import("./common/UnAuthorized"));
export const Profile = lazy(() => import("./common/Profile"));
export const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
