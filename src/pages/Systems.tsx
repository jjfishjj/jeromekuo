import { Layout } from "@/components/layout/Layout";
import { systemsData } from "@/data/siteData";
import { Database, TrendingUp, RefreshCcw, ExternalLink, Layers } from "lucide-react";

const approachIcons = {
  "Structured Documentation": Database,
  "Pattern Recognition": TrendingUp,
  "Iterative Optimization": RefreshCcw,
};

const Systems = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2.5 py-1 rounded-full mb-4">
              Analytics
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {systemsData.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {systemsData.subtitle}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {systemsData.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Approaches */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {systemsData.approaches.map((approach, i) => {
              const Icon = approachIcons[approach.title as keyof typeof approachIcons] || Database;
              return (
                <article
                  key={i}
                  className="card-elevated rounded-xl p-8 hover:shadow-elevated transition-all"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-highlight-subtle text-accent mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {approach.titleZh}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {approach.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {approach.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* GitHub Projects */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <Layers className="h-8 w-8 mx-auto text-accent mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              GitHub 專案總覽
            </h2>
            <p className="text-sm text-muted-foreground">
              基於 GitHub 公開資訊推斷的技術傾向與實驗方向
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {systemsData.githubProjects.map((project, i) => (
              <a
                key={i}
                href={`https://github.com/jjfishjj/${project.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 p-4 rounded-lg bg-card border border-border/50 hover:border-accent/50 hover:shadow-soft transition-all"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {project.description}
                  </p>
                  <span className="inline-block text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {project.status}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Future Placeholder */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="p-12 rounded-xl border-2 border-dashed border-border/50 bg-muted/20">
              <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                {systemsData.placeholder}
              </h3>
              <p className="text-sm text-muted-foreground">
                未來將整合日誌資料，建立個人成長儀表板與行為分析視覺化。
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Systems;
