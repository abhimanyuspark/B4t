import { Outlet } from "react-router";
import DSidebar from "../sidebar/DSidebar";
import Footer from "../footer/Footer";
import NavBar from "../nav/NavBar";

const UserLayout = () => {
  return (
    <div>
      <NavBar />

      <div className="bg-gray-100 flex w-full h-screen pt-16">
        <div className="shrink-0 w-70 bg-white text-gray-700 p-2 sm:block hidden overflow-y-auto h-[calc(100vh-122px)]">
          <DSidebar />
        </div>

        <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-122px)]">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserLayout;
