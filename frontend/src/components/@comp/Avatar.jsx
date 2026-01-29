import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const sizes = {
  sm: { p: "text-4xl size-12", c: "mt-1" },
  md: { p: "text-6xl size-20", c: "mt-2" },
  lg: { p: "text-8xl size-28", c: "mt-3" },
};

const Avatar = ({ size = "sm" }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`${sizes[size].p} rounded-full bg-green-200 border-2 border-white overflow-hidden`}
    >
      {user?.profilePic ? (
        <img src={user?.profilePic} alt={user?.name} />
      ) : (
        <div
          className={`${sizes[size].c} text-white flex justify-center items-center h-full`}
        >
          <FaUser />
        </div>
      )}
    </div>
  );
};

export default Avatar;
