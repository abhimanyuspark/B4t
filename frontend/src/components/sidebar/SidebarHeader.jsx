import { useSelector } from "react-redux";
import { Link } from "react-router";

const SidebarHeader = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-green-100 rounded p-2 sticky top-0 shadow">
      <div className="flex gap-4 items-center">
        <div className="size-12 rounded-full bg-green-300 border-2 border-white">
          {user?.profilePic && <img src={user?.profilePic} alt={user?.name} />}
        </div>
        <div className="text-sm text-gray-500 flex flex-col">
          <span>{user?.name}</span>
          <span>{user?.age || 20} Age</span>
        </div>
      </div>

      <Link
        to="/profile"
        className="text-center block w-full mt-2 p-1 text-sm rounded bg-green-50 hover:bg-green-200"
      >
        Profile
      </Link>
    </div>
  );
};

export default SidebarHeader;
