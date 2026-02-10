import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router";

const NotificationButton = () => {
  return (
    <Link
      to="/notification"
      className="px-2 py-2.5 border block rounded-lg border-gray-300 text-sm"
    >
      <FaRegBell className="text-xl" />
    </Link>
  );
};

export default NotificationButton;
