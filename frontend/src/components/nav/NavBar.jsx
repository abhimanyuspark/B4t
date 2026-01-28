import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../@comp/LanguageSelect";
import MSidebar from "../sidebar/MSidebar";

const NavBar = () => {
  return (
    <nav className="bg-white fixed top-0 left-0 w-full h-16 z-40 border border-gray-100 flex items-center p-4 sm:p-8">
      <NavContent />
    </nav>
  );
};

const NavContent = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <MSidebar />
        <h1 className="text-xl font-bold">B4t</h1>
      </div>
      <div>
        {isAuthenticated ? (
          <ul className="flex space-x-4 items-center">
            <li>
              <LanguageSelect />
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
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
