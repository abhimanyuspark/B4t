import { Suspense, useEffect } from "react";
import {
  Add_Flight,
  AdminDashboard,
  Bookings,
  DashBoard,
  Login,
  NotFound,
  Profile,
  Register,
  Support,
  UnAuthorized,
} from "./pages";
import { Routes, Route } from "react-router";
import PageLoader from "./components/common/PageLoader";
import UserLayout from "./components/layout/UserLayout";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/@comp/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { getGeoLocation, refreshAuth } from "./redux/features/authSlice";
import ProtectedRoute from "./components/@comp/ProtectedRoute";
import Layout from "./components/layout/Layout";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getGeoLocation());
    dispatch(refreshAuth());
  }, [dispatch]);

  return (
    <>
      {loading && <PageLoader />}
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<UserLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashBoard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-flight" element={<Add_Flight />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/support" element={<Support />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
