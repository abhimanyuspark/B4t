import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { switchMode } from "../../redux/features/authSlice";
import { FcBusinessman } from "react-icons/fc";

const SwitchMode = ({ onClose, ...props }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const onSwitchMOde = () => {
    const mode =
      user?.activeMode === "careSeeker" ? "carer" : "careSeeker" || null;
    toast.promise(dispatch(switchMode(mode)).unwrap(), {
      loading: "Switching...",
      success: (res) => {
        return `Switch to ${res?.activeMode}`;
      },
      error: (err) => err,
    });
    onClose && onClose();
  };

  return (
    <button onClick={onSwitchMOde} {...props}>
      <FcBusinessman className="size-6" />
      <p className="first-letter:uppercase text-sm">
        {loading ? "Switching.." : user?.activeMode}
      </p>
    </button>
  );
};

export default SwitchMode;
