import { useTranslation } from "react-i18next";
import { footerNavigation } from "../../utils/initial";
import { Link, useLocation } from "react-router";

const Footer = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <div className="fixed z-30 bottom-0 left-0 w-full h-16 px-4 sm:px-8 bg-white border border-gray-200 flex items-center gap-2">
      <ul className="flex justify-between items-center w-full">
        {footerNavigation.map((item, index) => (
          <li key={index}>
            <Link
              to={item.href}
              style={
                pathname === item.href
                  ? { color: "oklch(62.7% 0.194 149.214)" }
                  : {}
              }
              className="text-gray-600 hover:text-green-600 flex items-center flex-col"
            >
              <span className="text-2xl">{item.icon()}</span>
              <span className="text-sm">{t(item.langCode)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
