import { createContext, useContext, useState, useEffect } from 'react';
import fr from './fr.json';
import ar from './ar.json';

export const LangContext = createContext();

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ar'); // ← arabe par défaut à l'ouverture
  const t = lang === 'ar' ? ar : fr;

  // Applique dir/lang sur <html> dès le premier rendu (et à chaque changement)
  useEffect(() => {
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  function toggleLang() {
    setLang(prev => (prev === 'fr' ? 'ar' : 'fr'));
  }

  return (
    <LangContext.Provider value={{ t, lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}