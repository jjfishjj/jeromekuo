import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Layers3,
  PenLine,
  Sparkles,
  Target,
} from "lucide-react";

const lectures = [
  {
    title: "團塊法",
    eyebrow: "Chunking Method",
    status: "預計公開",
    icon: Layers3,
    summary:
      "把零散詞彙、句型與發音線索整理成可記憶的語言團塊，降低大腦負擔，讓輸入更容易變成可提取的表達。",
    outcomes: ["建立語言團塊分類表", "練習短句到長句的組合", "設計自己的記憶回收流程"],
    format: "90 分鐘講座 + 練習工作紙",
  },
  {
    title: "拼寫記憶術",
    eyebrow: "Spelling Memory System",
    status: "規劃中",
    icon: PenLine,
    summary:
      "從字母形狀、音節節奏、語源線索與常見拼寫模式切入，建立更穩定的拼寫記憶，不只背單字，也理解單字如何被組成。",
    outcomes: ["拆解容易混淆的拼寫", "建立音形連結", "設計跨語言拼寫提醒卡"],
    format: "75 分鐘講座 + 示範練習",
  },
];

const timeline = [
  { label: "內容設計", value: "主題架構與練習方法整理中" },
  { label: "素材準備", value: "講義、示範題與練習工作紙製作中" },
  { label: "公開資訊", value: "日期、場次與報名方式將後續公布" },
];

const Lectures = () => {
  return (
    <Layout>
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl">
            <Badge className="mb-5 gap-1.5 bg-highlight-subtle text-accent border-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              語言講座預告
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Language Learning Lectures
            </h1>
            <p className="text-xl text-muted-foreground mb-5">
              預備公開的語言學習講座資訊
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              這個頁面會用來整理即將開放的語言講座、方法論主題與報名資訊。
              目前優先規劃「團塊法」與「拼寫記憶術」，協助學習者把詞彙、
              拼寫、聲音與句型轉換成更容易提取的記憶結構。
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <Button className="w-full sm:w-auto gap-2">
                  詢問講座合作
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/language">
                <Button variant="outline" className="w-full sm:w-auto">
                  查看語言學習資源
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-accent mb-3">
                <CalendarClock className="h-5 w-5" />
                <span className="text-sm font-medium">Upcoming Topics</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                預計公開的講座主題
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              內容會保留彈性，之後可補上日期、費用、直播連結、報名表與講義下載。
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {lectures.map((lecture) => {
              const Icon = lecture.icon;
              return (
                <article
                  key={lecture.title}
                  className="card-elevated rounded-xl p-6 md:p-8 hover:shadow-elevated transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-highlight-subtle flex items-center justify-center">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{lecture.eyebrow}</p>
                        <h3 className="text-2xl font-semibold text-foreground">{lecture.title}</h3>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-accent whitespace-nowrap">
                      {lecture.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {lecture.summary}
                  </p>

                  <div className="space-y-3 mb-6">
                    {lecture.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-center gap-2 text-sm text-foreground/85">
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-muted/50 border border-border/50 p-4">
                    <p className="text-xs text-muted-foreground mb-1">預計形式</p>
                    <p className="text-sm font-medium text-foreground">{lecture.format}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="section-container">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 text-accent mb-4">
                <Target className="h-5 w-5" />
                <span className="text-sm font-medium">Lecture Design</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                講座會聚焦在可實作的記憶方法
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                每個主題都會從一個具體的語言學習痛點出發，先拆解記憶負擔，
                再示範如何把材料整理成可練習、可回收、可持續調整的學習系統。
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {timeline.map((item, index) => (
                <div key={item.label} className="glass-card p-5">
                  <div className="w-8 h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{item.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              後續可以補上的資訊
            </h2>
            <p className="text-sm md:text-base opacity-80 leading-relaxed">
              講座日期、適合對象、報名表、費用、線上直播連結、回放期限、
              講義下載與合作邀約方式，都可以集中放在這個頁面更新。
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Lectures;
