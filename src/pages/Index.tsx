import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { heroData, coreAxes } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { AxisIcon } from "@/components/ui/AxisIcon";
import { Layout } from "@/components/layout/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Greeting */}
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-4 opacity-0 animate-fade-in">
              {heroData.greeting}
            </p>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-slide-up [animation-delay:0.1s]">
              {heroData.name}
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-gradient font-medium mb-6 opacity-0 animate-slide-up [animation-delay:0.2s]">
              {heroData.tagline}
            </p>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 opacity-0 animate-slide-up [animation-delay:0.3s]">
              {heroData.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up [animation-delay:0.4s]">
              <Link to="/memory">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                >
                  探索學習型態
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/journal">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border hover:border-accent hover:text-accent px-8"
                >
                  成長日誌專案
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Core Axes Section */}
      <section className="py-24 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-sm font-medium text-accent tracking-wider uppercase mb-3">
              Core Focus
            </h2>
            <p className="text-3xl md:text-4xl font-semibold text-foreground">
              三個核心軸線
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {coreAxes.map((axis, index) => (
              <Link
                key={axis.id}
                to={axis.link}
                className="group card-elevated rounded-xl p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-highlight-subtle text-accent mb-6 transition-transform group-hover:scale-110">
                  <AxisIcon name={axis.icon as "brain" | "journal" | "code"} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {axis.titleZh}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{axis.title}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {axis.description}
                </p>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  深入了解
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Entries */}
      <section className="py-24">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="text-sm font-medium text-accent tracking-wider uppercase mb-3">
              Featured
            </h2>
            <p className="text-3xl md:text-4xl font-semibold text-foreground">
              精選入口
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Memory Lecture */}
            <Link
              to="/memory"
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-accent/50 hover:shadow-soft"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2 py-1 rounded mb-4">
                Core Theory
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                記憶型態講座
              </h3>
              <p className="text-sm text-muted-foreground">
                四種學習型態的識別與應用，以及我的個人訓練方法。
              </p>
            </Link>

            {/* Growth Journal */}
            <Link
              to="/journal"
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-accent/50 hover:shadow-soft"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2 py-1 rounded mb-4">
                Case Study
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                成長日誌專案
              </h3>
              <p className="text-sm text-muted-foreground">
                將自我觀察與反思系統化，作為記憶與行為資料化的實驗。
              </p>
            </Link>

            {/* Systems */}
            <Link
              to="/systems"
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-accent/50 hover:shadow-soft"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2 py-1 rounded mb-4">
                Exploration
              </span>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                技術專案與分析
              </h3>
              <p className="text-sm text-muted-foreground">
                Flutter、AI 助理、機器學習等實驗性專案總覽。
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote / Philosophy */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="section-container">
          <blockquote className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-6">
              「最成功的學習者會根據材料與情境調整方法，<br className="hidden md:block" />
              結合多種學習型態以達到最佳效果。」
            </p>
            <footer className="text-sm opacity-70">
              — 學習型態研究核心理念
            </footer>
          </blockquote>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
