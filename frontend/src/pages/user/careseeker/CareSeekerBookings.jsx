import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PageLoader from "../../../components/common/PageLoader";
import {
  FaCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaComments,
} from "react-icons/fa";
import { IoAirplane } from "react-icons/io5";
import { formateDate } from "../../../utils/support";
import {
  getMyBookings,
  setBookingStatus,
} from "../../../redux/features/bookingSlice";
import { useSocket } from "../../../redux/context/SocketContext";
import { toast } from "react-hot-toast";
import Avatar from "../../../components/@comp/Avatar";
import { useNavigate } from "react-router";

const CareSeekerBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { list, loading } = useSelector((state) => state.bookings);
  const socket = useSocket();

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  useEffect(() => {
    socket.on("updateBookingStatus", (data) => {
      toast.success("Booking Status Updated");
      dispatch(setBookingStatus(data));
    });

    return () => {
      socket.off("updateBookingStatus");
    };
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const openChat = (booking) => {
    navigate(`/chat/${booking._id}`, {
      state: {
        carer: booking?.carerId?._id,
      },
    });
  };

  return (
    <div className="flex gap-4 flex-col">
      {list?.length === 0 && (
        <div className="bg-white rounded shadow p-10 text-center">
          <p className="text-gray-600">{t("bookings.no_bookings")}</p>
        </div>
      )}

      {list.map((booking) => (
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
                  profilePicture={booking?.carerId?.profilePicture}
                />
                <div>
                  <p className="font-medium text-gray-800">
                    {booking?.carerId?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking?.carerId?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-between gap-4">
              {/* Status */}
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  booking?.status === "OPEN"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {booking?.status}
              </span>

              {/* Action Buttons */}
              <div className="flex gap-3">
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

export default CareSeekerBookings;
