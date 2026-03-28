import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Language } from "./types";
import { rtlLanguages } from "./types";
import { translations } from "./translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem("site-lang");
    return (saved as Language) || "zh";
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("site-lang", newLang);
  }, []);

  // Handle RTL
  useEffect(() => {
    document.documentElement.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string): string => {
      const langTranslations = translations[lang];
      if (langTranslations && key in langTranslations) {
        return langTranslations[key as keyof typeof langTranslations] as string;
      }
      // Fallback to zh
      const zhTranslations = translations.zh;
      if (key in zhTranslations) {
        return zhTranslations[key as keyof typeof zhTranslations] as string;
      }
      return key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
