import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [lang, setLang] = useState<"zh" | "en">("zh");

  const toggleLang = () => {
    setLang(lang === "zh" ? "en" : "zh");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onToggleLang={toggleLang} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer lang={lang} />
    </div>
  );
};
