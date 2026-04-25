import { Layout } from "@/components/layout/Layout";
import { languageData } from "@/data/siteData";
import { Globe, MessageCircle, AlertCircle, Mic, Brain, BookOpen, Laugh, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";

const LearningStyleQuiz = lazy(() => import("@/components/language/LearningStyleQuiz"));
const LanguageFunFacts = lazy(() => import("@/components/language/LanguageFunFacts"));
const LanguageChatbot = lazy(() => import("@/components/language/LanguageChatbot"));

const levelColors: Record<string, string> = {
  Native: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Fluent: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Intermediate: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Learning: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
};

const Language = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2.5 py-1 rounded-full mb-4">
              Cognitive Interface
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {languageData.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {languageData.subtitle}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {languageData.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Languages Grid */}
      <section className="py-20">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {languageData.languages.map((lang, i) => (
              <article
                key={i}
                className="card-elevated rounded-xl p-6 hover:shadow-elevated transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-highlight-subtle flex items-center justify-center">
                      <Globe className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {lang.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{lang.nameEn}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColors[lang.level]}`}
                  >
                    {lang.level}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{lang.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Polyglot Conference */}
      <section className="py-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Mic className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Polyglot Conference</h2>
                <p className="text-sm text-muted-foreground">多語言大會線上講座講者</p>
              </div>
            </div>
            <div className="card-elevated rounded-xl p-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                受邀參與 <strong className="text-foreground">Polyglot Conference</strong> 線上講座，
                分享多語言學習經驗與學習型態（Learning Styles）的實踐應用。
                講座結合個人在視覺、聽覺、動覺、邏輯四種學習型態上的跨語言訓練方法，
                探討如何透過系統化的自我實驗來優化語言習得效率。
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Learning Styles", "Multilingual", "VARK", "Cross-Training"].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://live.polyglotconference.com/programme/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                查看 Polyglot Conference <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sections */}
      <section className="py-20">
        <div className="section-container">
          <Tabs defaultValue="quiz" className="w-full">
            <div className="flex flex-col items-center mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">互動體驗區</h2>
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="quiz" className="gap-1.5 text-xs sm:text-sm">
                  <Brain className="h-4 w-4" /> 學習型態測驗
                </TabsTrigger>
                <TabsTrigger value="blog" className="gap-1.5 text-xs sm:text-sm">
                  <Laugh className="h-4 w-4" /> 語言趣事
                </TabsTrigger>
                <TabsTrigger value="chat" className="gap-1.5 text-xs sm:text-sm">
                  <MessageCircle className="h-4 w-4" /> 多語言對話
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="quiz">
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  透過 5 道情境題，找出你的主要學習型態（視覺 / 聽覺 / 動覺 / 邏輯），
                  並獲得對應的語言學習訓練建議。
                </p>
              </div>
              <Suspense fallback={<div className="text-center text-muted-foreground py-12">載入中...</div>}>
                <LearningStyleQuiz />
              </Suspense>
            </TabsContent>

            <TabsContent value="blog">
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  學語言過程中遇到的有趣發現、發音趣事、文化差異與認知實驗。
                </p>
              </div>
              <Suspense fallback={<div className="text-center text-muted-foreground py-12">載入中...</div>}>
                <LanguageFunFacts />
              </Suspense>
            </TabsContent>

            <TabsContent value="chat">
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                  試試用不同語言跟助手對話！它會自動偵測你使用的語言並回應。
                </p>
              </div>
              <Suspense fallback={<div className="text-center text-muted-foreground py-12">載入中...</div>}>
                <LanguageChatbot />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Learning Style Training Reference */}
      <section className="py-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">學習型態訓練資源</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://gamma.app/docs/Four-Learning-Styles-igavxy8k0vgvymi?mode=doc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border border-border bg-card hover:border-accent/40 transition-all group"
              >
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  Four Learning Styles
                </h4>
                <p className="text-sm text-muted-foreground">
                  VARK 學習型態完整指南，包含辨識方法、訓練技巧與跨型態混合練習策略。
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent mt-3">
                  Gamma Doc <ExternalLink className="h-3 w-3" />
                </span>
              </a>
              <a
                href="https://learning-d6cdwr.manus.space/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-xl border border-border bg-card hover:border-accent/40 transition-all group"
              >
                <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  Learning Style Quiz (Manus)
                </h4>
                <p className="text-sm text-muted-foreground">
                  互動式學習型態測驗，5 題快速測試，結合個人化語言學習建議。
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent mt-3">
                  Manus App <ExternalLink className="h-3 w-3" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Insight */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-4 opacity-80" />
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed">
              "{languageData.insight}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Warning note hidden from public — visible only in admin dashboard */}

      {/* Philosophy */}
      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              語言與思維
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                每種語言都是一套獨特的<strong className="text-foreground">認知系統</strong>。學習新語言不只是記憶詞彙與文法，
                而是獲得一種新的<strong className="text-foreground">思維框架</strong>與<strong className="text-foreground">文化視角</strong>。
              </p>
              <p>
                這也是為什麼我會用不同語言做筆記——韓文筆畫最少書寫最快，
                切換語言介面能創造自然的視覺訓練環境，
                而在腦中同步翻譯則強化了多語言的即時處理能力。
              </p>
              <p>
                語言學習與學習型態理論密切相關：
                <strong className="text-foreground">聽力</strong>需要聽覺+視覺支持，
                <strong className="text-foreground">口說</strong>需要聽覺+動覺+邏輯，
                每種技能都受益於不同型態的訓練組合。
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Language;
