import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../redux/features/authSlice";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { googleLogout } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onLogout = async () => {
    googleLogout();
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
    <button onClick={onLogout}>
      <FaSignOutAlt /> <span>{t("logout")}</span>
    </button>
  );
};

export default LogoutButton;
