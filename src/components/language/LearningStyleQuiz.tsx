import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, RotateCcw, Eye, Ear, Hand, BookOpen } from "lucide-react";

type StyleKey = "visual" | "auditory" | "kinesthetic" | "logical";

const questions = [
  {
    id: 1,
    category: "記憶偏好",
    question: "你需要記住一組新的電話號碼，你會怎麼做？",
    options: [
      { text: "在腦中視覺化數字的形狀與顏色", style: "visual" as StyleKey },
      { text: "反覆大聲朗讀號碼", style: "auditory" as StyleKey },
      { text: "把號碼寫下來並反覆閱讀", style: "logical" as StyleKey },
      { text: "用手指在空中比劃數字", style: "kinesthetic" as StyleKey },
    ],
  },
  {
    id: 2,
    category: "學習新技能",
    question: "學習一道新菜時，你傾向？",
    options: [
      { text: "看影片教學，觀察每個步驟", style: "visual" as StyleKey },
      { text: "聽別人口述步驟", style: "auditory" as StyleKey },
      { text: "閱讀食譜，按照文字指示操作", style: "logical" as StyleKey },
      { text: "直接動手試做，邊做邊調整", style: "kinesthetic" as StyleKey },
    ],
  },
  {
    id: 3,
    category: "資訊處理",
    question: "閱讀一篇長文章時，你最可能？",
    options: [
      { text: "用螢光筆標記重點，畫圖輔助理解", style: "visual" as StyleKey },
      { text: "朗讀重要段落或錄音重聽", style: "auditory" as StyleKey },
      { text: "做摘要筆記與條列重點", style: "logical" as StyleKey },
      { text: "邊走邊讀，或用手指追蹤文字", style: "kinesthetic" as StyleKey },
    ],
  },
  {
    id: 4,
    category: "方向感",
    question: "到一個新地方，你怎麼找路？",
    options: [
      { text: "看地圖或 Google Maps 的視覺路線", style: "visual" as StyleKey },
      { text: "請別人口頭告訴你怎麼走", style: "auditory" as StyleKey },
      { text: "查看文字版的路線指示", style: "logical" as StyleKey },
      { text: "走一次就記住了，靠身體感覺", style: "kinesthetic" as StyleKey },
    ],
  },
  {
    id: 5,
    category: "語言學習",
    question: "學習新語言的單字時，你偏好？",
    options: [
      { text: "搭配圖片或聯想畫面記憶", style: "visual" as StyleKey },
      { text: "反覆聽發音並跟著唸", style: "auditory" as StyleKey },
      { text: "把單字分類整理成表格", style: "logical" as StyleKey },
      { text: "用手寫或造句來練習", style: "kinesthetic" as StyleKey },
    ],
  },
];

const styleInfo: Record<StyleKey, { name: string; nameEn: string; icon: typeof Eye; color: string; description: string; tips: string[] }> = {
  visual: {
    name: "視覺型",
    nameEn: "Visual Learner",
    icon: Eye,
    color: "text-blue-500",
    description: "你透過圖像、顏色與空間關係來理解世界。看過的東西很容易記住。",
    tips: ["使用心智圖整理知識", "用顏色標記筆記重點", "看影片教學比讀文字有效", "將語言介面切換成學習中的語言"],
  },
  auditory: {
    name: "聽覺型",
    nameEn: "Auditory Learner",
    icon: Ear,
    color: "text-emerald-500",
    description: "你透過聲音與對話來吸收資訊。聽比讀更有效率。",
    tips: ["錄音重播學習內容", "朗讀筆記加深記憶", "聽 podcast 或語言節目", "與人對話練習語言"],
  },
  kinesthetic: {
    name: "動覺型",
    nameEn: "Kinesthetic Learner",
    icon: Hand,
    color: "text-orange-500",
    description: "你透過動手操作與身體記憶來學習。做中學比被動聽講有效。",
    tips: ["邊走邊學、邊寫邊記", "用角色扮演練習語言情境", "刻意犯錯來加深記憶錨點", "設計自己的測驗與遊戲"],
  },
  logical: {
    name: "邏輯/文字型",
    nameEn: "Logical / Verbal Learner",
    icon: BookOpen,
    color: "text-violet-500",
    description: "你偏好結構化的文字與邏輯分析。系統性整理是你的強項。",
    tips: ["建立階層式筆記大綱", "製作比較表格與分類系統", "用邏輯推演記憶規則", "將長資訊拆解成模式"],
  },
};

const LearningStyleQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<StyleKey[]>([]);
  const [result, setResult] = useState<StyleKey | null>(null);

  const handleAnswer = (style: StyleKey) => {
    const newAnswers = [...answers, style];
    if (currentQ < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate result
      const counts: Record<StyleKey, number> = { visual: 0, auditory: 0, kinesthetic: 0, logical: 0 };
      newAnswers.forEach((s) => counts[s]++);
      const winner = (Object.entries(counts) as [StyleKey, number][]).sort((a, b) => b[1] - a[1])[0][0];
      setAnswers(newAnswers);
      setResult(winner);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const info = styleInfo[result];
    const Icon = info.icon;
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4`}>
            <Icon className={`h-8 w-8 ${info.color}`} />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{info.name}</h3>
          <p className="text-sm text-muted-foreground">{info.nameEn}</p>
        </div>
        <p className="text-muted-foreground text-center mb-6">{info.description}</p>
        <div className="bg-muted/50 rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-foreground mb-3">推薦訓練方法</h4>
          <ul className="space-y-2">
            {info.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-accent mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <Button variant="outline" onClick={reset} className="gap-2">
            <RotateCcw className="h-4 w-4" /> 重新測驗
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-medium text-accent">{q.category}</span>
        <span className="text-xs text-muted-foreground">{currentQ + 1} / {questions.length}</span>
      </div>
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-muted rounded-full mb-8">
        <div
          className="h-1.5 bg-accent rounded-full transition-all duration-300"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-6">{q.question}</h3>
      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.style)}
            className="w-full text-left p-4 rounded-xl border border-border bg-card hover:border-accent hover:bg-accent/5 transition-all text-sm text-foreground"
          >
            <span className="text-muted-foreground mr-2 font-medium">{String.fromCharCode(65 + i)}.</span>
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LearningStyleQuiz;
