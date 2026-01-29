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
    langCode: "home.name",
    icon: FaHome,
  },
  {
    name: "Add Flight",
    href: "/add-flight",
    langCode: "add_flight.name",
    icon: FaAirbnb,
  },
  {
    name: "Bookings",
    href: "/bookings",
    langCode: "bookings.name",
    icon: FaShoppingBag,
  },
  {
    name: "Support",
    href: "/support",
    langCode: "support.name",
    icon: FaUsers,
  },
];

export const sidebarNavigation = [
  {
    name: "Home",
    href: "/",
    langCode: "home.name",
    icon: FcHome,
  },
  {
    name: "Support",
    href: "/support",
    langCode: "support.name",
    icon: FcSupport,
  },
];
