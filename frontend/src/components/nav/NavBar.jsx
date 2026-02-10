import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../@comp/LanguageSelect";
import MSidebar from "../sidebar/MSidebar";
import { FaPlaneDeparture } from "react-icons/fa";
import Location from "../@comp/Location";
import NotificationButton from "../@comp/NotificationButton";

const NavBar = () => {
  return (
    <nav className="bg-white fixed top-0 left-0 w-full h-16 z-40 border border-gray-100 flex items-center p-2 sm:p-8">
      <NavContent />
    </nav>
  );
};

const NavContent = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center sm:gap-0 gap-2">
        <MSidebar />
        <h1 className="text-2xl font-bold">B4t</h1>
        <FaPlaneDeparture className="text-green-600 text-4xl ml-0 sm:ml-4" />
      </div>
      <div>
        {isAuthenticated ? (
          <ul className="flex gap-2 sm:gap-4 items-center">
            <li>
              <Location />
            </li>
            <li>
              <LanguageSelect />
            </li>
            <li>
              <NotificationButton />
            </li>
          </ul>
        ) : (
          <ul className="flex gap-2 sm:gap-4">
            <li>
              <Link to="/login" className="link-gray-btn">
                {t("login")}
              </Link>
            </li>
            <li>
              <Link to="/register" className="link-gray-btn">
                {t("register")}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
