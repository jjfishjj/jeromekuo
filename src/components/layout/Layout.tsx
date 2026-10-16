import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLanguage } from "@/i18n/LanguageContext";
import { a11yCopy } from "@/data/a11yCopy";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { lang } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:font-semibold focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring">
        {a11yCopy[lang].skipToMain}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
};
