import { Link } from "react-router-dom";
import { Github, Mail } from "lucide-react";
import { siteConfig, navigation } from "@/data/siteData";

interface FooterProps {
  lang: "zh" | "en";
}

export const Footer = ({ lang }: FooterProps) => {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="section-container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-lg font-semibold text-foreground">
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {lang === "zh"
                ? "學習系統 · 記憶設計 · 應用反思"
                : "Learning Systems · Memory Design · Applied Reflection"}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              {lang === "zh" ? "導覽" : "Navigation"}
            </h4>
            <nav className="flex flex-col gap-2">
              {navigation.slice(1, -1).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {lang === "zh" ? item.nameZh : item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">
              {lang === "zh" ? "聯繫" : "Connect"}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} {siteConfig.name}. {lang === "zh" ? "保留所有權利。" : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};
