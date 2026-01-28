import { Layout } from "@/components/layout/Layout";
import { gameData } from "@/data/siteData";
import { Gamepad2, RefreshCw, Target, Brain, AlertCircle, Zap, Grid3X3, Box } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";

const SnakeGame = lazy(() => import("@/components/games/SnakeGame"));
const ChessGame = lazy(() => import("@/components/games/ChessGame"));
const RubikPuzzle = lazy(() => import("@/components/games/RubikPuzzle"));

const conceptIcons = {
  "Feedback Loops": RefreshCw,
  "Motivation Systems": Target,
  "Memory Reinforcement": Brain,
};

const gameDemos = [
  {
    id: "snake",
    title: "Snake",
    titleZh: "吞食蛇",
    icon: Zap,
    systemFocus: "Real-time Feedback & Game Loop",
    systemFocusZh: "即時回饋與遊戲循環",
    description: "展示即時狀態更新、遊戲循環控制、碰撞檢測與反應速度的系統設計。狀態結構包含蛇身位置、移動方向、食物位置、分數與遊戲狀態的清楚拆分。",
  },
  {
    id: "chess",
    title: "Chess",
    titleZh: "象棋",
    icon: Grid3X3,
    systemFocus: "Rule Systems & State Transitions",
    systemFocusZh: "規則系統與狀態轉移",
    description: "展示棋盤狀態管理、棋子移動規則驗證、輪流機制與合法走法計算。每個棋子類型有獨立的移動邏輯，不合法操作會被系統阻止。",
  },
  {
    id: "rubik",
    title: "Rubik's Cube",
    titleZh: "魔術方塊",
    icon: Box,
    systemFocus: "Spatial Operations & Abstract State",
    systemFocusZh: "空間操作與抽象結構",
    description: "展示 2x2 方塊的層旋轉邏輯、狀態轉換與完成判定。每次旋轉影響多個面的色塊位置，需要精確的狀態追蹤與對應關係。",
  },
];

const GameLoading = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  </div>
);

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
                Playable Demos
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Game Systems Demo
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              可操作的遊戲系統展示
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              這不是遊戲成品，而是系統設計能力的實際展示。每個 Demo 展示不同的設計重點：
              即時回饋、規則系統、狀態管理與空間操作。適合產品設計者、遊戲設計者與工程師理解我的技術思維。
            </p>
          </div>
        </div>
      </section>

      {/* Game Demos */}
      <section className="py-16">
        <div className="section-container">
          <Tabs defaultValue="snake" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
              {gameDemos.map((demo) => (
                <TabsTrigger key={demo.id} value={demo.id} className="flex items-center gap-2">
                  <demo.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{demo.titleZh}</span>
                  <span className="sm:hidden">{demo.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {gameDemos.map((demo) => (
              <TabsContent key={demo.id} value={demo.id}>
                <div className="card-elevated rounded-xl p-8 max-w-4xl mx-auto">
                  {/* Demo header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-highlight-subtle text-accent mb-4">
                      <demo.icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      {demo.titleZh}
                    </h2>
                    <p className="text-sm text-accent font-medium mb-2">
                      {demo.systemFocusZh}
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                      {demo.description}
                    </p>
                  </div>

                  {/* Game component */}
                  <div className="bg-muted/30 rounded-lg p-6">
                    <Suspense fallback={<GameLoading />}>
                      {demo.id === "snake" && <SnakeGame />}
                      {demo.id === "chess" && <ChessGame />}
                      {demo.id === "rubik" && <RubikPuzzle />}
                    </Suspense>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-12">
            <Gamepad2 className="h-8 w-8 mx-auto text-accent mb-4" />
            <h2 className="text-2xl font-semibold text-foreground">
              設計核心概念
            </h2>
            <p className="text-muted-foreground mt-2">
              遊戲機制與學習科學的共通原則
            </p>
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

      {/* Technical note */}
      <section className="py-12">
        <div className="section-container">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/10 border border-accent/20 max-w-3xl mx-auto">
            <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/80">
              <p className="font-medium mb-1">技術說明</p>
              <p>
                所有 Demo 皆為純前端實作（React + TypeScript），使用函數式狀態管理。
                程式碼結構強調狀態拆分、規則抽離與可讀性，展示系統設計思維而非僅完成功能。
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Game;
