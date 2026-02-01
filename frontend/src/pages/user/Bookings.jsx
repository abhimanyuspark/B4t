import {
  FaPlane,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Container from "../../components/common/Container";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyBookings,
  fetchOpenBookings,
} from "../../redux/features/bookingSlice";

const bookings = [
  {
    id: "BK001",
    type: "Flight",
    route: "Delhi → Mumbai",
    date: "2026-02-12",
    price: "₹4,999",
    status: "confirmed",
  },
  {
    id: "BK002",
    type: "Trip",
    route: "Bangalore → Goa",
    date: "2026-03-05",
    price: "₹12,500",
    status: "cancelled",
  },
];

export default function Bookings() {
  const { t } = useTranslation();
  const { list } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  console.log(list);

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  return (
    <Container>
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("bookings.title")} 📑
      </h1>

      {/* Empty State */}
      {bookings.length === 0 && (
        <div className="bg-white rounded shadow p-10 text-center">
          <p className="text-gray-600">{t("bookings.no_bookings")}</p>
        </div>
      )}

      {/* Booking Cards */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            {/* Left */}
            <div className="flex items-start gap-4">
              <FaPlane className="text-blue-600 text-2xl mt-1" />
              <div>
                <p className="text-sm text-gray-500">
                  {t("bookings.booking_id")}: {booking.id}
                </p>
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking.route}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <FaCalendarAlt />
                  {booking.date}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === "confirmed"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {booking.status === "confirmed" ? (
                  <FaCheckCircle />
                ) : (
                  <FaTimesCircle />
                )}
                {t(`bookings.${booking.status}`)}
              </span>

              <p className="font-bold text-blue-600">{booking.price}</p>

              <div className="flex gap-3">
                <button className="px-4 py-1.5 border rounded hover:bg-gray-100">
                  {t("common.view")}
                </button>

                {booking.status === "confirmed" && (
                  <button className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                    {t("common.cancel")}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
