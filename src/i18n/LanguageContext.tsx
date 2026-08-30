/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { DICTIONARY, type Language, type Translations } from './translations';

export type { Language, Translations };
export { DICTIONARY };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dmt_portfolio_lang') as Language | null;
      if (saved === 'en' || saved === 'es') return saved;
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dmt_portfolio_lang', newLang);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: DICTIONARY[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
