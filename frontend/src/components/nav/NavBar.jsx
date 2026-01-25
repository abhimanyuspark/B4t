import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../redux/features/authSlice";
import { toast } from "react-hot-toast";
import Select from "../common/Select";
import { languages } from "../../utils/initial";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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

const LanguageSelect = () => {
  const [option, setOption] = useState(languages[0]);
  const { i18n } = useTranslation();

  const handleLanguageChange = (selectedOption) => {
    setOption(selectedOption);
    i18n.changeLanguage(selectedOption?.code);
  };

  return (
    <Select
      text={(opt) => opt?.name}
      options={languages}
      value={option}
      className="w-30"
      onChange={handleLanguageChange}
    />
  );
};

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onLogout = async () => {
    await toast.promise(dispatch(logout()).unwrap(), {
      loading: "Logging out...",
      success: () => {
        navigate("/login");
        return "Logged out successfully!";
      },
      error: (err) => `Logout failed: ${err}`,
    });
  };

  return (
    <button className="link-gray-btn" onClick={onLogout}>
      <FaSignOutAlt /> {t("logout")}
    </button>
  );
};

export default NavBar;
