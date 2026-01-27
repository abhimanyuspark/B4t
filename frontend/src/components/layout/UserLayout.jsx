import { Outlet } from "react-router";
import DSidebar from "../sidebar/DSidebar";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="bg-gray-100 flex w-full h-screen pt-16">
      {isAuthenticated && (
        <div className="shrink-0 sm:block hidden">
          <DSidebar />
        </div>
      )}
      <div className="flex-1 p-4 overflow-y-auto h-[calc(100vh-122px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
