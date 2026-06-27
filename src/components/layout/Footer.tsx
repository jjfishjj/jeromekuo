import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { useLanguage } from "@/i18n/LanguageContext";

const navKeys = [
  { key: "nav.memory", path: "/memory" },
  { key: "nav.journal", path: "/journal" },
  { key: "nav.language", path: "/language" },
  { key: "nav.game", path: "/game" },
  { key: "nav.systems", path: "/systems" },
  { key: "nav.lectures", path: "/lectures" },
];

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/30">
      <div className="bg-secondary/50">
        <div className="section-container py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/memory" className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-all">
              <span className="text-xl">📚</span>
              <div>
                <div className="text-sm font-semibold text-foreground">{t("footer.resources")}</div>
                <div className="text-xs text-muted-foreground">{t("footer.resourcesDesc")}</div>
              </div>
            </Link>
            <Link to="/contact" className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-all">
              <span className="text-xl">👥</span>
              <div>
                <div className="text-sm font-semibold text-foreground">{t("footer.booking")}</div>
                <div className="text-xs text-muted-foreground">{t("footer.bookingDesc")}</div>
              </div>
            </Link>
            <Link to="/journal" className="glass-card p-4 flex items-center gap-3 hover:border-primary/30 transition-all">
              <span className="text-xl">🎓</span>
              <div>
                <div className="text-sm font-semibold text-foreground">{t("footer.journal")}</div>
                <div className="text-xs text-muted-foreground">{t("footer.journalDesc")}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link to="/" className="text-lg font-bold text-foreground">
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">{t("footer.navigation")}</h4>
            <nav className="flex flex-col gap-2">
              {navKeys.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">{t("footer.connect")}</h4>
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
