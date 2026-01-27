import { FaAirbnb, FaHome, FaShoppingBag, FaUsers } from "react-icons/fa";
import { FcHome, FcSupport } from "react-icons/fc";

export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
];

export const footerNavigation = [
  {
    name: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    name: "Add Flight",
    href: "/add-flight",
    icon: FaAirbnb,
  },
  {
    name: "Bookings",
    href: "/bookings",
    icon: FaShoppingBag,
  },
  {
    name: "Support",
    href: "/support",
    icon: FaUsers,
  },
];

export const sidebarNavigation = [
  {
    name: "Home",
    href: "/",
    icon: FcHome,
  },
  {
    name: "Support",
    href: "/support",
    icon: FcSupport,
  },
];
