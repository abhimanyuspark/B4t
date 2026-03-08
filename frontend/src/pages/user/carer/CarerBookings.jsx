import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PageLoader from "../../../components/common/PageLoader";
import {
  FaCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaComments,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";
import { formateDate } from "../../../utils/support";
import {
  getMyBookings,
  acceptBooking,
  rejectBooking,
} from "../../../redux/features/bookingSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Avatar from "../../../components/@comp/Avatar";

const CarerBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { list, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  if (loading) return <PageLoader />;

  const onAccept = (id) => {
    toast.promise(dispatch(acceptBooking(id)).unwrap(), {
      loading: "Accepting booking...",
      success: "Booking accepted successfully",
      error: (err) => err,
    });
  };

  const onReject = (id) => {
    toast.promise(dispatch(rejectBooking(id)).unwrap(), {
      loading: "Rejecting booking...",
      success: "Booking rejected successfully",
      error: (err) => err,
    });
  };

  const openChat = (booking) => {
    navigate(`/chat/${booking._id}`, {
      state: {
        careSeeker: booking?.careseekerId?._id,
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {list?.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-600 text-lg">{t("bookings.no_bookings")}</p>
        </div>
      )}

      {list?.map((booking) => (
        <div
          key={booking?._id}
          className="w-full bg-green-300 rounded-md shadow hover:shadow-xl transition-all duration-300 p-6"
        >
          <div className="flex flex-col justify-between gap-6">
            {/* LEFT SECTION */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Booking ID */}
              <p className="text-green-700">
                {t("bookings.booking_id")}: {booking?._id}
              </p>

              {/* Route */}
              <div className="flex items-center justify-between p-4 text-lg font-semibold text-gray-800">
                <div className="text-2xl flex items-center flex-col">
                  <FaPlaneDeparture className="text-gray-500 text-4xl" />
                  <span>{booking?.travelPlanId?.origin}</span>
                </div>

                <span className="text-5xl">
                  <IoAirplane />
                </span>

                <div className="text-2xl flex items-center flex-col">
                  <FaPlaneArrival className="text-gray-500 text-4xl" />
                  <span>{booking?.travelPlanId?.destination}</span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600">
                <FaCalendarAlt />
                {formateDate(booking?.travelPlanId?.travelDate)}
              </div>

              {/* Careseeker Info */}
              <div className="flex items-center gap-3 mt-2">
                <Avatar
                  size={50}
                  profilePicture={booking?.careseekerId?.profilePicture}
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {booking?.careseekerId?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking?.careseekerId?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-between gap-4">
              {/* Status */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  booking?.status === "PENDING_CARER_ACCEPTANCE"
                    ? "bg-yellow-100 text-yellow-700"
                    : booking?.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : booking?.status === "REJECTED"
                    ? "bg-red-100 text-red-700"
                    : booking?.status === "COMPLETED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {booking?.status}
              </span>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {booking?.status === "PENDING_CARER_ACCEPTANCE" && (
                  <>
                    <button
                      onClick={() => onAccept(booking?._id)}
                      className="px-4 py-1 rounded-full flex gap-2 items-center text-green-700 bg-green-100 font-semibold cursor-pointer"
                    >
                      <FaCheckCircle />
                      Accept
                    </button>
                    <button
                      onClick={() => onReject(booking?._id)}
                      className="px-4 py-1 rounded-full flex gap-2 items-center text-red-700 bg-red-100 font-semibold cursor-pointer"
                    >
                      <FaTimes />
                      Reject
                    </button>
                  </>
                )}

                <button
                  onClick={() => openChat(booking)}
                  className="px-4 py-1 rounded-full flex gap-2 items-center text-green-700 bg-green-100 font-semibold cursor-pointer"
                >
                  <FaComments />
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarerBookings;
