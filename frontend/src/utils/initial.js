import { FaAirbnb, FaHome, FaShoppingBag, FaUsers } from "react-icons/fa";
import { FcHome, FcSupport } from "react-icons/fc";

export const languages = [
  {
    code: "en",
    name: "English",
    country: "United States",
    currency: {
      code: "USD",
      name: "US Dollar",
      symbol: "$",
    },
  },
  {
    code: "hi",
    name: "Hindi",
    country: "India",
    currency: {
      code: "INR",
      name: "Indian Rupee",
      symbol: "₹",
    },
  },
  {
    code: "fr",
    name: "French",
    country: "France",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€",
    },
  },
  {
    code: "de",
    name: "German",
    country: "Germany",
    currency: {
      code: "EUR",
      name: "Euro",
      symbol: "€",
    },
  },
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

export const genderPrefrence = [
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
  { name: "Other", value: "other" },
];
