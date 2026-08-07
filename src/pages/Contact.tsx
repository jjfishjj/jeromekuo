import { Layout } from "@/components/layout/Layout";
import { contactData, siteConfig } from "@/data/siteData";
import { Github, Mail, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="tag-pill mb-4 inline-flex">{t("contact.badge")}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-4">{t("contact.title")}</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t("contact.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="section-container">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-8">
            {[
              { icon: "🎯", title: t("cta.free"), desc: t("cta.freeDesc") },
              { icon: "📋", title: t("cta.practical"), desc: t("cta.practicalDesc") },
              { icon: "⚡", title: t("cta.fast"), desc: t("cta.fastDesc") },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8 mb-8">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                {t("contact.topicsTitle")}
              </h2>
              <ul className="space-y-3">
                {contactData.suitableTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="block">
                <Button size="lg" variant="outline" className="w-full justify-start border-border hover:border-primary hover:text-primary">
                  <Github className="mr-3 h-5 w-5" />
                  GitHub — @jjfishjj
                </Button>
              </a>
              {contactData.email ? (
                <a href={`mailto:${contactData.email}`} className="block">
                  <Button size="lg" variant="outline" className="w-full justify-start border-border hover:border-primary hover:text-primary">
                    <Mail className="mr-3 h-5 w-5" />
                    Email — {contactData.email}
                  </Button>
                </a>
              ) : (
                <Button size="lg" variant="outline" className="w-full justify-start" disabled>
                  <Mail className="mr-3 h-5 w-5" />
                  {t("contact.emailPending")}
                </Button>
              )}
              {siteConfig.bookingUrl ? (
                <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <Button size="lg" className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                    <MessageCircle className="mr-3 h-5 w-5" />
                    {t("contact.bookCall")}
                  </Button>
                </a>
              ) : (
                <Button size="lg" className="w-full justify-start" disabled>
                  <MessageCircle className="mr-3 h-5 w-5" />
                  {t("contact.bookCall")}（待設定）
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
