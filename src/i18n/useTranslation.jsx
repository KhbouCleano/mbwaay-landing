import { createContext, useContext, useState } from 'react';
import fr from './fr.json';
import ar from './ar.json';

export const LangContext = createContext();

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState('fr');
  const t = lang === 'ar' ? ar : fr;

  function toggleLang() {
    const next = lang === 'fr' ? 'ar' : 'fr';
    setLang(next);
    document.documentElement.dir  = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  }

  return (
    <LangContext.Provider value={{ t, lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}