import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { languageNames, languageFlags } from "@/i18n/types";
import type { Language } from "@/i18n/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navKeys = [
  { key: "nav.home", path: "/" },
  { key: "nav.memory", path: "/memory" },
  { key: "nav.journal", path: "/journal" },
  { key: "nav.language", path: "/language" },
  { key: "nav.game", path: "/game" },
  { key: "nav.systems", path: "/systems" },
  { key: "nav.videos", path: "/videos" },
  { key: "nav.lectures", path: "/lectures" },
  { key: "nav.contact", path: "/contact" },
];

const languages: Language[] = ["zh", "en", "es", "he", "ko", "fr"];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/30">
      <nav className="section-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              {siteConfig.name.split(" ")[0]}
            </span>
            <span className="text-lg font-light text-muted-foreground">
              {siteConfig.name.split(" ").slice(1).join(" ")}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navKeys.slice(0, -1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden lg:flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <Globe className="h-4 w-4" />
                  <span className="text-xs font-medium">{languageFlags[lang]} {languageNames[lang]}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                {languages.map((l) => (
                  <DropdownMenuItem
                    key={l}
                    onClick={() => setLang(l)}
                    className={cn(
                      "flex items-center gap-2 cursor-pointer",
                      lang === l && "bg-primary/10 text-primary"
                    )}
                  >
                    <span>{languageFlags[l]}</span>
                    <span>{languageNames[l]}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/contact" className="hidden lg:block">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                {t("nav.bookNow")}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navKeys.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-border/30 space-y-2">
                {/* Mobile language selector */}
                <div className="flex flex-wrap gap-2 px-3">
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLang(l);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                        lang === l
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {languageFlags[l]} {languageNames[l]}
                    </button>
                  ))}
                </div>
                <Link to="/contact" className="block px-3" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("nav.bookNow")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
