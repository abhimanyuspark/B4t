import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="p-8 pt-20 min-h-screen bg-gray-100 overflow-auto">
      <Outlet />
    </div>
  );
};

export default UserLayout;
