import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import LogoutButton from "../@comp/LogoutButton";
import Hr from "../common/Hr";
import SwitchMode from "../@comp/SwitchMode";

const Sidebar = ({ onClose }) => {
  return (
    <div className="flex flex-col">
      <SidebarHeader onClose={onClose} />

      <Hr />

      <SidebarContent onClose={onClose} />

      <Hr />

      <div className="side-logout-btn *:justify-start!">
        <SwitchMode onClose={onClose} />
      </div>

      <Hr />

      <div className="side-logout-btn">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
