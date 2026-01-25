import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="p-4 sm:px-8 py-20 sm:py-22 min-h-screen bg-gray-100 overflow-auto">
      <Outlet />
    </div>
  );
};

export default UserLayout;
