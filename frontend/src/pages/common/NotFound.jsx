import { Link } from "react-router";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Container from "../../components/common/Container";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Container className="flex items-center justify-center">
      <div className="text-center max-w-md">
        <FaMapMarkedAlt className="mx-auto text-green-500 text-6xl mb-4" />
        <h1 className="text-5xl font-bold text-green-800 mb-2">
          {t("errors.error_404.title")}
        </h1>
        <p className="text-gray-600 mb-6">{t("errors.error_404.text")}</p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {t("common.back_home")}
        </Link>
      </div>
    </Container>
  );
}
