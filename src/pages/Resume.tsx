import { useEffect, useState } from "react";
import {
  ArrowDownRight, ArrowUpRight, BarChart3, Bot, Boxes, BriefcaseBusiness,
  Cpu, Download, Github, GraduationCap, Languages, Linkedin, MapPin, Menu,
  Microscope, Printer, Sparkles, X,
} from "lucide-react";

type Lang = "zh" | "en";
type RoleTrack = "product" | "solution" | "devrel";
type Localized = { zh: string; en: string };
const tx = (value: Localized, lang: Lang) => value[lang];

const links = {
  linkedin: "https://www.linkedin.com/in/kuo-jun-bin-%EC%A4%80%EB%B9%88-jerome-0a224490/",
  github: "https://github.com/jjfishjj",
  dashboard: "https://jjfishjj.github.io/linkedin/",
  analytics: "https://jjfishjj.github.io/projects/data-analytics-visualization/",
  source: "https://docs.google.com/document/d/1R5zm1siMvTdb8IQHI72AaJNAJgbBOD6iK9boaT4W5Tg/edit",
};

const strengths = [
  { icon: Bot, eyebrow: "01 / AI PRODUCT", title: { zh: "AI 產品與專案管理", en: "AI Product & Program Management" }, text: { zh: "串聯模型能力、使用者情境、跨部門執行與商業目標，推進生成式 AI 產品與內部 enablement。", en: "Connect model capabilities, user needs, cross-functional execution, and business goals to deliver GenAI products and internal enablement." } },
  { icon: BarChart3, eyebrow: "02 / DATA", title: { zh: "遊戲與產品分析", en: "Game & Product Analytics" }, text: { zh: "事件追蹤、RFM 分群、留存、漏斗與 dashboard；以 SQL／Python／Tableau 導向分析支援決策。", en: "Event tracking, RFM segmentation, retention, funnels, and dashboards, supported by SQL-, Python-, and Tableau-oriented analysis." } },
  { icon: Sparkles, eyebrow: "03 / SOLUTIONS", title: { zh: "生成式 AI 解決方案", en: "Generative AI Solutions" }, text: { zh: "涵蓋文字、圖片、影片、3D 與程式原型，能把快速變動的 AI 工具轉化為清楚的工作流程。", en: "Hands-on workflows across text, image, video, 3D, and code prototyping, translating fast-moving AI tools into usable processes." } },
  { icon: Cpu, eyebrow: "04 / HARDWARE", title: { zh: "硬體與半導體視角", en: "Hardware & Semiconductor Lens" }, text: { zh: "結合半導體薄膜研究與 CPU／GPU／主機板供應鏈經驗，理解 AI 軟體背後的硬體脈絡。", en: "Combines semiconductor thin-film research with CPU, GPU, and motherboard supply-chain experience to understand AI from silicon to product." } },
];

const nvidiaTracks = [
  { id: "product" as RoleTrack, title: "AI PRODUCT / TPM", fit: "PRIMARY FIT", headline: { zh:"把 AI 能力轉化為可衡量的產品成果", en:"Turning AI capabilities into measurable product outcomes" }, body: { zh: "AI 產品生命週期、資料驅動決策、跨部門推進，以及對 GPU／推論成本與硬體生態的產品意識。", en: "AI product lifecycle ownership, data-informed prioritization, cross-functional execution, and fluency in GPU economics and inference trade-offs." } },
  { id: "solution" as RoleTrack, title: "SOLUTION ARCHITECT", fit: "STRONG ADJACENCY", headline: { zh:"連結客戶問題、原型與可部署架構", en:"Connecting customer problems, prototypes, and deployable architectures" }, body: { zh: "能把生成式 AI 工具、原型與客戶需求轉成可溝通的解決方案；目前聚焦 NIM、RAG 與推論服務整合。", en: "Translate customer requirements and GenAI prototypes into clear solution narratives, with current focus on NIM, RAG, and inference-service integration." } },
  { id: "devrel" as RoleTrack, title: "TECHNICAL MARKETING / DEVREL", fit: "DIFFERENTIATED FIT", headline: { zh:"讓技術被理解、採用並形成社群影響力", en:"Making technology understandable, adoptable, and community-driven" }, body: { zh: "具國際展會、獎項、workshop、產品敘事與雙語內容經驗，適合連結技術、社群與市場。", en: "Bring together international events, workshops, bilingual technical storytelling, and product marketing to connect developers, technology, and market adoption." } },
];

const projectCases = [
  { status:{zh:"建置中",en:"IN PROGRESS"}, title:"NIM + RAG KNOWLEDGE ASSISTANT", tools:"NVIDIA NIM · RAG · MemoLingua", body:{zh:"將 MemoLingua 語言學習內容轉成具來源引用的問答流程，驗證延遲、答案品質與產品採用情境。",en:"A citation-grounded learning assistant for MemoLingua, designed to evaluate latency, answer quality, and product adoption scenarios."}, roles:["product","solution"] as RoleTrack[] },
  { status:{zh:"計畫中",en:"PLANNED"}, title:"RAPIDS RFM BENCHMARK", tools:"cuDF · cuML · Python · RFM", body:{zh:"把既有玩家 RFM／留存分析流程移植到 GPU，對照 pandas 與 cuDF 的處理時間並發表雙語 benchmark。",en:"A bilingual benchmark migrating an existing player RFM and retention workflow from pandas to GPU-accelerated cuDF."}, roles:["product","solution","devrel"] as RoleTrack[] },
  { status:{zh:"概念驗證",en:"PROOF OF CONCEPT"}, title:"JETSON EDGE AI EXPERIENCE", tools:"Jetson Nano · Computer Vision · DLI", body:{zh:"延伸已完成的 Jetson Nano DLI 訓練，設計可在邊緣裝置示範的互動辨識體驗與產品敘事。",en:"Extending completed Jetson Nano DLI training into an edge-AI interaction concept with a clear demo and product narrative."}, roles:["solution","devrel"] as RoleTrack[] },
];

const trackEvent = (name: string, properties: Record<string, string> = {}) => window.dispatchEvent(new CustomEvent("resume:analytics", { detail: { name, ...properties } }));

const jobs = [
  { year: "2025 — NOW", company: "CodeNet", role: { zh: "專案經理", en: "Project Manager" }, location: { zh: "台北，台灣", en: "Taipei, Taiwan" }, intro: { zh: "負責 pei.com.tw 校園社群與 love.pei.com.tw 配對平台的產品規劃、資料串接與開發協作。", en: "Lead product planning, data integrations, and development coordination for pei.com.tw campus community and love.pei.com.tw matching products." }, points: [
    { zh: "規劃職涯路徑與活動分群，提升留存、瀏覽深度與學生社群互動", en: "Designed career-path and event segmentation experiences to improve retention, browsing depth, and student engagement" },
    { zh: "主導校園活動前端功能與後台審核，串接課程評價、升學資料及 AI 面試服務", en: "Led campus-event frontend and moderation workflows, integrating course reviews, education data, and an AI interview service" },
    { zh: "優化配對邏輯、追蹤框架、身分驗證與產品子網域遷移", en: "Improved matching logic, analytics tracking, identity verification, and product subdomain migration" },
  ]},
  { year: "2024 — 2026", company: "Gamania Digital Entertainment (HK)", role: { zh: "AI 暨數據影視專案經理", en: "AI, Data & Media Project Manager" }, location: { zh: "台北，台灣", en: "Taipei, Taiwan" }, intro: { zh: "主導遊戲製作、內部工作流最佳化與創意素材開發相關的 AI 與數據專案。", en: "Led AI and data initiatives across game production, internal workflow optimization, and creative asset development." }, points: [
    { zh: "將 AI 整合至 Google Analytics 流程，以事件、漏斗、分群與留存支援產品決策", en: "Integrated AI into Google Analytics workflows using events, funnels, cohorts, and retention signals for product decisions" },
    { zh: "設計玩家行為分析架構與 dashboard，釐清資料定義及報表邏輯", en: "Designed player-behavior analytics and dashboards while aligning data definitions and reporting logic" },
    { zh: "導入 AI 影片修改流程，協調小遊戲原型、素材製作與資料追蹤", en: "Introduced AI-assisted video iteration and coordinated game prototypes, creative production, and instrumentation" },
  ]},
  { year: "2023 — 2024", company: "A.V. Mapping", role: { zh: "專案經理", en: "Project Manager" }, location: { zh: "台北，台灣", en: "Taipei, Taiwan" }, intro: { zh: "為 AI 影片／音樂配對與創意科技平台規劃產品功能、創作者情境與 go-to-market 敘事。", en: "Planned product features, creator workflows, and go-to-market narratives for an AI video/music matching platform." }, points: [
    { zh: "支援 2024 iF Design Award 與柏林影展／歐洲電影市場國際溝通", en: "Supported international communications for the 2024 iF Design Award and Berlinale / European Film Market" },
    { zh: "規劃創作者工具、互動旅程、遊戲化 campaign 與跨部門執行", en: "Planned creator tools, interactive journeys, gamified campaigns, and cross-functional execution" },
    { zh: "舉辦 AI 研討會、workshop 與合作活動，提升產品能見度", en: "Produced AI seminars, workshops, and partner events to grow product visibility" },
  ]},
  { year: "2020 — 2023", company: "METASENS / MetaFame", role: { zh: "副行銷主管／專案經理", en: "Deputy Marketing Lead / Project Manager" }, location: { zh: "台北，台灣", en: "Taipei, Taiwan" }, intro: { zh: "串聯 Web3 產品規劃、NFT 營運、token campaign 與遊戲社群成長。", en: "Connected Web3 product planning, NFT operations, token campaigns, and gaming-community growth." }, points: [
    { zh: "設計遊戲化使用者旅程、獎勵機制、社群任務與 NFT campaign", en: "Designed gamified user journeys, reward mechanics, community missions, and NFT campaigns" },
    { zh: "分析平台、campaign 與使用者行為資料，支援產品及行銷決策", en: "Analyzed platform, campaign, and behavioral data to support product and marketing decisions" },
  ]},
  { year: "2018 — 2023", company: "Imperium Technology Group", role: { zh: "資料分析師", en: "Data Analyst" }, location: { zh: "香港／深圳", en: "Hong Kong / Shenzhen" }, intro: { zh: "以使用者資料與市場研究支援集團數位產品及區域決策。", en: "Supported digital products and regional decisions through user analytics and market research." }, points: [
    { zh: "運用 Google Analytics、RFM、分群、留存與標籤分析", en: "Applied Google Analytics, RFM, segmentation, retention, and tagging analysis" },
    { zh: "將平台 sustainability 從 10% 提升至 60%", en: "Improved platform sustainability from 10% to 60%" },
    { zh: "與清華大學科技法律研究中心合作研究與編輯 newsletter", en: "Collaborated with a Tsinghua University research center on research and newsletter editing" },
  ]},
  { year: "2014 — 2018", company: "Huiria Financial Leasing", role: { zh: "電子零組件採購與產品經理", en: "Electronics Procurement & Product Manager" }, location: { zh: "深圳，中國", en: "Shenzhen, China" }, intro: { zh: "管理電腦硬體產品採購與商品規劃，建立跨國供應鏈實務基礎。", en: "Managed computer-hardware procurement and product planning across an international supply chain." }, points: [
    { zh: "接觸 CPU、GPU、主機板、半導體與晶圓相關零組件", en: "Covered CPU, GPU, motherboard, semiconductor, and wafer-related component categories" },
    { zh: "協調台灣、中國、歐洲供應商，管理庫存、報價與交期", en: "Coordinated suppliers across Taiwan, China, and Europe; managed inventory, quotes, and lead times" },
    { zh: "以物流及成本控管降低約 20% 空運成本", en: "Reduced air-freight costs by approximately 20% through logistics and cost controls" },
  ]},
  { year: "2012 — 2014", company: "Chenghsi.com", role: { zh: "專案經理／共同創辦人", en: "Project Manager / Co-founder" }, location: { zh: "", en: "" }, intro: { zh: "開發 Facebook API 社群音樂 App 概念 Yogosong。", en: "Developed Yogosong, a social music app concept built on the Facebook API." }, points: [
    { zh: "參與產品功能、市場研究與早期營運", en: "Contributed to product features, market research, and early operations" },
  ]},
];

const copy = {
  nav: { about:{zh:"關於",en:"About"}, strengths:{zh:"專長",en:"Strengths"}, fit:{zh:"AI 定位",en:"AI Fit"}, experience:{zh:"經歷",en:"Experience"}, education:{zh:"學歷",en:"Education"} },
  available:{zh:"台北・開放 AI 產品與跨域合作機會",en:"Taipei · Open to AI product and cross-domain opportunities"},
  overline:{zh:"AI 產品 × 數據 × GPU 生態視角",en:"AI PRODUCT × DATA × GPU ECOSYSTEM LENS"},
  heroA:{zh:"把複雜技術，",en:"Turning complex technology"}, heroB:{zh:"變成可用的產品。",en:"into products people can use."},
  intro:{zh:"我是郭浚彬 Jerome，一位橫跨生成式 AI、遊戲數據、創意科技、半導體研究與硬體供應鏈的產品／專案經理。",en:"I’m Jerome Kuo, a product and project manager spanning generative AI, game analytics, creative technology, semiconductor research, and hardware supply chains."},
  explore:{zh:"探索我的經歷",en:"Explore my experience"},
  aboutTitle:{zh:"從材料、GPU 生態到 AI 應用，建立完整的產品視角。",en:"A product perspective spanning materials, the GPU ecosystem, and AI applications."},
  aboutBody:{zh:"我擅長在創意、資料與技術之間建立共同語言，把新工具轉化為可驗證的產品流程。獨特背景結合半導體薄膜研究、CPU／GPU 供應鏈、遊戲行為分析、生成式 AI 產製與國際產品溝通。",en:"I build shared language across creative, data, and technical teams, turning emerging tools into testable product workflows. My background uniquely combines semiconductor thin-film research, CPU/GPU supply chains, game analytics, GenAI production, and international product communications."},
  strengthTitle:{zh:"面向 AI 時代的跨域能力",en:"Cross-domain strengths for the AI era"},
  strengthSub:{zh:"從 GPU 與資料，到工作流程與市場落地。",en:"From GPUs and data to workflows and market execution."},
  fitTitle:{zh:"NVIDIA／AI 職涯定位",en:"NVIDIA / AI Career Positioning"},
  fitSub:{zh:"以已具備的產品與溝通能力切入，再逐步補強推論服務實作。",en:"Lead with proven product and communication strengths, then deepen inference-service implementation."},
  dli:{zh:"NVIDIA DLI 已完成",en:"NVIDIA DLI Completed"},
  experienceTitle:{zh:"工作經歷",en:"Experience"},
  experienceSub:{zh:"AI、遊戲、Web3、分析、供應鏈與早期創業。",en:"AI, gaming, Web3, analytics, supply chain, and early-stage entrepreneurship."},
  researchTitle:{zh:"從半導體材料，建立硬體思維。",en:"A hardware mindset grounded in semiconductor materials."},
  researchBody:{zh:"於國立交通大學固態實驗室研究碳摻雜 TiO₂ 半導體薄膜，使用 XANES、XRD、ESCA／XPS、同步輻射與磁性量測，探索晶體結構、缺陷態與感測應用。",en:"Researched carbon-doped TiO₂ semiconductor thin films at National Chiao Tung University’s Solid State Laboratory, using XANES, XRD, ESCA/XPS, synchrotron analysis, and magnetic measurements to study crystal structures, defect states, and sensing applications."},
  educationTitle:{zh:"學歷與認證",en:"Education & Credentials"},
  selected:{zh:"精選作品",en:"SELECTED WORK"},
  workTitle:{zh:"把想法做成\n看得見的成果。",en:"Turning ideas into\nvisible outcomes."},
  contact:{zh:"有一個值得一起解的問題？",en:"Have a problem worth solving together?"},
  build:{zh:"一起打造下一個產品",en:"LET'S BUILD SOMETHING"},
};

export default function Resume() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    return requested === "en" || requested === "zh" ? requested : (localStorage.getItem("resume-lang") as Lang) || "zh";
  });
  const [role, setRole] = useState<RoleTrack>(() => {
    const requested = new URLSearchParams(window.location.search).get("role");
    return requested === "solution" || requested === "devrel" ? requested : "product";
  });
  const c = <K extends keyof typeof copy>(key: K) => tx(copy[key] as Localized, lang);
  const setLanguage = (next: Lang) => { setLang(next); localStorage.setItem("resume-lang", next); trackEvent("language_change", { language: next }); };
  const setRoleTrack = (next: RoleTrack) => {
    setRole(next);
    const url = new URL(window.location.href);
    url.searchParams.set("role", next);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url);
    trackEvent("role_view", { role: next, language: lang });
  };

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.title = lang === "zh" ? "Jerome Kuo — AI 產品與專案經理" : "Jerome Kuo — AI Product & Project Manager";
    const description = lang === "zh" ? "Jerome Kuo 的 AI 產品、解決方案架構與技術行銷履歷，橫跨生成式 AI、數據分析、GPU 生態與半導體供應鏈。" : "Jerome Kuo is an AI product and program leader spanning GenAI, analytics, GPU ecosystems, technical storytelling, and semiconductor supply chains.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
  }, [lang]);

  const nav = [["about", tx(copy.nav.about,lang)], ["strengths",tx(copy.nav.strengths,lang)], ["ai-fit",tx(copy.nav.fit,lang)], ["experience",tx(copy.nav.experience,lang)], ["education",tx(copy.nav.education,lang)]];

  return <main className={`resume-page lang-${lang}`}>
    <header className="resume-nav">
      <a className="resume-mark" href="#top" aria-label={lang === "zh" ? "回到頂端" : "Back to top"}>JK<span>.</span></a>
      <nav className={open ? "is-open" : ""} aria-label={lang === "zh" ? "履歷導覽" : "Resume navigation"}>{nav.map(([id,label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}</nav>
      <div className="resume-nav-tools">
        <div className="resume-lang" aria-label="Language"><Languages/><button className={lang === "zh" ? "active" : ""} onClick={() => setLanguage("zh")}>中</button><span>/</span><button className={lang === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button></div>
        <button className="resume-print" onClick={() => window.print()}><Printer/>{lang === "zh" ? "列印" : "Print"}</button>
        <a className="resume-nav-cta" href="mailto:guocheju@gmail.com">LET'S TALK <ArrowUpRight/></a>
      </div>
      <button className="resume-menu" onClick={() => setOpen(!open)} aria-label={lang === "zh" ? "切換選單" : "Toggle menu"}>{open ? <X/> : <Menu/>}</button>
    </header>

    <section id="top" className="resume-hero">
      <div className="resume-kicker"><span/>{c("available")}</div>
      <div className="resume-hero-grid"><div><p className="resume-overline">{c("overline")}</p><h1>{c("heroA")}<br/><span>{c("heroB")}</span></h1></div><div className="resume-hero-aside"><p>{c("intro")}</p><div className="resume-actions"><a className="resume-primary" href="#experience">{c("explore")}<ArrowDownRight/></a><a className="resume-icon-link" href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a className="resume-icon-link" href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a></div></div></div>
      <div className="resume-stats"><div><strong>13+</strong><span>YEARS ACROSS INDUSTRIES</span></div><div><strong>04</strong><span>CONNECTED DOMAINS</span></div><div><strong>10→60%</strong><span>PLATFORM SUSTAINABILITY</span></div><div><strong>20%</strong><span>AIR FREIGHT COST SAVED</span></div></div>
    </section>

    <section id="about" className="resume-about resume-section"><div className="resume-section-label">01 / ABOUT</div><div className="resume-about-copy"><h2>{c("aboutTitle")}</h2><p>{c("aboutBody")}</p><div className="resume-chip-row"><span>AI PRODUCT / TPM</span><span>GENAI WORKFLOW</span><span>PRODUCT ANALYTICS</span><span>GPU ECOSYSTEM</span><span>TECHNICAL STORYTELLING</span></div></div></section>

    <section id="strengths" className="resume-section resume-strengths"><div className="resume-heading-row"><div><div className="resume-section-label">02 / CORE STRENGTHS</div><h2>{c("strengthTitle")}</h2></div><p>{c("strengthSub")}</p></div><div className="resume-strength-grid">{strengths.map(s => {const Icon=s.icon;return <article key={s.eyebrow}><div className="resume-card-top"><span>{s.eyebrow}</span><Icon/></div><h3>{tx(s.title,lang)}</h3><p>{tx(s.text,lang)}</p></article>})}</div></section>

    <section id="ai-fit" className="resume-section resume-ai-fit"><div className="resume-heading-row"><div><div className="resume-section-label">03 / NVIDIA + AI POSITIONING</div><h2>{c("fitTitle")}</h2></div><p>{c("fitSub")}</p></div><div className="resume-role-picker" role="group" aria-label={lang === "zh" ? "選擇職缺版本" : "Choose a role version"}>{nvidiaTracks.map(track => <button key={track.id} className={role === track.id ? "active" : ""} onClick={() => setRoleTrack(track.id)}><small>{track.fit}</small><strong>{track.title}</strong></button>)}</div><div className="resume-role-focus"><span>{lang === "zh" ? "目前版本" : "CURRENT VERSION"}</span><h3>{tx(nvidiaTracks.find(track => track.id === role)!.headline,lang)}</h3><p>{tx(nvidiaTracks.find(track => track.id === role)!.body,lang)}</p></div><div className="resume-dli"><div><Cpu/><span>{c("dli")}</span></div><ul><li>{lang === "zh" ? "深度學習基礎理論與實踐" : "Fundamentals of Deep Learning"}</li><li>{lang === "zh" ? "快速開發 LLM 應用程式" : "Rapid Application Development with LLMs"}</li><li>{lang === "zh" ? "Jetson Nano AI 應用開發" : "AI Development with Jetson Nano"}</li></ul></div></section>

    <section className="resume-section resume-cases"><div className="resume-heading-row"><div><div className="resume-section-label">04 / NVIDIA PROJECT ROADMAP</div><h2>{lang === "zh" ? "從學習證明，走向可展示案例。" : "From learning credentials to demonstrable work."}</h2></div><p>{lang === "zh" ? "案例狀態公開標示；完成後將補上原始碼、架構與 benchmark。" : "Statuses are explicit. Source code, architecture, and benchmarks will be added as each project ships."}</p></div><div className="resume-case-grid">{projectCases.filter(item => item.roles.includes(role)).map(item => <article key={item.title}><div><span>{tx(item.status,lang)}</span><small>{item.tools}</small></div><h3>{item.title}</h3><p>{tx(item.body,lang)}</p></article>)}</div></section>

    <section id="experience" className="resume-section resume-experience"><div className="resume-heading-row"><div><div className="resume-section-label">04 / EXPERIENCE</div><h2>{c("experienceTitle")}</h2></div><p>{c("experienceSub")}</p></div><div className="resume-job-list">{jobs.map((job,i)=><article className="resume-job" key={job.company}><div className="resume-job-year">{job.year}</div><div className="resume-job-main"><div className="resume-job-title"><div><span>0{i+1}</span><h3>{job.company}</h3></div><p>{tx(job.role,lang)}</p></div><p className="resume-job-intro">{tx(job.intro,lang)}</p><ul>{job.points.map(p=><li key={p.en}>{tx(p,lang)}</li>)}</ul></div><div className="resume-job-place">{tx(job.location,lang)&&<><MapPin/>{tx(job.location,lang)}</>}</div></article>)}</div></section>

    <section className="resume-research resume-section"><div className="resume-research-icon"><Microscope/></div><div><div className="resume-section-label">05 / RESEARCH FOUNDATION</div><h2>{c("researchTitle")}</h2><p>{c("researchBody")}</p></div><div className="resume-research-tags"><span>SEMICONDUCTOR</span><span>THIN FILM</span><span>MAGNETIC SENSING</span><span>XANES / XRD / XPS</span></div></section>

    <section id="education" className="resume-section resume-education"><div className="resume-heading-row"><div><div className="resume-section-label">06 / EDUCATION</div><h2>{c("educationTitle")}</h2></div><GraduationCap/></div><div className="resume-edu-grid"><article><span>2012</span><h3>{lang === "zh" ? "北京清華大學" : "Tsinghua University"}</h3><p>{lang === "zh" ? "交換專案" : "Exchange Program"}</p></article><article><span>2009 — 2011</span><h3>{lang === "zh" ? "國立交通大學" : "National Chiao Tung University"}</h3><p>{lang === "zh" ? "電子物理" : "Electrophysics"}</p></article><article><span>2005 — 2009</span><h3>{lang === "zh" ? "國立中央大學" : "National Central University"}</h3><p>{lang === "zh" ? "電機工程" : "Electrical Engineering"}</p></article></div><div className="resume-awards"><span>Google Ads Display / Search Certification</span><span>{lang === "zh" ? "台灣英語導遊" : "Taiwan English Tour Guide"}</span><span>Epson CSR Japan Project</span><span>Milano Expo 2015 Volunteer / Museum Docent</span></div></section>

    <section className="resume-work resume-section"><div><div className="resume-section-label">{c("selected")}</div><h2>{c("workTitle").split("\n").map((line,i)=><span key={line}>{line}{i===0&&<br/>}</span>)}</h2></div><div className="resume-link-list"><a href={links.github} target="_blank" rel="noreferrer"><span><Github/>GitHub Portfolio</span><ArrowUpRight/></a><a href={links.dashboard} target="_blank" rel="noreferrer"><span><Boxes/>{lang === "zh" ? "3D 經歷儀表板" : "3D Career Dashboard"}</span><ArrowUpRight/></a><a href={links.analytics} target="_blank" rel="noreferrer"><span><BarChart3/>{lang === "zh" ? "數據分析案例頁" : "Data Analytics Case Study"}</span><ArrowUpRight/></a><a href="/Jerome-Kuo-Resume.pdf" download><span><Download/>{lang === "zh" ? "下載 PDF 履歷" : "Download PDF Resume"}</span><ArrowDownRight/></a></div></section>

    <footer className="resume-footer"><p>{c("contact")}</p><a href="mailto:guocheju@gmail.com">{c("build")}<ArrowUpRight/></a><div><span>© 2026 JEROME KUO</span><span>TAIPEI, TAIWAN</span><a href={links.source} target="_blank" rel="noreferrer"><BriefcaseBusiness/>{lang === "zh" ? "原始履歷" : "Source Resume"}</a></div></footer>
  </main>;
}
