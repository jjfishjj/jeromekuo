export type Language = "zh" | "en" | "es" | "he" | "ko" | "fr";

export const languageNames: Record<Language, string> = {
  zh: "中文",
  en: "English",
  es: "Español",
  he: "עברית",
  ko: "한국어",
  fr: "Français",
};

export const languageFlags: Record<Language, string> = {
  zh: "🇹🇼",
  en: "🇺🇸",
  es: "🇪🇸",
  he: "🇮🇱",
  ko: "🇰🇷",
  fr: "🇫🇷",
};

export const rtlLanguages: Language[] = ["he"];
