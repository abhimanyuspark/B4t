import { Suspense } from "react";
import { DashBoard, Login, NotFound, Register } from "./pages";
import { Routes, Route } from "react-router";
import PageLoader from "./components/common/PageLoader";
import NavBar from "./components/nav/NavBar";
import UserLayout from "./components/layout/UserLayout";
import { Toaster } from "react-hot-toast";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/@comp/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />

      <NavBar />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<UserLayout />}>
            <Route path="/" element={<DashBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
