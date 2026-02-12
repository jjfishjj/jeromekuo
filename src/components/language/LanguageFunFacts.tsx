import { useState } from "react";
import { Laugh, ArrowLeft, Calendar, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

type BlogPost = {
  id: string;
  title: string;
  titleEn: string;
  date: string;
  language: string;
  preview: string;
  content: string[];
  moral: string;
};

const posts: BlogPost[] = [
  {
    id: "french-upload",
    title: "法語的 Upload 和 Download 是同一個詞？",
    titleEn: "French: Upload = Download?",
    date: "2025-01",
    language: "Français",
    preview: "在頻繁切換法語電腦介面時發現的一個有趣現象...",
    content: [
      "在法語中，「télécharger」這個詞同時代表 upload 和 download。",
      "這是我在把電腦介面切換成法語、進行視覺訓練時發現的。當你每天看到同一個按鈕，卻不確定它到底是上傳還是下載，那種認知混亂其實很有趣。",
      "法語需要用上下文來判斷方向：「télécharger vers le serveur」（上傳到伺服器）vs「télécharger depuis le serveur」（從伺服器下載）。",
      "這個發現讓我意識到，語言不只是翻譯——它反映了一個文化對概念的分類方式。",
    ],
    moral: "語言介面切換不只是視覺訓練，更是文化認知的探索。",
  },
  {
    id: "korean-speed",
    title: "韓文筆畫最少，所以我用韓文做筆記",
    titleEn: "Korean: The Fastest Note-Taking Language",
    date: "2025-02",
    language: "한국어",
    preview: "為什麼一個中文母語者會選擇用韓文寫日記？",
    content: [
      "韓文（한글）的設計原理基於發音器官的形狀，筆畫系統非常精簡。",
      "比較相同內容的書寫速度：中文需要大量筆畫，英文需要拼出完整單字，而韓文可以用方塊結構快速組合音節。",
      "我開始用韓文做反思筆記，不是因為韓文程度最好，而是因為書寫效率最高。這是一種實用主義的語言選擇。",
      "額外好處：用不太熟練的語言寫日記，反而會逼自己用更簡單直接的方式表達想法，減少囉嗦。",
    ],
    moral: "選擇筆記語言不一定要選最擅長的，而是最適合目標的。",
  },
  {
    id: "spanish-french-mix",
    title: "西班牙語和法語到底在搞什麼",
    titleEn: "When Spanish and French Get Mixed Up",
    date: "2025-01",
    language: "Español / Français",
    preview: "同時學兩種羅曼語系語言的混亂日常...",
    content: [
      "「Merci」和「Gracias」，「Bonjour」和「Buenos días」——當你同時學西班牙語和法語，你的大腦會開始自動混合。",
      "最常見的錯誤：想說西班牙語時冒出法語詞，想說法語時用了西班牙語文法。",
      "例如：我曾經對法國人說「Je suis muy bien」（混合了法語的「我是」和西班牙語的「很好」）。",
      "解決方法：我開始記錄這些「混用錯誤」，把它們變成學習素材。錯誤不是失敗，而是大腦正在建立新連結的證據。",
    ],
    moral: "記錄容易混淆的詞彙，把錯誤轉化為最強的記憶錨點。",
  },
  {
    id: "brain-translate",
    title: "聽英文時腦中的同步翻譯大戰",
    titleEn: "The Real-Time Translation Battle in My Brain",
    date: "2024-12",
    language: "Multi",
    preview: "刻意在腦中同步翻譯聽到的每個字，結果...",
    content: [
      "這是一個聽覺訓練方法：聽英語 podcast 時，強迫自己在腦中同步翻譯成中文。",
      "一開始完全跟不上，大約只能翻譯 30% 的內容。但持續練習後，處理速度明顯提升。",
      "更進階的版本：聽英語，在腦中翻譯成韓文。這需要跳過中文這個中間語言，直接建立英語→韓語的神經通路。",
      "這個方法的核心不是翻譯品質，而是強迫大腦「捕捉每一個字」，提升聽覺注意力的精度。",
    ],
    moral: "同步翻譯訓練的重點不在翻譯，在於捕捉與注意力。",
  },
  {
    id: "japanese-keigo",
    title: "日語敬語：同一句話的 7 種說法",
    titleEn: "Japanese Keigo: 7 Ways to Say the Same Thing",
    date: "2024-11",
    language: "日本語",
    preview: "當你以為學會了「謝謝」，日語告訴你還有 6 種...",
    content: [
      "日語的敬語系統（敬語）可能是世界上最複雜的禮貌語言系統之一。",
      "光是「謝謝」就有：ありがとう、ありがとうございます、感謝いたします、恐れ入ります... 每個都有不同的使用場景。",
      "這讓我理解到，語言學習不只是詞彙量的問題，更是「社會情境判斷能力」的訓練。",
      "學習日語敬語的過程，本質上是在學習一套社會關係的認知框架。",
    ],
    moral: "語言複雜度反映的是文化的認知精細度。",
  },
];

const LanguageFunFacts = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)} className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" /> 返回列表
        </Button>
        <article>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">
              {selectedPost.language}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {selectedPost.date}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{selectedPost.title}</h3>
          <p className="text-sm text-muted-foreground mb-8">{selectedPost.titleEn}</p>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {selectedPost.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/15">
            <p className="text-sm font-medium text-foreground">
              💡 {selectedPost.moral}
            </p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="text-left p-5 rounded-xl border border-border bg-card hover:border-accent/40 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {post.language}
              </span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
            <h4 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
              {post.title}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2">{post.preview}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageFunFacts;
