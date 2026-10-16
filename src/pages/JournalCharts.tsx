import { Activity, Brain, FlaskConical, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
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

const chartConfig = {
  身體: { label: "身體覺察", color: "hsl(var(--accent))" },
  心理: { label: "心理狀態", color: "hsl(200 80% 60%)" },
  行為: { label: "行為紀錄", color: "hsl(150 70% 50%)" },
  反思: { label: "反思洞察", color: "hsl(280 70% 60%)" },
  value: { label: "Score", color: "hsl(var(--accent))" },
  entries: { label: "記錄天數", color: "hsl(var(--accent))" },
};


const JournalCharts = () => (
  <>
      {/* Data Visualization Section */}
      <section className="py-20 bg-muted/20">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-accent bg-highlight-subtle px-3 py-1.5 rounded-full mb-4">
                <TrendingUp className="h-3.5 w-3.5" />
                示意數據視覺化
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-3">
                用圖表整理行為記錄的範例
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                以下圖表以固定的範例數值展示不同呈現方式，不代表真實個人追蹤結果。
              </p>
            </div>

            <aside className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm leading-6 text-muted-foreground" role="note">
              <strong className="text-foreground">資料說明：</strong>
              本頁折線圖、雷達圖、月份數值與分析文字皆為示意資料，用來說明儀表板可以如何呈現記錄。它們不是我的真實日誌、臨床測量或實際成效，請勿據此推論個人狀態。
            </aside>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                  <ChartContainer config={chartConfig} className="h-[280px] w-full" aria-label="身體、心理、行為與反思四個維度的示意週度趨勢圖">
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
                    多維度示意分佈
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    以固定示意數值展示不同維度的呈現方式
                  </p>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full" aria-label="五個面向分數的示意雷達圖">
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
                        name="示意分數"
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
                  月度記錄天數（範例）
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  以示意數值展示月度紀錄欄位，不代表實際追蹤
                </p>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full" aria-label="每月日誌記錄數的示意長條圖">
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
                如何閱讀範例
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                圖表使用預先設定的示意數值，只展示時間趨勢、面向分布和記錄頻率的常見視覺化方式，不表示成長已發生，也不能驗證行為改變。實際運用時，先確認記錄期間與欄位定義，再把觀察到的模式當成待檢驗的假設。
              </p>
            </div>
          </div>
        </div>
      </section>

  </>
);

export default JournalCharts;
