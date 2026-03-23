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
  const [open, setOpen] = useState(false);

  const { list, loading } = useSelector((state) => state.carerAvailability);

  useEffect(() => {
    if (!open) return;
    if (!travelPlan?._id) return;

    dispatch(getMatchingCarers(travelPlan._id));
  }, [open, travelPlan, dispatch]);

  useEffect(() => {
    if (!open) {
      dispatch(setList([]));
    }
  }, [open, dispatch]);

  const onChange = (carerAvailability) => {
    setOpen(false);

    toast.promise(
      dispatch(
        createBooking({
          travelPlanId: travelPlan?._id,
          carerAvailabilityId: carerAvailability._id,
        }),
      ).unwrap(),
      {
        loading: "Booking...",
        success: "Booking Successful",
        error: (err) => err,
      },
    );

    dispatch(setCarerSelected({ _id: travelPlan?._id }));
    dispatch(setList({ _id: carerAvailability._id }));
  };

  return (
    <div>
      {/* OPEN BUTTON */}
      <p
        onClick={() => setOpen(true)}
        className="px-4 py-1 font-medium text-gray-500 border border-gray-200 rounded-full hover:bg-gray-300 cursor-pointer"
      >
        Select Carer
      </p>

      {/* OVERLAY */}
      <div
        style={{ right: open ? "0" : "-100%" }}
        onClick={() => setOpen(false)}
        className="fixed top-0 transition-all size-full pt-0 sm:pt-16.5 z-50 flex justify-end"
      >
        {/* DRAWER */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-full overflow-auto w-100 bg-white shadow-2xl border border-gray-300 flex flex-col gap-2 p-2"
        >
          <h1 className="text-2xl font-semibold">Available Carers</h1>

          <Hr />

          {/* LOADING */}
          {loading && (
            <div className="flex items-center justify-center size-full">
              <Loading />
            </div>
          )}

          {/* EMPTY */}
          {!loading && list?.length === 0 && (
            <div className="flex items-center justify-center size-full text-gray-400">
              -- No data found --
            </div>
          )}

          {/* LIST */}
          {!loading &&
            list?.length > 0 &&
            list.map((item) => (
              <CarerCard
                key={item._id}
                carer={item}
                onSelect={() => onChange(item)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function CarerCard({ carer, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg shadow p-4 flex gap-4 items-start hover:shadow-md hover:bg-gray-100 cursor-pointer transition"
    >
      <Avatar size={60} profilePicture={carer?.carerId?.profilePicture} />

      <div className="flex-1">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 text-clip whitespace-nowrap overflow-hidden">
              {carer?.carerId?.name}
            </h3>
            <p className="text-xs text-gray-500 text-clip whitespace-nowrap overflow-hidden">{carer?.carerId?.email}</p>
          </div>

          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              carer?.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {carer?.status}
          </span>
        </div>

        {/* ROUTE */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
          <FaPlaneDeparture />
          <span>{carer?.origin}</span>
          <span className="text-gray-400">→</span>
          <span>{carer?.destination}</span>
          <span className="text-xs text-gray-400 ml-2">
            ({carer?.flightNumber})
          </span>
        </div>

        {/* DATE */}
        <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
          <FaCalendarAlt />
          {new Date(carer?.availableDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
