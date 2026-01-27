import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { navigation } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  lang: "zh" | "en";
  onToggleLang: () => void;
}

export const Header = ({ lang, onToggleLang }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-foreground hover:text-accent transition-colors"
          >
            JJ Fish
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.slice(0, -1).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive(item.path)
                    ? "text-accent bg-highlight-subtle"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {lang === "zh" ? item.nameZh : item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleLang}
              className="hidden md:flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">{lang === "zh" ? "EN" : "中"}</span>
            </Button>

            <Link to="/contact" className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "border-border/60 hover:border-accent hover:text-accent",
                  isActive("/contact") && "border-accent text-accent"
                )}
              >
                {lang === "zh" ? "聯絡" : "Contact"}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                    isActive(item.path)
                      ? "text-accent bg-highlight-subtle"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {lang === "zh" ? item.nameZh : item.name}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onToggleLang();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full justify-start gap-2 text-muted-foreground"
                >
                  <Globe className="h-4 w-4" />
                  {lang === "zh" ? "Switch to English" : "切換至中文"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
