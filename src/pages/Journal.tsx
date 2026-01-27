import { Layout } from "@/components/layout/Layout";
import { journalProject } from "@/data/siteData";
import { ExternalLink, AlertCircle, CheckCircle2, Brain, FlaskConical, Globe, TrendingUp, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Sample data for behavior trend visualization
const weeklyTrendData = [
  { week: "W1", 身體: 65, 心理: 70, 行為: 55, 反思: 60 },
  { week: "W2", 身體: 70, 心理: 65, 行為: 60, 反思: 65 },
  { week: "W3", 身體: 68, 心理: 72, 行為: 70, 反思: 68 },
  { week: "W4", 身體: 75, 心理: 68, 行為: 72, 反思: 75 },
  { week: "W5", 身體: 72, 心理: 78, 行為: 68, 反思: 80 },
  { week: "W6", 身體: 80, 心理: 75, 行為: 75, 反思: 82 },
  { week: "W7", 身體: 78, 心理: 80, 行為: 78, 反思: 85 },
  { week: "W8", 身體: 82, 心理: 82, 行為: 80, 反思: 88 },
];

const patternData = [
  { dimension: "身體覺察", value: 78, fullMark: 100 },
  { dimension: "心理狀態", value: 82, fullMark: 100 },
  { dimension: "行為紀錄", value: 75, fullMark: 100 },
  { dimension: "反思洞察", value: 88, fullMark: 100 },
  { dimension: "模式識別", value: 70, fullMark: 100 },
];

const monthlyActivityData = [
  { month: "Jan", entries: 28 },
  { month: "Feb", entries: 25 },
  { month: "Mar", entries: 30 },
  { month: "Apr", entries: 27 },
  { month: "May", entries: 31 },
  { month: "Jun", entries: 29 },
];

const coreTraits = [
  {
    icon: Brain,
    title: "跨型態學習整合者",
    titleEn: "Cross-modal Learning Integrator",
    description: "不只理解 VARK 理論，更發展出個人化的視覺/聽覺/邏輯/動覺訓練方法",
  },
  {
    icon: FlaskConical,
    title: "系統化自我實驗者",
    titleEn: "Systematic Self-Experimenter",
    description: "將日常反思轉化為可追蹤的資料結構",
  },
  {
    icon: Globe,
    title: "多語言認知探索者",
    titleEn: "Multilingual Cognitive Explorer",
    description: "將語言學習視為思維切換工具，而非單純技能",
  },
];

const chartConfig = {
  身體: { label: "身體覺察", color: "hsl(var(--accent))" },
  心理: { label: "心理狀態", color: "hsl(200 80% 60%)" },
  行為: { label: "行為紀錄", color: "hsl(150 70% 50%)" },
  反思: { label: "反思洞察", color: "hsl(280 70% 60%)" },
  value: { label: "Score", color: "hsl(var(--accent))" },
  entries: { label: "記錄天數", color: "hsl(var(--accent))" },
};

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

      {/* Core Traits Section */}
      <section className="py-16 border-b border-border/50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-2 text-center">
              觀察到的核心特質
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              透過長期行為數據分析所識別的三大特質
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

      {/* Data Visualization Section */}
      <section className="py-20 bg-muted/20">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-accent bg-highlight-subtle px-3 py-1.5 rounded-full mb-4">
                <TrendingUp className="h-3.5 w-3.5" />
                數據視覺化
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">
                長期行為趨勢與模式分析
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                透過持續記錄與分析，從數據中識別行為模式、成長軌跡與優化方向
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Weekly Trend Chart */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="h-4 w-4 text-accent" />
                    週度四維度趨勢
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    身體、心理、行為、反思四個維度的變化趨勢
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <LineChart data={weeklyTrendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
                      <XAxis dataKey="week" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} domain={[50, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="身體" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="心理" stroke="hsl(200 80% 60%)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="行為" stroke="hsl(150 70% 50%)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="反思" stroke="hsl(280 70% 60%)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ChartContainer>
                  <div className="flex flex-wrap gap-4 mt-4 justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 bg-accent rounded" />
                      <span className="text-xs text-muted-foreground">身體</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 rounded" style={{ backgroundColor: 'hsl(200 80% 60%)' }} />
                      <span className="text-xs text-muted-foreground">心理</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 rounded" style={{ backgroundColor: 'hsl(150 70% 50%)' }} />
                      <span className="text-xs text-muted-foreground">行為</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-0.5 rounded" style={{ backgroundColor: 'hsl(280 70% 60%)' }} />
                      <span className="text-xs text-muted-foreground">反思</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Radar Chart */}
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-4 w-4 text-accent" />
                    多維度能力分佈
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    當前各維度的發展狀態與平衡性
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <RadarChart data={patternData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                      <PolarGrid className="stroke-border/50" />
                      <PolarAngleAxis 
                        dataKey="dimension" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                      />
                      <Radar
                        name="能力值"
                        dataKey="value"
                        stroke="hsl(var(--accent))"
                        fill="hsl(var(--accent))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Activity Bar Chart */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  月度記錄活躍度
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  每月實際記錄天數，反映習慣持續性
                </p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <BarChart data={monthlyActivityData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
                    <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} domain={[0, 31]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="entries" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Insight Box */}
            <div className="mt-8 p-6 rounded-xl bg-accent/5 border border-accent/20">
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-accent" />
                數據洞察
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                從 8 週的趨勢分析可以看出，<strong className="text-foreground">反思維度</strong>呈現最穩定的上升趨勢（+28%），
                而<strong className="text-foreground">行為紀錄</strong>在第 3-4 週出現明顯進步後趨於平穩。
                雷達圖顯示<strong className="text-foreground">反思洞察（88）</strong>是當前最強維度，
                而<strong className="text-foreground">模式識別（70）</strong>仍有提升空間。
                這驗證了「刻意反思」對於行為改變的核心作用。
              </p>
            </div>
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
