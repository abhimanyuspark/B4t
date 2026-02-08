import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PageLoader from "../../../components/common/PageLoader";
import { FaCalendarAlt, FaPlane } from "react-icons/fa";
import { formateDate } from "../../../utils/support";
import { getMyBookings } from "../../../redux/features/bookingSlice";

const CareSeekerBookings = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { list, loading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);

  if (loading) {
    return <PageLoader />;
  }

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
          className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between"
        >
          {/* Left */}
          <div className="flex items-start gap-4">
            <FaPlane className="text-blue-600 text-2xl mt-1" />
            <div>
              <p className="text-sm text-gray-500">
                {t("bookings.booking_id")}: {booking?._id}
              </p>
              <h3 className="text-lg font-semibold text-gray-800">
                {booking?.travelPlanId?.origin} →{" "}
                {booking?.travelPlanId?.destination}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FaCalendarAlt />
                {formateDate(booking?.travelPlanId?.travelDate)}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                booking?.status === "OPEN"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {booking?.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CareSeekerBookings;
