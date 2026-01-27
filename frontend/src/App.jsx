import { Suspense, useEffect } from "react";
import {
  AdminDashboard,
  DashBoard,
  Login,
  NotFound,
  Profile,
  Register,
  UnAuthorized,
} from "./pages";
import { Routes, Route } from "react-router";
import PageLoader from "./components/common/PageLoader";
import NavBar from "./components/nav/NavBar";
import UserLayout from "./components/layout/UserLayout";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/@comp/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import { refreshAuth } from "./redux/features/authSlice";
import ProtectedRoute from "./components/@comp/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshAuth());
  }, [dispatch]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <ScrollToTop />

      <NavBar />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashBoard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      <Footer />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
