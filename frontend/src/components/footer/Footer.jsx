import { footerNavigation } from "../../utils/initial";
import { Link, useLocation } from "react-router";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed z-50 bottom-0 left-0 w-full bg-white border border-gray-200 px-8 py-2 flex items-center gap-2 top-shadow">
      <ul className="flex justify-between items-center w-full">
        {footerNavigation.map((item, index) => (
          <li key={index}>
            <Link
              to={item.href}
              style={pathname === item.href ? { color: "green" } : {}}
              className="text-gray-600 hover:text-gray-800 flex items-center flex-col"
            >
              <span className="text-2xl">{item.icon()}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
