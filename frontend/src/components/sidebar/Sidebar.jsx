import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import LogoutButton from "../@comp/LogoutButton";
import Hr from "../common/Hr";
import SwitchMode from "../@comp/SwitchMode";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router";

const Sidebar = ({ onClose }) => {
  return (
    <div className="flex flex-col">
      <SidebarHeader onClose={onClose} />

      <Hr />

      <SidebarContent onClose={onClose} />

      <Hr />

      <div className="side-logout-btn">
        <SwitchMode className="justify-start! gap-6!" onClose={onClose} />
      </div>

      <Hr />

      <Link to="/settings" className="side-logout-btn">
        <button className="justify-start! gap-6!">
          <FaGear className="text-xl" /> Settings
        </button>
      </Link>

      <Hr />

      <div className="side-logout-btn">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
