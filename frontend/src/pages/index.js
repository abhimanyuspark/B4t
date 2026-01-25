import { lazy } from "react";

export const Login = lazy(() => import("./auth/Login"));
export const Register = lazy(() => import("./auth/Register"));
export const DashBoard = lazy(() => import("./dashboard/DashBoard"));
export const NotFound = lazy(() => import("./auth/NotFound"));
