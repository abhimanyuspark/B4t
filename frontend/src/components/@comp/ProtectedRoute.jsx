import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.auth);

  if (loading) {
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles?.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
