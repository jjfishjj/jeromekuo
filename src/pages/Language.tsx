import { Layout } from "@/components/layout/Layout";
import { languageData } from "@/data/siteData";
import { Globe, MessageCircle, AlertCircle } from "lucide-react";

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

      {/* Note */}
      <section className="py-12">
        <div className="section-container">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 max-w-3xl mx-auto">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              {languageData.note}
            </p>
          </div>
        </div>
      </section>

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
