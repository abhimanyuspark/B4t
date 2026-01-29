import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../languages/en.json";
import hi from "../languages/hi.json";
import fr from "../languages/fr.json";
import de from "../languages/de.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    hi: {
      translation: hi,
    },
    fr: {
      translation: fr,
    },
    de: {
      translation: de,
    },
  },
  lng: localStorage.getItem("lang") || "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
