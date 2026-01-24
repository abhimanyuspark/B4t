import { Suspense } from "react";
import { DashBoard, Login } from "./pages";
import { Routes, Route } from "react-router";
import PageLoader from "./components/common/PageLoader";
import NavBar from "./components/nav/NavBar";
import UserLayout from "./components/layout/UserLayout";

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <NavBar />

      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
