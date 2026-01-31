import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  getGeoLocation,
  updateUserLocation,
} from "../../redux/features/authSlice";
import { toast } from "react-hot-toast";

const Location = () => {
  const { location, geoLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onLocate = () => {
    if (!location) {
      toast.promise(
        dispatch(updateUserLocation()).unwrap(),
        {
          loading: "Locating...",
          success: "Located",
          error: (err) => err,
        },
        { position: "bottom-center" },
      );
    }
  };

  return (
    <div
      onClick={onLocate}
      className={`${location === null ? "border-gray-300" : "border-green-600 cursor-pointer"} px-1.5 py-2 sm:px-3 rounded-md border flex gap-1 sm:gap-2 items-center`}
    >
      <FaLocationDot className="text-green-500 text-xl" />
      <span className="font-normal">
        {geoLoading ? "Locating..." : location?.city || "No Location Find"}
      </span>
    </div>
  );
};

export default Location;
