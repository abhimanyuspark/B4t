import { useTranslation } from "react-i18next";

const DashBoard = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 rounded bg-white shadow-2xl border border-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{t("welcome_message")}</h1>
    </div>
  );
};

export default DashBoard;
