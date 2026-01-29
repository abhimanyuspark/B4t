import { FaAirbnb, FaHome, FaShoppingBag, FaUsers } from "react-icons/fa";
import { FcHome, FcSupport } from "react-icons/fc";

export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
];

export const footerNavigation = [
  {
    name: "Home",
    href: "/",
    langCode: "dashboard.title",
    icon: FaHome,
  },
  {
    name: "Add Flight",
    href: "/add-flight",
    langCode: "flights.title",
    icon: FaAirbnb,
  },
  {
    name: "Bookings",
    href: "/bookings",
    langCode: "bookings.title",
    icon: FaShoppingBag,
  },
  {
    name: "Support",
    href: "/support",
    langCode: "support.title",
    icon: FaUsers,
  },
];

export const sidebarNavigation = [
  {
    name: "Home",
    href: "/",
    langCode: "dashboard.title",
    icon: FcHome,
  },
  {
    name: "Support",
    href: "/support",
    langCode: "support.title",
    icon: FcSupport,
  },
];
