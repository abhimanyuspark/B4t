import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatchingCarers,
  setList,
} from "../../../redux/features/carerAvailabilitySlice";
import { toast } from "react-hot-toast";
import Loading from "../../../components/common/Loading";
import { FaPlaneDeparture, FaCalendarAlt } from "react-icons/fa";
import Hr from "../../../components/common/Hr";
import { createBooking } from "../../../redux/features/bookingSlice";
import { setCarerSelected } from "../../../redux/features/travelPlanSlice";
import Avatar from "../../../components/@comp/Avatar";

export default function MatchingCarers({ travelPlan }) {
  const dispatch = useDispatch();
  // const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const { list, loading } = useSelector((state) => state.carerAvailability);

  useEffect(() => {
    if (!travelPlan) return;
    // if (list?.length > 0) return;

    dispatch(getMatchingCarers(travelPlan?._id));
  }, [travelPlan, dispatch]);

  const onChange = (e) => {
    setOpen(false);
    toast.promise(
      dispatch(
        createBooking({
          travelPlanId: travelPlan?._id,
          carerAvailabilityId: e._id,
        }),
      ).unwrap(),
      {
        loading: "Booking...",
        success: "Booking Succesful",
        error: (err) => err,
      },
    );
    dispatch(setCarerSelected({ _id: travelPlan?._id }));
    dispatch(setList({ _id: e._id }));
  };

  return (
    <div>
      <p
        onClick={() => setOpen(!open)}
        className="px-4 py-1 font-medium text-gray-500 border border-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
      >
        Select Carer
      </p>

      <div
        style={{
          right: open ? "0" : "-100%",
        }}
        onClick={() => {
          setOpen(false);
        }}
        className="fixed top-0 transition-all size-full pt-0 sm:pt-16.5 z-50 flex justify-end"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-full overflow-auto z-50 w-80 bg-white shadow-2xl border border-gray-300 flex gap-2 flex-col p-2"
        >
          <h1 className="text-2xl font-semibold">Available Carers</h1>

          <Hr />

          {loading && (
            <div className="flex items-center justify-center size-full">
              <Loading />
            </div>
          )}

          {!loading && list?.length === 0 && (
            <div className="flex items-center justify-center size-full">
              -- No data found --
            </div>
          )}

          {!loading &&
            list?.length > 0 &&
            list.map((l, index) => (
              <FlightCard key={index} flight={l} onChange={() => onChange(l)} />
            ))}
        </div>
      </div>
    </div>
  );
}

function FlightCard({ flight, onChange }) {
  return (
    <div
      onClick={onChange}
      className="bg-white rounded-lg shadow p-4 flex gap-4 items-start hover:shadow-md hover:bg-gray-100 cursor-pointer transition"
    >
      {/* Profile Image */}
      {/* <img
        src={flight?.carerId?.profilePicture}
        alt={flight?.carerId?.name}
        className="w-14 h-14 rounded-full object-cover border"
      /> */}
      <Avatar size={50} profilePicture={flight?.carerId?.profilePicture} />

      {/* Main Info */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">
              {flight?.carerId?.name}
            </h3>
            <p className="text-xs text-gray-500">{flight?.carerId?.email}</p>
          </div>

          {/* Status */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              flight?.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {flight?.status}
          </span>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <FaPlaneDeparture />
          <span>{flight?.origin}</span>
          <span className="text-gray-400">→</span>
          <span>{flight?.destination}</span>
          <span className="text-xs text-gray-400 ml-2">
            ({flight?.flightNumber})
          </span>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FaCalendarAlt />
            {new Date(flight?.availableDate).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
