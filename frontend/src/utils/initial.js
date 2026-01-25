import { FaAirbnb, FaHome, FaShoppingBag, FaUsers } from "react-icons/fa";

export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
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
