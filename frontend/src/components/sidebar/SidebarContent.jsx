import { Link } from "react-router";
import { sidebarNavigation } from "../../utils/initial";
import { useTranslation } from "react-i18next";

const SidebarContent = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <ul className="flex gap-2 flex-col">
      {sidebarNavigation.map((s, index) => (
        <li key={index} onClick={onClose}>
          <Link
            to={s.href}
            className="flex gap-6 items-center p-2 rounded bg-gray-50 hover:bg-gray-100 shadow"
          >
            <span className="text-2xl">{s.icon()}</span>
            <span className="text-sm">{t(s.langCode)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarContent;
