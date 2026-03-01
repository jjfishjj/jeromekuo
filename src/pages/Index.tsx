import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { heroData, coreAxes } from "@/data/siteData";
import { Button } from "@/components/ui/button";
import { AxisIcon } from "@/components/ui/AxisIcon";
import { Layout } from "@/components/layout/Layout";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

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
            <p className="text-sm font-medium text-muted-foreground tracking-wider uppercase mb-4 opacity-0 animate-fade-in">
              {heroData.greeting}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 opacity-0 animate-slide-up [animation-delay:0.1s]">
              {heroData.name}
            </h1>
            <p className="text-lg md:text-xl text-gradient font-medium mb-6 opacity-0 animate-slide-up [animation-delay:0.2s]">
              {heroData.tagline}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 opacity-0 animate-slide-up [animation-delay:0.3s]">
              {heroData.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up [animation-delay:0.4s]">
              <Link to="/memory">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                  探索學習型態
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/journal">
                <Button size="lg" variant="outline" className="border-border hover:border-accent hover:text-accent px-8">
                  成長日誌專案
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Hero Media — Blog-style featured visual */}
      <section className="pb-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <MediaPlaceholder
              type="video"
              aspectRatio="16/9"
              caption="個人介紹影片 / 專案展示 Reel"
            />
          </div>
        </div>
      </section>

      {/* Core Axes Section — Blog card layout with media */}
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

          <div className="max-w-4xl mx-auto space-y-16">
            {coreAxes.map((axis, index) => (
              <Link
                key={axis.id}
                to={axis.link}
                className="group flex flex-col md:flex-row items-start gap-8 card-elevated rounded-xl p-8 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              >
                {/* Left: Media placeholder */}
                <div className="w-full md:w-2/5 flex-shrink-0">
                  <div
                    className="relative w-full rounded-lg border-2 border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-2 overflow-hidden transition-colors group-hover:border-accent/40"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                      <AxisIcon name={axis.icon as "brain" | "journal" | "code"} />
                    </div>
                    <span className="text-xs text-muted-foreground">封面圖片</span>
                  </div>
                </div>

                {/* Right: Content */}
                <div className="flex-1">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-highlight-subtle text-accent mb-4 transition-transform group-hover:scale-110">
                    <AxisIcon name={axis.icon as "brain" | "journal" | "code"} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {axis.titleZh}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{axis.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {axis.description}
                  </p>
                  <span className="flex items-center text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    深入了解
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Entries — Blog post list style */}
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

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { to: "/memory", tag: "Core Theory", title: "記憶型態講座", desc: "四種學習型態的識別與應用，以及我的個人訓練方法。" },
              { to: "/journal", tag: "Case Study", title: "成長日誌專案", desc: "將自我觀察與反思系統化，作為記憶與行為資料化的實驗。" },
              { to: "/systems", tag: "Exploration", title: "技術專案與分析", desc: "Flutter、AI 助理、機器學習等實驗性專案總覽。" },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="group flex flex-col sm:flex-row items-start gap-6 rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-accent/50 hover:shadow-soft"
              >
                {/* Thumbnail placeholder */}
                <div className="w-full sm:w-48 flex-shrink-0">
                  <div
                    className="w-full rounded-lg border-2 border-dashed border-border bg-muted/40 flex items-center justify-center overflow-hidden transition-colors group-hover:border-accent/40"
                    style={{ aspectRatio: "4/3" }}
                  >
                    <span className="text-xs text-muted-foreground">縮圖</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2 py-1 rounded mb-3">
                    {item.tag}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
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
