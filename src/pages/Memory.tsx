import { Layout } from "@/components/layout/Layout";
import { learningStyles } from "@/data/siteData";
import { Eye, Ear, Hand, ListChecks, Shuffle, Lightbulb } from "lucide-react";

const styleIcons = {
  visual: Eye,
  auditory: Ear,
  kinesthetic: Hand,
  logical: ListChecks,
};

const styleColors = {
  blue: "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  green: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  orange: "bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400",
  purple: "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
};

const Memory = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2.5 py-1 rounded-full mb-4">
              Core Theory
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {learningStyles.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {learningStyles.subtitle}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {learningStyles.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Four Styles */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-8">
            {learningStyles.styles.map((style) => {
              const Icon = styleIcons[style.id as keyof typeof styleIcons];
              const colorClass = styleColors[style.color as keyof typeof styleColors];

              return (
                <article
                  key={style.id}
                  className="card-elevated rounded-xl p-8 hover:shadow-elevated transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${colorClass}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {style.nameZh}
                      </h3>
                      <p className="text-sm text-muted-foreground">{style.name}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {style.description}
                  </p>

                  {/* Strengths */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">優勢</h4>
                    <ul className="space-y-1">
                      {style.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-1">·</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-2">挑戰</h4>
                    <p className="text-sm text-muted-foreground">{style.challenges}</p>
                  </div>

                  {/* Techniques */}
                  <div className="border-t border-border/50 pt-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">學習技巧</h4>
                    <div className="flex flex-wrap gap-2">
                      {style.techniques.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Training */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-highlight-subtle text-accent mb-4">
              <Shuffle className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              {learningStyles.crossTraining.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {learningStyles.crossTraining.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningStyles.crossTraining.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-card rounded-lg p-5 border border-border/50"
              >
                <span className="text-sm font-medium text-accent">{ex.style}</span>
                <p className="text-sm text-muted-foreground mt-2">{ex.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Methods */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-highlight-subtle text-accent mb-4">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              {learningStyles.personalMethods.titleZh}
            </h2>
            <p className="text-sm text-muted-foreground">
              {learningStyles.personalMethods.title}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {learningStyles.personalMethods.methods.map((method, i) => (
              <div
                key={i}
                className="card-elevated rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {method.categoryZh}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">{method.category}</p>
                <ul className="space-y-2">
                  {method.practices.map((p, j) => (
                    <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">→</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              這套理解如何影響我？
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 text-left">
              <div>
                <h3 className="font-medium mb-2">設計講座</h3>
                <p className="text-sm opacity-80">
                  根據聽眾的學習傾向，調整內容呈現方式——視覺圖表、口語講解、互動練習並用。
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">設計日記系統</h3>
                <p className="text-sm opacity-80">
                  多維度記錄框架，結合書寫（邏輯）、視覺化（視覺）、反思（動覺/體驗）。
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">設計工具與專案</h3>
                <p className="text-sm opacity-80">
                  融合回饋機制、記憶強化策略，創造適應不同學習者的互動體驗。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Memory;
