import { Outlet } from "react-router";
import DSidebar from "../sidebar/DSidebar";
import Footer from "../footer/Footer";
import NavBar from "../nav/NavBar";

const UserLayout = () => {
  return (
    <div>
      <NavBar />

      <main className="bg-gray-100 flex w-full min-h-screen py-16">
        <div className="shrink-0 w-70 bg-white fixed top-16 h-full text-gray-700 p-2 pb-34 sm:block hidden overflow-auto scroll-smooth">
          <DSidebar />
        </div>

        <div className="flex-1 p-4 scroll-smooth overflow-y-auto sm:pl-75 inset-shadow-sm inset-shadow-gray-400">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserLayout;
