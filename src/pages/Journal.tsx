import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageFaq } from "@/components/PageFaq";
import { journalProject } from "@/data/siteData";
import { Link } from "react-router-dom";
import { ExternalLink, AlertCircle, CheckCircle2, Brain, FlaskConical, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const coreTraits = [
  {
    icon: Brain,
    title: "多媒介學習策略",
    titleEn: "Multimodal Learning Strategies",
    description: "依學習任務搭配圖解、口語說明、文字整理或實作，不將學習者固定歸類",
  },
  {
    icon: FlaskConical,
    title: "結構化自我觀察",
    titleEn: "Structured Self-Reflection",
    description: "將日常反思整理成一致、可回看的記錄欄位",
  },
  {
    icon: Globe,
    title: "多語言認知探索",
    titleEn: "Multilingual Cognition",
    description: "把語言切換作為觀察認知與學習策略的探索方向",
  },
];

const JournalChartsChunk = lazy(() => import("./JournalCharts"));

function DeferredJournalCharts() {
  const container = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: "500px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={container} className="min-h-[2100px] md:min-h-[1900px] lg:min-h-[1450px]">
      {shouldLoad ? (
        <Suspense fallback={<section className="py-20" role="status" aria-live="polite">圖表載入中…</section>}>
          <JournalChartsChunk />
        </Suspense>
      ) : (
        <section className="bg-muted/20 py-20" aria-label="示意數據圖表">
          <div className="section-container"><h2 className="mb-3 text-center text-3xl font-bold text-foreground">用圖表整理行為記錄的範例</h2><p className="mx-auto max-w-2xl text-center text-sm leading-7 text-muted-foreground">本頁圖表為示意數據，將於捲動接近此區時載入；不代表真實個人追蹤或研究結果。</p></div>
        </section>
      )}
    </div>
  );
}

const Journal = () => {
  const sections = [
    { key: "why", data: journalProject.why },
    { key: "what", data: journalProject.what },
    { key: "how", data: journalProject.how },
    { key: "insight", data: journalProject.insight },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block text-xs font-medium text-accent bg-highlight-subtle px-2.5 py-1 rounded-full">
                Case Study
              </span>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse-subtle" />
                {journalProject.status}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              成長日誌：自我反思與行為紀錄框架
            </h1>
            <p className="text-xl text-muted-foreground">
              {journalProject.subtitle}
            </p>
            <nav aria-label="麵包屑" className="mt-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">首頁</Link>
              <span aria-hidden="true" className="px-2">/</span>
              <span aria-current="page">成長日誌</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Warning note hidden from public — visible only in admin dashboard */}

      {/* Core Traits Section */}
      <section className="py-16 border-b border-border/50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-2 text-center">
              日誌設計關注的方向
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              以結構化記錄整理自我觀察；這些方向不是心理測驗或臨床診斷
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {coreTraits.map((trait, index) => (
                <Card key={index} className="bg-card/50 border-border/50 hover:border-accent/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                      <trait.icon className="h-5 w-5 text-accent" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {trait.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-mono">
                      {trait.titleEn}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {trait.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DeferredJournalCharts />

            {/* Content Sections */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto space-y-16">
            {sections.map(({ key, data }) => (
              <article key={key} className="scroll-mt-24" id={key}>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="text-accent font-mono text-lg">{data.title}</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {data.content}
                </p>

                {/* Additional content for "what" section */}
                {key === "what" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {journalProject.what.dimensions.map((dim, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/50"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span className="text-sm text-foreground">{dim}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional content for "how" section */}
                {key === "how" && (
                  <div className="space-y-2">
                    {journalProject.how.structure.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-2"
                      >
                        <span className="text-xs font-mono text-accent bg-highlight-subtle px-2 py-0.5 rounded">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Link to GitHub */}
      <section className="py-16 bg-muted/30 border-t border-border/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              查看專案原始碼
            </h3>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:border-accent hover:text-accent"
            >
              <a href={journalProject.github} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                GitHub Repository
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Connection to Learning Styles */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              與多種學習策略的實務連結
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                日誌可以提供不同的輸入與回顧方式；這是介面設計上的實務連結，並非學習風格理論或因果效果的<strong className="text-foreground">實證證明</strong>：
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span><strong className="text-foreground">文字與結構：</strong>透過欄位把抽象經驗整理成可回看的記錄</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span><strong className="text-foreground">視覺回顧：</strong>在資料足夠且定義一致時，檢視記錄中的變化</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span><strong className="text-foreground">行動實驗：</strong>把反思轉成一項可執行的小調整</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span><strong className="text-foreground">回饋迴路：</strong>定期回顧形成反思→調整→行為改變的循環</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <PageFaq page="journal" />
    </Layout>
  );
};

export default Journal;
