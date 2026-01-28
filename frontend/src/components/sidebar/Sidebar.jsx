import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import LogoutButton from "../@comp/LogoutButton";

const Sidebar = ({ onClose }) => {
  return (
    <div className="flex gap-4 flex-col">
      <SidebarHeader onClose={onClose} />

      <hr className="border border-gray-100" />

      <SidebarContent onClose={onClose} />

      <hr className="border border-gray-100" />

      <div className="side-logout-btn">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
