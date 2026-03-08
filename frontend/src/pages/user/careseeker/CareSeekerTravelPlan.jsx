import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlane,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import PageLoader from "../../../components/common/PageLoader";
import { formateDate } from "../../../utils/support";
import {
  getMyTravelPlans,
  payTravelPlan,
  setTravelPlanStatus,
} from "../../../redux/features/travelPlanSlice";
import MatchingCarers from "./MatchingCarers";
import { toast } from "react-hot-toast";
import { useSocket } from "../../../redux/context/SocketContext";

const STATUS_UI = {
  OPEN: {
    className: "bg-blue-100 text-blue-600",
    icon: <FaClock />,
  },
  MATCHED: {
    className: "bg-green-100 text-green-600",
    icon: <FaCheckCircle />,
  },
  COMPLETED: {
    className: "bg-purple-100 text-purple-600",
    icon: <FaCheckCircle />,
  },
  CANCELLED: {
    className: "bg-red-100 text-red-600",
    icon: <FaTimesCircle />,
  },
};

const CareSeekerTravelPlan = () => {
  const { t } = useTranslation();
  const { list, loading } = useSelector((state) => state.travelPlan);
  const dispatch = useDispatch();
  const socket = useSocket();

  const pay = async (travelPlanId) => {
    try {
      const result = await toast.promise(
        dispatch(payTravelPlan({ travelPlanId: travelPlanId })).unwrap(),
        {
          loading: "Redirecting to payment...",
          success: "Opening Stripe...",
          error: (err) => err || "Something went wrong",
        },
        { position: "top-center" },
      );

      window.location.href = result.url;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getMyTravelPlans());
  }, [dispatch]);

  useEffect(() => {
    socket.on("updateTravelPlanStatus", (data) => {
      toast.success("Travel Plan Status Updated");
      dispatch(setTravelPlanStatus(data));
    });

    return () => {
      socket.off("updateTravelPlanStatus");
    };
  }, []);

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
        {list.map((travel) => {
          const ui = STATUS_UI[travel.status];
          return (
            <div
              key={travel?._id}
              className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              {/* Left */}
              <div className="flex items-start gap-4">
                <FaPlane className="text-blue-600 text-2xl mt-1" />
                <div>
                  <p className="text-sm text-gray-500">
                    {t("bookings.booking_id")}: {travel?._id}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {travel?.origin} → {travel?.destination}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <FaCalendarAlt />
                    {formateDate(travel?.travelDate)}
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-col md:items-end gap-3 mt-4 md:mt-0">
                <span
                  key={travel?._id}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${ui.className}`}
                >
                  {ui.icon}
                  {travel?.status}
                </span>

                {travel?.paymentStatus === "PENDING" && (
                  <div>
                    <button
                      onClick={() => {
                        pay(travel?._id);
                      }}
                      className="px-3 py-1 rounded-2xl bg-orange-300 hover:bg-amber-400 cursor-pointer"
                    >
                      Payment
                    </button>
                  </div>
                )}

                {travel?.paymentStatus !== "PENDING" &&
                  travel.isCarerSelected === false && (
                    <MatchingCarers travelPlan={travel} />
                  )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareSeekerTravelPlan;
