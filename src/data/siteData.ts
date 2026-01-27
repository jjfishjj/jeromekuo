// Site-wide data configuration
// All content centralized for easy updates

export const siteConfig = {
  name: "JJ Fish",
  title: "Learning Systems · Memory Design · Applied Reflection",
  description: "跨領域創作者與系統設計者，結合學習科學、行為反思、語言與遊戲設計、數據分析與實作能力。",
  github: "https://github.com/jjfishjj",
  email: "TODO: 請補充 Email",
};

export const heroData = {
  greeting: "Hello, I'm",
  name: "JJ Fish",
  tagline: "Learning Systems · Memory Design · Applied Reflection",
  subtitle: "探索人如何學習與記憶，並將這些理解轉化為講座、系統化紀錄、軟體與遊戲設計。",
};

export const coreAxes = [
  {
    id: "memory",
    title: "Memory & Learning Systems",
    titleZh: "記憶與學習系統",
    description: "研究不同學習型態（視覺、聽覺、動覺、邏輯）與記憶結構，探討為何單一學習法無法適用所有人。",
    icon: "brain",
    link: "/memory",
  },
  {
    id: "reflection",
    title: "Daily Reflection as Data",
    titleZh: "日常反思作為資料",
    description: "將自我觀察、行為紀錄系統化，建立「記憶與行為資料化」的長期實驗型專案。",
    icon: "journal",
    link: "/journal",
  },
  {
    id: "applied",
    title: "Applied Tech / Game / Analytics",
    titleZh: "技術・遊戲・分析應用",
    description: "將學習理論應用於軟體開發、遊戲設計、語言學習與數據分析，創造有意義的互動體驗。",
    icon: "code",
    link: "/systems",
  },
];

export const learningStyles = {
  title: "Four Learning Styles",
  subtitle: "Understanding How People Learn",
  intro: "每個人吸收與保留資訊的方式不同。理解這些差異，是設計有效學習系統的第一步。",
  styles: [
    {
      id: "visual",
      name: "Visual",
      nameZh: "視覺型",
      color: "blue",
      description: "透過圖表、圖像、影片與顏色標記學習。看過一次就能記住。",
      strengths: ["擅長地圖與圖表", "視覺化筆記（心智圖）", "快速識別模式"],
      challenges: "對純文字或抽象內容較難專注",
      techniques: ["心智圖與流程圖", "符號與顏色標記", "教學影片與動畫", "心像技巧"],
    },
    {
      id: "auditory",
      name: "Auditory",
      nameZh: "聽覺型",
      color: "green",
      description: "透過講座、錄音與討論吸收資訊。聽比讀更有效。",
      strengths: ["有效運用錄音筆記", "口頭摘要與小組討論", "口語表達能力強"],
      challenges: "處理靜態圖表或公式較困難",
      techniques: ["錄音重播", "朗讀筆記", "節奏與韻律記憶", "對話與討論"],
    },
    {
      id: "kinesthetic",
      name: "Kinesthetic",
      nameZh: "動覺型",
      color: "orange",
      description: "透過實作、動作與身體記憶學習。「做中學」比被動聽講更有效。",
      strengths: ["手勢與角色扮演", "遊戲與閃卡", "實際操作練習"],
      challenges: "純抽象內容難以透過動作捕捉",
      techniques: ["手勢與動作配對", "角色扮演與模擬", "實物操作與製作"],
    },
    {
      id: "logical",
      name: "Logical / Verbal",
      nameZh: "邏輯/文字型",
      color: "purple",
      description: "偏好結構化文字、筆記、分類與邏輯大綱。",
      strengths: ["結構化筆記與摘要", "表格與符號系統", "邏輯推演"],
      challenges: "對高度視覺或動態內容較難適應",
      techniques: ["階層式大綱", "重點標記與摘要", "符號與縮寫系統", "邏輯分類法"],
    },
  ],
  crossTraining: {
    title: "Cross-Training: 混合學習法",
    description: "即使你傾向某種學習型態，混合運用不同方法能提升學習彈性與整體理解力。",
    examples: [
      { style: "視覺型", suggestion: "加入朗讀或小型實作任務" },
      { style: "聽覺型", suggestion: "嘗試繪圖或筆記來強化所聽內容" },
      { style: "動覺型", suggestion: "將動作與結構化筆記結合" },
      { style: "邏輯型", suggestion: "將文字轉換成圖像或口語韻律" },
    ],
  },
  personalMethods: {
    title: "My Training Methods",
    titleZh: "我的訓練方法",
    methods: [
      {
        category: "Visual Training",
        categoryZh: "視覺訓練",
        practices: [
          "將手機介面改為學習中的語言",
          "用不同語言做筆記（如韓文筆畫最少，書寫最快）",
          "眼動訓練：追蹤移動物體的軌跡",
          "樂譜訓練：將音樂符號與身體反應連結",
        ],
      },
      {
        category: "Auditory Training",
        categoryZh: "聽覺訓練",
        practices: [
          "聆聽時在腦中同步翻譯，強迫捕捉每個字",
          "聽到陌生音時，嘗試聯想已知語言的相似詞",
        ],
      },
      {
        category: "Logical Training",
        categoryZh: "邏輯訓練",
        practices: [
          "將長數字串拆解並轉換成邏輯模式",
          "記錄容易混淆的詞彙（如西班牙語與法語的混用）",
          "將資訊轉化為視覺化表格",
        ],
      },
      {
        category: "Kinesthetic Training",
        categoryZh: "動覺訓練",
        practices: [
          "刻意創造犯錯機會，因為錯誤會形成強烈記憶錨點",
          "設計自己的測驗與練習",
          "模仿舞台演講來訓練表達與傳遞",
        ],
      },
    ],
  },
};

export const journalProject = {
  title: "Daily Growth Journal",
  subtitle: "記憶與行為資料化的實驗",
  status: "Ongoing",
  github: "https://github.com/jjfishjj/daily-growth-journal",
  why: {
    title: "Why",
    content: "傳統日記記錄「發生了什麼」，但這個專案關注的是「我如何處理、吸收、並轉化經驗」。透過結構化的自我觀察，將抽象的成長過程轉換為可追蹤的資料。",
  },
  what: {
    title: "What",
    content: "記錄身體狀態、心理意識、行為模式等多維度資料。不是流水帳，而是有系統的反思結構。",
    dimensions: ["身體覺察", "心理狀態", "行為紀錄", "反思洞察"],
  },
  how: {
    title: "How",
    content: "建立可重複的紀錄框架，每日填寫固定維度，長期累積後進行模式分析。",
    structure: ["固定維度欄位", "每日紀錄習慣", "定期回顧與分析", "迭代優化結構"],
  },
  insight: {
    title: "Insight",
    content: "這個專案是學習型態理論的實踐證明：透過多感官紀錄（書寫、視覺化、邏輯分類），強化記憶與行為改變的連結。長期紀錄顯示，有意識的反思能加速模式識別與行為調整。",
  },
  note: "⚠️ 目前 GitHub Repo 顯示 404，可能為私有專案或已更名。請補充正確連結或專案細節。",
};

export const languageData = {
  title: "Language",
  subtitle: "語言作為認知與思維切換工具",
  intro: "語言不只是溝通能力，而是理解世界的不同接口。每種語言都帶來獨特的思維模式與文化視角。",
  languages: [
    { name: "中文", nameEn: "Chinese", level: "Native", note: "母語" },
    { name: "English", nameEn: "English", level: "Fluent", note: "工作語言" },
    { name: "한국어", nameEn: "Korean", level: "Intermediate", note: "筆記效率最高" },
    { name: "Español", nameEn: "Spanish", level: "Learning", note: "進行中" },
    { name: "Français", nameEn: "French", level: "Learning", note: "進行中" },
  ],
  insight: "有趣發現：法語中 'upload' 和 'download' 是同一個詞。這是透過頻繁的電腦介面視覺訓練發現的。",
  note: "⚠️ 語言清單基於 Gamma 文件推斷，請確認或補充實際情況。",
};

export const gameData = {
  title: "Game & Interaction Design",
  subtitle: "遊戲作為學習與行為設計的載體",
  intro: "遊戲機制（回饋循環、動機設計、記憶強化）與學習科學高度相關。好的遊戲設計，就是好的學習設計。",
  concepts: [
    {
      title: "Feedback Loops",
      titleZh: "回饋迴路",
      description: "即時回饋強化正確行為，是遊戲與學習共通的核心機制。",
    },
    {
      title: "Motivation Systems",
      titleZh: "動機系統",
      description: "內在動機（好奇心、掌握感）與外在動機（獎勵、進度）的平衡設計。",
    },
    {
      title: "Memory Reinforcement",
      titleZh: "記憶強化",
      description: "間隔重複、主動回憶、多感官刺激——遊戲化的記憶訓練方法。",
    },
  ],
  status: "Conceptual / Exploratory",
  note: "⚠️ 此區塊為概念探索，尚無具體專案。歡迎補充任何遊戲設計相關作品或想法。",
};

export const systemsData = {
  title: "Data & Systems Thinking",
  subtitle: "將反思與學習視為可分析的資料",
  intro: "日記是資料，學習型態是分類，行為觀察是時間序列。結構化思維讓抽象的成長變得可測量、可優化。",
  approaches: [
    {
      title: "Structured Documentation",
      titleZh: "結構化記錄",
      description: "將日常觀察轉換為固定格式的資料欄位",
    },
    {
      title: "Pattern Recognition",
      titleZh: "模式識別",
      description: "從長期資料中發現行為趨勢與觸發因素",
    },
    {
      title: "Iterative Optimization",
      titleZh: "迭代優化",
      description: "根據分析結果調整系統設計與個人習慣",
    },
  ],
  githubProjects: [
    { name: "code", description: "程式碼練習與實驗", status: "Exploratory" },
    { name: "Flutter", description: "Flutter 行動開發練習", status: "Practice" },
    { name: "gpt-ai-assistant", description: "OpenAI + LINE + Vercel 整合", status: "Fork" },
    { name: "avmapping", description: "AV Mapping 專案", status: "Exploratory" },
    { name: "0624ML-ximen", description: "機器學習實驗 (Jupyter Notebook)", status: "Practice" },
    { name: "reactclass", description: "React 課程練習", status: "Practice" },
  ],
  placeholder: "Future: Dashboard / Behavioral Analytics",
};

export const contactData = {
  title: "Contact",
  subtitle: "Let's Connect",
  intro: "如果你對「學習設計」、「系統化成長」、「遊戲化應用」有興趣，歡迎聯繫。",
  suitableTopics: [
    "學習科學與教育設計合作",
    "產品或遊戲中的行為回饋系統",
    "自我成長工具與方法論探討",
    "跨語言學習經驗分享",
  ],
  github: "https://github.com/jjfishjj",
  email: "TODO: 請補充 Email",
};

export const navigation = [
  { name: "Home", nameZh: "首頁", path: "/" },
  { name: "Memory & Learning", nameZh: "記憶與學習", path: "/memory" },
  { name: "Growth Journal", nameZh: "成長日誌", path: "/journal" },
  { name: "Language", nameZh: "語言", path: "/language" },
  { name: "Game", nameZh: "遊戲", path: "/game" },
  { name: "Systems", nameZh: "系統思維", path: "/systems" },
  { name: "Contact", nameZh: "聯絡", path: "/contact" },
];
