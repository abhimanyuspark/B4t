import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlane,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import PageLoader from "../../../components/common/PageLoader";
import { formateDate } from "../../../utils/support";
import { getMyTravelPlans } from "../../../redux/features/travelPlanSlice";
import MatchingCarers from "./MatchingCarers";

const CareSeekerBookings = () => {
  const { t } = useTranslation();
  const { list, loading } = useSelector((state) => state.travelPlan);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyTravelPlans());
  }, [dispatch]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div>
      {/* Empty State */}
      {list?.length === 0 && (
        <div className="bg-white rounded shadow p-10 text-center">
          <p className="text-gray-600">{t("bookings.no_bookings")}</p>
        </div>
      )}
      {/* Booking Cards */}
      <div className="space-y-4">
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
                  {booking?.origin} → {booking?.destination}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <FaCalendarAlt />
                  {formateDate(booking?.travelDate)}
                </div>
              </div>
            </div>

            <MatchingCarers travelPlan={booking} />

            {/* Right */}
            <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  booking?.status === "OPEN"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {booking?.status === "OPEN" ? (
                  <FaCheckCircle />
                ) : (
                  <FaTimesCircle />
                )}
                {booking?.status}
              </span>

              {/* <p className="font-bold text-blue-600">₹{booking?.budget}</p> */}

              <div className="flex gap-3">
                <button className="px-4 py-1.5 border rounded hover:bg-gray-100">
                  {t("common.view")}
                </button>

                {booking?.status === "OPEN" && (
                  <button className="px-4 py-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                    {t("common.cancel")}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareSeekerBookings;
