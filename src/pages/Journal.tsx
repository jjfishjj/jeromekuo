import { Layout } from "@/components/layout/Layout";
import { journalProject } from "@/data/siteData";
import { ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
              {journalProject.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {journalProject.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Warning Note */}
      <section className="py-6 border-b border-border/50">
        <div className="section-container">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-200">
              {journalProject.note}
            </p>
          </div>
        </div>
      </section>

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
            <a
              href={journalProject.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:border-accent hover:text-accent"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                GitHub Repository
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Connection to Learning Styles */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              與學習型態理論的連結
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                這個日誌專案是學習型態理論的<strong className="text-foreground">實踐證明</strong>：
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span><strong className="text-foreground">邏輯/文字型：</strong>結構化欄位設計，將抽象經驗轉換為可分類的資料</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span><strong className="text-foreground">視覺型：</strong>長期累積後可視覺化趨勢與模式</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent mt-1">→</span>
                  <span><strong className="text-foreground">動覺型：</strong>每日書寫本身就是一種「做中學」的行為訓練</span>
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
    </Layout>
  );
};

export default Journal;
