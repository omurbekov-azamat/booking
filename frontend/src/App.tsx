import React from 'react';
import { useTranslation } from 'react-i18next';

function App() {

  const { t, i18n } = useTranslation();

  const changeLanguage = (language:string) => {
    i18n.changeLanguage(language);
  };


  return (
    <div>
      <button onClick={() => changeLanguage("en")}>EN</button>
      <button onClick={() => changeLanguage("ru")}>RU</button>
      <div>{t("text")}</div>
    </div>
  );
}

export default App;
