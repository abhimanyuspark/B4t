import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import LogoutButton from "../@comp/LogoutButton";

const Sidebar = () => {
  return (
    <div className="flex gap-4 flex-col">
      <SidebarHeader />

      <hr className="border border-gray-100" />

      <SidebarContent />

      <hr className="border border-gray-100" />

      <div className="side-logout-btn">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
