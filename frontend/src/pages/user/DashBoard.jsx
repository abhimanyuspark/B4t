import {
  FaPlane,
  FaSuitcaseRolling,
  FaComments,
  FaPlusCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Container from "../../components/common/Container";

export default function DashboardHome() {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  return (
    <Container className="bg-gray-50!">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {t("common.welcome_message")}, {user?.name || "Traveler"} 👋
      </h1>
      <p className="text-gray-600 mb-8">{t("dashboard.subtitle")}</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* <StatCard
          icon={<FaSuitcaseRolling />}
          title={t("dashboard.stats.trips")}
          value="4"
          color="blue"
        /> */}
        <StatCard
          icon={<FaPlane />}
          title={t("dashboard.stats.bookings")}
          value="6"
          color="green"
        />
        <StatCard
          icon={<FaComments />}
          title={t("dashboard.stats.messages")}
          value="2"
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {t("dashboard.quick_actions.title")}
        </h2>

        <div className="flex flex-wrap gap-4">
          {/* <QuickAction
            to="/dashboard/create-trip"
            icon={<FaPlusCircle />}
            label={t("dashboard.quick_actions.create_trip")}
          /> */}
          <QuickAction
            to="/add-flight"
            icon={<FaPlane />}
            label={t("dashboard.quick_actions.book_flight")}
          />
          <QuickAction
            to="/bookings"
            icon={<FaSuitcaseRolling />}
            label={t("dashboard.quick_actions.my_bookings")}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {t("dashboard.recent_activity.title")}
        </h2>

        <ul className="space-y-4">
          <li className="flex justify-between text-gray-700">
            <span>
              ✈️ {t("dashboard.recent_activity.flight_booked")}: Delhi → Mumbai
            </span>
            <span className="text-sm text-gray-500">2 days ago</span>
          </li>
          <li className="flex justify-between text-gray-700">
            <span>
              🧳 {t("dashboard.recent_activity.trip_created")}: Goa Beach Trip
            </span>
            <span className="text-sm text-gray-500">5 days ago</span>
          </li>
        </ul>
      </div>
    </Container>
  );
}

/* ---------- Components ---------- */

function StatCard({ icon, title, value, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center gap-4">
      <div className={`p-4 rounded-full text-2xl ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function QuickAction({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-5 py-3 border rounded-lg hover:bg-gray-50"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
