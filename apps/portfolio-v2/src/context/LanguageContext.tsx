import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  cvUrl: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to English as requested
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('danimtx_lang');
    return saved === 'es' ? 'es' : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('danimtx_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'es' : 'en');
  };

  // Dynamic CV URL according to selected language
  const cvUrl = lang === 'en' ? '/cv_EN.pdf' : '/cv.pdf';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, cvUrl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
