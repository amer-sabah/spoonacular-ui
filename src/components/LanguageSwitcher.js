import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../utils/languageHelper';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="btn-group" role="group" style={{ direction: 'ltr' }}>
      <button 
        type="button" 
        className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => changeLanguage(i18n, 'en')}
      >
        English
      </button>
      <button 
        type="button" 
        className={`btn btn-sm ${i18n.language === 'ar' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => changeLanguage(i18n, 'ar')}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;
