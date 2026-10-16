import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles, Brain, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteText } from "@/hooks/useSiteText";
import placeholderProfile from "@/assets/placeholder-profile.jpg";
import "./Index.css";

const Index = () => {
  const [skillTab, setSkillTab] = useState<"learning" | "tech">("learning");
  const { t } = useLanguage();

  const learningSkills = [
    { icon: "🧠", titleKey: "skill.learning.analysis.title", descKey: "skill.learning.analysis.desc" },
    { icon: "📊", titleKey: "skill.learning.memory.title", descKey: "skill.learning.memory.desc" },
    { icon: "🔄", titleKey: "skill.learning.behavior.title", descKey: "skill.learning.behavior.desc" },
    { icon: "💡", titleKey: "skill.learning.sensory.title", descKey: "skill.learning.sensory.desc" },
  ];

  const techSkills = [
    { icon: "🚀", titleKey: "skill.tech.documentation.title", descKey: "skill.tech.documentation.desc" },
    { icon: "⚡", titleKey: "skill.tech.gamification.title", descKey: "skill.tech.gamification.desc" },
    { icon: "🤖", titleKey: "skill.tech.ai.title", descKey: "skill.tech.ai.desc" },
    { icon: "🗄️", titleKey: "skill.tech.data.title", descKey: "skill.tech.data.desc" },
  ];

  const services = [1, 2, 3, 4].map((i) => ({
    icon: ["🎯", "⚙️", "🚀", "🎓"][i - 1],
    title: t(`service.${i}.title`),
    pain: t(`service.${i}.pain`),
    solution: t(`service.${i}.solution`),
    includes: t(`service.${i}.includes`).split(","),
  }));

  const cases = [1, 2, 3].map((i) => ({
    icon: ["🧠", "📓", "🌍"][i - 1],
    tag: t(`case.${i}.tag`),
    category: t(`case.${i}.category`),
    title: t(`case.${i}.title`),
    tags: t(`case.${i}.tags`).split(","),
    challenge: t(`case.${i}.challenge`),
    solution: t(`case.${i}.solution`),
    results: [
      { value: t(`case.${i}.result1.value`), label: t(`case.${i}.result1.label`) },
      { value: t(`case.${i}.result2.value`), label: t(`case.${i}.result2.label`) },
    ],
    link: ["/memory", "/journal", "/language"][i - 1],
  }));

  // Hero text from DB with i18n fallback
  const heroRole1 = useSiteText("hero.role1", t("hero.role1"));
  const heroRole2 = useSiteText("hero.role2", t("hero.role2"));
  const heroTagline = useSiteText("hero.tagline", t("hero.tagline"));
  const heroDomain1 = useSiteText("hero.domain1", t("hero.domain1"));
  const heroDomain2 = useSiteText("hero.domain2", t("hero.domain2"));
  const heroDomain3 = useSiteText("hero.domain3", t("hero.domain3"));
  const heroCtaPrimary = useSiteText("hero.ctaPrimary", t("hero.ctaPrimary"));
  const heroCtaSecondary = useSiteText("hero.ctaSecondary", t("hero.ctaSecondary"));
  const heroGreeting = useSiteText("hero.greeting", t("hero.greeting"));

  const domains = [heroDomain1, heroDomain2, heroDomain3];
  return (
    <Layout>
      <section className="home-hero relative overflow-hidden">
        <div className="section-container home-hero-grid relative z-10">
          <div className="home-hero-copy">
            <span className="home-hero-kicker">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {heroGreeting}
            </span>

            <h1 className="home-hero-title">
              <span>{heroRole1}</span>
              <span className="home-hero-title-accent"><span aria-hidden="true">×</span> {heroRole2}</span>
            </h1>

            <p className="home-hero-description">{heroTagline}</p>

            <div className="home-hero-domains" role="list" aria-label={t("skills.title")}>
              {domains.map((domain) => (
                <span key={domain} role="listitem"><CheckCircle2 aria-hidden="true" />{domain}</span>
              ))}
            </div>

            <div className="home-hero-actions">
              <Button asChild size="lg" className="w-full sm:w-auto home-button-primary">
                <Link to="/contact" className="w-full sm:w-auto">
                  {heroCtaPrimary}<ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto home-button-secondary">
                <Link to="/memory" className="w-full sm:w-auto">
                  {heroCtaSecondary}
                </Link>
              </Button>
            </div>

            <nav className="home-hero-explore" aria-label={t("footer.navigation")}>
              {[
                { label: t("nav.memory"), to: "/memory" },
                { label: t("nav.journal"), to: "/journal" },
                { label: t("nav.language"), to: "/language" },
              ].map((item) => (
                <Link key={item.to} to={item.to}>{item.label}<ArrowRight aria-hidden="true" /></Link>
              ))}
            </nav>
          </div>

          <div className="home-hero-visual">
            <div className="home-portrait-frame">
              <MediaPlaceholder
                type="image"
                aspectRatio="3/4"
                contentKey="home.hero.profile"
                fallbackSrc={placeholderProfile}
                loading="eager"
                fetchPriority="high"
                className="home-portrait-media"
              />
              <div className="home-portrait-caption">
                <span className="home-portrait-index">JK / PROFILE</span>
                <span>{t("photo.profile")}</span>
              </div>
            </div>
            <div className="home-visual-note home-visual-note-top">
              <Brain aria-hidden="true" />
              <span>{t("photo.badge1.label")}<strong>{t("photo.badge1.value")}</strong></span>
            </div>
            <div className="home-visual-note home-visual-note-bottom">
              <TrendingUp aria-hidden="true" />
              <span>{t("photo.badge2.label")}<strong>{t("photo.badge2.value")}</strong></span>
            </div>
            <span className="home-visual-orbit" aria-hidden="true">JK—01</span>
          </div>
        </div>

        <div className="home-expertise-strip">
          <div className="section-container home-expertise-inner">
            <span className="home-expertise-label">{t("skills.title")}</span>
            <div>{domains.map((domain, index) => <span key={domain}><i>0{index + 1}</i>{domain}</span>)}</div>
            <Link to="/systems">{t("services.title")}<ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 md:py-24 border-t border-border/30">
        <div className="section-container">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">{t("skills.title")}</h2>
            <p className="text-muted-foreground">{t("skills.subtitle")}</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-secondary rounded-lg p-1" role="group" aria-label={t("skills.title")}>
              <button
                type="button"
                aria-pressed={skillTab === "learning"}
                onClick={() => setSkillTab("learning")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  skillTab === "learning" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("skills.learning")}
              </button>
              <button
                type="button"
                aria-pressed={skillTab === "tech"}
                onClick={() => setSkillTab("tech")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  skillTab === "tech" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("skills.tech")}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {(skillTab === "learning" ? learningSkills : techSkills).map((skill) => (
              <div key={skill.titleKey} className="glass-card p-6 hover:border-primary/30 transition-all group">
                <span className="text-3xl mb-4 block">{skill.icon}</span>
                <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(skill.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(skill.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">{t("services.title")}</h2>
            <p className="text-muted-foreground">{t("services.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <div key={service.title} className="glass-card p-8 group hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-3xl">{service.icon}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div>
                    <span className="text-xs font-medium text-destructive/80">{t("services.painLabel")}</span>
                    <p className="text-sm text-muted-foreground">{service.pain}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-primary">{t("services.solutionLabel")}</span>
                    <p className="text-sm text-foreground/80">{service.solution}</p>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground mb-2 block">{t("services.includesLabel")}</span>
                  <ul className="space-y-1">
                    {service.includes.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full border-border hover:border-primary hover:text-primary">
                  <Link to="/contact" className="mt-6 block">
                    {t("services.bookConsult")}
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">{t("services.notSure")}</p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contact">
                {t("services.freeConsult")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* decorative gradient blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="section-container relative">
          <div className="text-center mb-10 md:mb-16">
            <span className="tag-pill mb-4 inline-flex animate-blink">
              <Award className="h-3 w-3 mr-1 inline" />
              {t("cases.title")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              <span className="text-shimmer">{t("cases.title")}</span>
            </h2>
            <p className="text-muted-foreground">{t("cases.subtitle")}</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {cases.map((cs, i) => (
              <Link
                key={i}
                to={cs.link}
                className="case-card block glass-card p-8 group hover:border-primary/40 transition-all hover:-translate-y-1 duration-500"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 inline-block">
                        {cs.icon}
                      </span>
                      <span className="tag-pill">{cs.tag}</span>
                      <span className="text-xs text-muted-foreground">{cs.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {cs.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cs.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                        <span className="text-base mt-0.5">⚠️</span>
                        <div>
                          <span className="text-xs font-medium text-destructive/80">{t("cases.challengeLabel")}</span>
                          <p className="text-sm text-muted-foreground mt-1">{cs.challenge}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                        <span className="text-base mt-0.5">✅</span>
                        <div>
                          <span className="text-xs font-medium text-primary">{t("cases.solutionLabel")}</span>
                          <p className="text-sm text-foreground/80 mt-1">{cs.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-6 md:gap-4 md:w-48 md:border-l md:border-border/50 md:pl-8 items-center md:justify-center">
                    {cs.results.map((r, ri) => (
                      <div
                        key={r.label}
                        className="text-center group-hover:scale-105 transition-transform duration-500"
                        style={{ transitionDelay: `${ri * 80}ms` }}
                      >
                        <div className="text-3xl font-bold text-shimmer">{r.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">{r.label}</div>
                      </div>
                    ))}
                    <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                      {t("cases.learnMore")} <ChevronRight className="h-4 w-4 animate-pulse" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="glass-card inline-block p-8 max-w-lg animate-glow">
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("cases.ctaTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("cases.ctaDesc")}</p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">{t("cases.ctaButton")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="tag-pill mb-6 inline-flex">{t("cta.badge")}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 mt-4">{t("cta.title")}</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t("cta.desc")}</p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 mb-10">
              {[
                { icon: "🎯", title: t("cta.free"), desc: t("cta.freeDesc") },
                { icon: "📋", title: t("cta.practical"), desc: t("cta.practicalDesc") },
                { icon: "⚡", title: t("cta.fast"), desc: t("cta.fastDesc") },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div className="text-left">
                    <div className="text-sm font-medium text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold">
                <Link to="/contact">
                  {t("cta.bookCall")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:border-primary hover:text-primary px-8">
                <Link to="/memory">
                  {t("cta.browseResources")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
