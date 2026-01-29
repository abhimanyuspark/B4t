import { Link } from "react-router";
import { FaBan } from "react-icons/fa";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import Container from "../../components/common/Container";

export default function Unauthorized() {
  const { t } = useTranslation();

  const onNavigate = () => {
    Swal.fire({
      icon: "warning",
      title: "Log Out first!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Container className="flex items-center justify-center">
      <div className="text-center max-w-md">
        <FaBan className="mx-auto text-red-500 text-6xl mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {t("errors.unauthorized.title")}
        </h1>
        <p className="text-gray-600 mb-6">{t("errors.unauthorized.text")}</p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {t("common.back_home")}
          </Link>
          <button
            onClick={onNavigate}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            {t("common.login")}
          </button>
        </div>
      </div>
    </Container>
  );
}
