import {
  FaEnvelope,
  FaQuestionCircle,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";

export default function Support() {
  const { t } = useTranslation();

  return (
    <Container className="bg-gray-50!">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t("support.title")} 🤝
        </h1>
        <p className="text-gray-600 mb-8">{t("support.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Contact Form */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              {t("support.contact_title")}
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Booking Issue</option>
                <option>Payment Problem</option>
                <option>Account Issue</option>
                <option>Other</option>
              </select>
              <textarea
                rows="4"
                placeholder="Describe your issue..."
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <Button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                <FaPaperPlane />
                {t("support.send")}
              </Button>
            </form>
          </div>

          {/* Right: FAQs & Info */}
          <div className="space-y-6">
            {/* FAQ */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaQuestionCircle className="text-green-600" />
                {t("support.faq_title")}
              </h2>

              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>How do I cancel a booking?</strong>
                  <p className="text-sm text-gray-600">
                    Go to Bookings → Select booking → Cancel.
                  </p>
                </li>
                <li>
                  <strong>Can I edit my trip?</strong>
                  <p className="text-sm text-gray-600">
                    Yes, from Dashboard → My Trips.
                  </p>
                </li>
                <li>
                  <strong>When will I get a refund?</strong>
                  <p className="text-sm text-gray-600">
                    Refunds are processed within 5–7 business days.
                  </p>
                </li>
              </ul>
            </div>

            {/* Support Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaClock className="text-purple-600" />
                Support Info
              </h2>

              <p className="text-gray-700 mb-2">
                📧 {t("support.email")}: support@travelwithbuddy.com
              </p>
              <p className="text-gray-700">⏱️ {t("support.response_time")}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
