import Container from "../../components/common/Container";
import { useTranslation } from "react-i18next";
import CareSeekerBookings from "./careseeker/CareSeekerBookings";
import { useSelector } from "react-redux";
import CarerBookings from "./carer/CarerBookings";

export default function Bookings() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

  return (
    <Container>
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {t("bookings.title")} 📑
      </h1>

      {user?.activeMode === "careSeeker" ? (
        <CareSeekerBookings />
      ) : (
        <CarerBookings />
      )}
    </Container>
  );
}
