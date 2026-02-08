import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import Avatar from "../@comp/Avatar";

const SidebarHeader = ({ onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="bg-green-200 rounded p-2 sticky top-0 shadow">
      <div className="flex gap-4 items-center">
        <Avatar profilePicture={user?.profilePicture} />
        <div className="text-sm flex flex-col">
          <span>{user?.name}</span>
          <div className="flex gap-4 items-center">
            <span>
              {user?.age || 20} {t("profile.age")}
            </span>
            <span className="font-medium text-green-500">
              Mode :{" "}
              {user?.activeMode === "careSeeker" ? "Care Seeker" : "Carer"}
            </span>
          </div>
        </div>
      </div>

      <Link
        onClick={onClose}
        to="/profile"
        className="text-center block w-full mt-4 p-2 text-sm rounded bg-green-100 hover:bg-green-300 hover:text-white shadow"
      >
        {t("profile.title")}
      </Link>
    </div>
  );
};

export default SidebarHeader;
