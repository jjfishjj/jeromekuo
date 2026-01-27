import { Layout } from "@/components/layout/Layout";
import { gameData } from "@/data/siteData";
import { Gamepad2, RefreshCw, Target, Brain, AlertCircle } from "lucide-react";

const conceptIcons = {
  "Feedback Loops": RefreshCw,
  "Motivation Systems": Target,
  "Memory Reinforcement": Brain,
};

const Game = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2.5 py-1 rounded-full">
                Design
              </span>
              <span className="inline-flex items-center text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full">
                {gameData.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {gameData.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {gameData.subtitle}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {gameData.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <Gamepad2 className="h-8 w-8 mx-auto text-accent mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">
              核心概念
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {gameData.concepts.map((concept, i) => {
              const Icon = conceptIcons[concept.title as keyof typeof conceptIcons] || RefreshCw;
              return (
                <article
                  key={i}
                  className="card-elevated rounded-xl p-8 text-center hover:shadow-elevated transition-all"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-highlight-subtle text-accent mb-6">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {concept.titleZh}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {concept.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {concept.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Connection to Learning */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              遊戲設計 × 學習科學
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                <h3 className="font-medium mb-3">動覺型學習者的天堂</h3>
                <p className="text-sm opacity-80">
                  遊戲的互動性完美契合「做中學」的學習方式。每次操作都是一次學習機會。
                </p>
              </div>
              <div className="p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                <h3 className="font-medium mb-3">即時回饋強化記憶</h3>
                <p className="text-sm opacity-80">
                  遊戲中的成就系統、分數、進度條——都是間隔重複與主動回憶的變體。
                </p>
              </div>
              <div className="p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                <h3 className="font-medium mb-3">刻意製造錯誤</h3>
                <p className="text-sm opacity-80">
                  遊戲允許失敗並從中學習，這正是動覺訓練中「錯誤形成記憶錨點」的應用。
                </p>
              </div>
              <div className="p-6 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                <h3 className="font-medium mb-3">多感官整合</h3>
                <p className="text-sm opacity-80">
                  結合視覺、聽覺、觸覺回饋，遊戲天然支持跨學習型態的訓練方法。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12">
        <div className="section-container">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 max-w-3xl mx-auto">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              {gameData.note}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Game;
