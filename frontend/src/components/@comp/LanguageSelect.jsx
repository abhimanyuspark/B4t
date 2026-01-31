import { useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "../common/Select";
import { languages } from "../../utils/initial";

const LanguageSelect = () => {
  const lang = localStorage.getItem("lang");
  const int = languages.find((l) => lang && lang === l.code && l);
  const [option, setOption] = useState(int || languages[0]);
  const { i18n } = useTranslation();

  const handleLanguageChange = (selectedOption) => {
    setOption(selectedOption);
    i18n.changeLanguage(selectedOption?.code);
    localStorage.setItem("lang", selectedOption?.code);
  };

  return (
    <Select
      text={(opt) => opt?.name}
      options={languages}
      value={option}
      className="w-23 sm:w-30"
      onChange={handleLanguageChange}
    />
  );
};

export default LanguageSelect;
