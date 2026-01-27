import { useSelector } from "react-redux";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../@comp/LanguageSelect";
import LogoutButton from "../@comp/LogoutButton";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 p-4 right-0 mx-auto px-4 sm:px-6 lg:px-8 z-50">
      <NavContent />
    </nav>
  );
};

const NavContent = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="shrink-0">
        <h1 className="text-xl font-bold">MyApp</h1>
      </div>
      <div>
        {isAuthenticated ? (
          <ul className="flex space-x-4 items-center">
            <li>
              <span
                style={{ alignItems: "start", gap: "0px", fontSize: "0.8rem" }}
                className="link-gray-btn flex-col"
              >
                <span>{user?.name}</span>
                <span className="first-letter:uppercase">{user?.role}</span>
              </span>
            </li>
            <li>
              <LogoutButton />
            </li>
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
