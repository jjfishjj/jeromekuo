import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles, Zap, Brain, Globe, Rocket, Heart, Target, TrendingUp, Award } from "lucide-react";
import { siteConfig } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Marquee } from "@/components/ui/Marquee";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteText } from "@/hooks/useSiteText";
import placeholderProfile from "@/assets/placeholder-profile.jpg";

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

  const testimonials = [1, 2, 3].map((i) => ({
    avatar: ["👨‍🎓", "👩‍💼", "👨‍💻"][i - 1],
    quote: t(`testimonial.${i}.quote`),
    name: t(`testimonial.${i}.name`),
    role: t(`testimonial.${i}.role`),
    org: t(`testimonial.${i}.org`),
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
  const stats = [
    { value: "4+", label: t("stats.research") },
    { value: "5", label: t("stats.languages") },
    { value: "∞", label: t("stats.continuous") },
  ];

  // Marquee items - 跑馬燈內容
  const marqueeItems = [
    <><Sparkles className="h-4 w-4 text-primary" /><span>{t("hero.domain1")}</span></>,
    <><Brain className="h-4 w-4 text-primary" /><span>{t("hero.domain2")}</span></>,
    <><Globe className="h-4 w-4 text-primary" /><span>{t("hero.domain3")}</span></>,
    <><Rocket className="h-4 w-4 text-primary" /><span>{t("services.title")}</span></>,
    <><Heart className="h-4 w-4 text-primary" /><span>{t("cta.badge")}</span></>,
    <><Award className="h-4 w-4 text-primary" /><span>{t("testimonials.title")}</span></>,
    <><TrendingUp className="h-4 w-4 text-primary" /><span>{t("cases.title")}</span></>,
    <><Zap className="h-4 w-4 text-primary" /><span>{t("skills.title")}</span></>,
  ];

  return (
    <Layout>
      {/* Top Marquee 跑馬燈 */}
      <div className="border-b border-border/30 bg-secondary/40 py-3">
        <Marquee items={marqueeItems} speed="normal" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center overflow-hidden py-12 md:py-0">
        <div className="section-container relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Mobile: image first for visual impact */}
            <div className="relative opacity-0 animate-slide-up [animation-delay:0.2s] order-first md:order-last">
              <div className="relative max-w-[280px] sm:max-w-[320px] md:max-w-none mx-auto">
                <MediaPlaceholder type="image" aspectRatio="3/4" caption={t("photo.profile")} contentKey="home.hero.profile" fallbackSrc={placeholderProfile} />
                <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 glass-card px-3 py-2 md:px-4 md:py-3 animate-float">
                  <div className="flex items-center gap-2">
                    <span className="text-base md:text-lg">🧠</span>
                    <div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">{t("photo.badge1.label")}</div>
                      <div className="text-xs md:text-sm font-semibold text-primary">{t("photo.badge1.value")}</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 glass-card px-3 py-2 md:px-4 md:py-3 animate-float [animation-delay:1.5s]">
                  <div className="flex items-center gap-2">
                    <span className="text-base md:text-lg">📊</span>
                    <div>
                      <div className="text-[10px] md:text-xs text-muted-foreground">{t("photo.badge2.label")}</div>
                      <div className="text-xs md:text-sm font-semibold text-primary">{t("photo.badge2.value")}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5 md:space-y-6 text-center md:text-left">
              <span className="tag-pill opacity-0 animate-fade-in animate-blink">
                <Sparkles className="h-3 w-3 mr-1 inline" />
                {heroGreeting}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight opacity-0 animate-slide-up [animation-delay:0.1s]">
                <span className="whitespace-pre-line text-foreground">
                  {heroRole1}
                  <span className="text-primary"> ×</span>
                  {"\n"}
                  <span className="text-shimmer">{heroRole2}</span>
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto md:mx-0 opacity-0 animate-slide-up [animation-delay:0.2s]">
                {heroTagline}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 opacity-0 animate-slide-up [animation-delay:0.25s]">
                {domains.map((d) => (
                  <span key={d} className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                    {d}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-slide-up [animation-delay:0.3s] sm:justify-center md:justify-start">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold">
                    {heroCtaPrimary}
                  </Button>
                </Link>
                <Link to="/memory" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:border-primary hover:text-primary px-8">
                    {heroCtaSecondary}
                  </Button>
                </Link>
              </div>

              <div className="flex justify-center md:justify-start gap-6 sm:gap-8 pt-6 border-t border-border/50 opacity-0 animate-slide-up [animation-delay:0.4s]">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="stat-number">{s.value}</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
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
            <div className="inline-flex bg-secondary rounded-lg p-1">
              <button
                onClick={() => setSkillTab("learning")}
                className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                  skillTab === "learning" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("skills.learning")}
              </button>
              <button
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
                <Link to="/contact" className="mt-6 block">
                  <Button variant="outline" size="sm" className="w-full border-border hover:border-primary hover:text-primary">
                    {t("services.bookConsult")}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">{t("services.notSure")}</p>
            <Link to="/contact">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t("services.freeConsult")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">{t("cases.title")}</h2>
            <p className="text-muted-foreground">{t("cases.subtitle")}</p>
          </div>

          <div className="max-w-5xl mx-auto space-y-8">
            {cases.map((cs, i) => (
              <Link key={i} to={cs.link} className="block glass-card p-8 group hover:border-primary/30 transition-all">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{cs.icon}</span>
                      <span className="tag-pill">{cs.tag}</span>
                      <span className="text-xs text-muted-foreground">{cs.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {cs.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-destructive/80 mt-0.5">⚠️</span>
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">{t("cases.challengeLabel")}</span>
                          <p className="text-sm text-muted-foreground">{cs.challenge}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-primary mt-0.5">✅</span>
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">{t("cases.solutionLabel")}</span>
                          <p className="text-sm text-foreground/80">{cs.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-6 md:gap-4 md:w-48 md:border-l md:border-border/50 md:pl-8 items-center md:justify-center">
                    {cs.results.map((r) => (
                      <div key={r.label} className="text-center">
                        <div className="text-2xl font-bold text-primary">{r.value}</div>
                        <div className="text-xs text-muted-foreground">{r.label}</div>
                      </div>
                    ))}
                    <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("cases.learnMore")} <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="glass-card inline-block p-8 max-w-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">{t("cases.ctaTitle")}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t("cases.ctaDesc")}</p>
              <Link to="/contact">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("cases.ctaButton")}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">{t("testimonials.title")}</h2>
            <p className="text-muted-foreground">{t("testimonials.subtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {testimonials.map((tm, i) => (
              <div key={i} className="glass-card p-6">
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{tm.quote}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tm.avatar}</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{tm.name}</div>
                    <div className="text-xs text-muted-foreground">{tm.role} · {tm.org}</div>
                  </div>
                </div>
              </div>
            ))}
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
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 font-semibold">
                  {t("cta.bookCall")}
                </Button>
              </Link>
              <Link to="/memory">
                <Button size="lg" variant="outline" className="border-border hover:border-primary hover:text-primary px-8">
                  {t("cta.browseResources")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
