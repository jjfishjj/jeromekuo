import type { Language } from "@/i18n/types";

export const a11yCopy: Record<Language, { skipToMain: string; openMenu: string; closeMenu: string }> = {
  zh: { skipToMain: "跳至主要內容", openMenu: "開啟導覽選單", closeMenu: "關閉導覽選單" },
  en: { skipToMain: "Skip to main content", openMenu: "Open navigation menu", closeMenu: "Close navigation menu" },
  es: { skipToMain: "Saltar al contenido principal", openMenu: "Abrir menú de navegación", closeMenu: "Cerrar menú de navegación" },
  he: { skipToMain: "דילוג לתוכן הראשי", openMenu: "פתיחת תפריט הניווט", closeMenu: "סגירת תפריט הניווט" },
  ko: { skipToMain: "본문으로 건너뛰기", openMenu: "탐색 메뉴 열기", closeMenu: "탐색 메뉴 닫기" },
  fr: { skipToMain: "Aller au contenu principal", openMenu: "Ouvrir le menu de navigation", closeMenu: "Fermer le menu de navigation" },
};
