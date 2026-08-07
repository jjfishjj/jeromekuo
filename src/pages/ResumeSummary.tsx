import { useEffect, useState } from "react";
import { ArrowLeft, ArrowUpRight, Cpu, MapPin, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const languages = ["zh", "en", "ja", "ko", "de", "fr", "es"] as const;
const themes = ["lime", "nvidia", "cobalt", "sand"] as const;
const roles = ["product", "solution", "devrel"] as const;

const validParam = <T extends readonly string[]>(value: string | null, values: T, fallback: T[number]) =>
  values.includes(value as T[number]) ? (value as T[number]) : fallback;

const items = [
  { id: "codenet", year: "2025 - NOW", company: "CodeNet", city: "Taipei", zh: "校園社群、配對平台、AI 面試與資料串接的產品規劃。", en: "Product planning for campus community, matching, AI interview, and data-integration products." },
  { id: "gamania", year: "2024 - 2026", company: "Gamania Digital Entertainment", city: "Taipei / Hong Kong", zh: "遊戲製作、玩家分析、生成式 AI 與創意工作流程。", en: "Game production, player analytics, GenAI, and creative workflow programs." },
  { id: "avmapping", year: "2023 - 2024", company: "A.V. Mapping", city: "Taipei / Berlin", zh: "AI 影音平台、創作者工具、國際展會與技術敘事。", en: "AI media platform, creator tools, international events, and technical storytelling." },
  { id: "metasens", year: "2020 - 2023", company: "METASENS / MetaFame", city: "Taipei", zh: "Web3 產品、NFT 營運、遊戲化活動與社群成長。", en: "Web3 products, NFT operations, gamified campaigns, and community growth." },
  { id: "imperium", year: "2018 - 2023", company: "Imperium Technology Group", city: "Hong Kong / Shenzhen", zh: "RFM、留存、分群與市場研究支援產品決策。", en: "RFM, retention, segmentation, and market research for product decisions." },
  { id: "huiria", year: "2014 - 2018", company: "Huiria Financial Leasing", city: "Shenzhen", zh: "CPU、GPU、主機板與半導體零組件的跨國供應鏈。", en: "International supply chains for CPU, GPU, motherboard, and semiconductor components." },
  { id: "chenghsi", year: "2012 - 2014", company: "Chenghsi.com", city: "Taiwan", zh: "以 Facebook API 打造社群音樂產品 Yogosong。", en: "Built Yogosong, a social music product concept using the Facebook API." },
];

const labels = {
  zh: { back: "返回完整履歷", title: "履歷足跡", lead: "城市、產業、產品與技術，串成一條可點擊的職涯路線。", open: "查看這段經歷", metric1: "跨產業年資", metric2: "城市與市場", metric3: "核心領域", foundation: "從材料研究到 AI 產品，累積端到端的技術視角。" },
  en: { back: "Back to resume", title: "Career Footprint", lead: "Cities, industries, products, and technologies connected as one navigable career path.", open: "View this experience", metric1: "Years across industries", metric2: "Cities and markets", metric3: "Core domains", foundation: "From materials research to AI products: an end-to-end technology perspective." },
  ja: { back: "履歴書に戻る", title: "キャリアの軌跡", lead: "都市、業界、製品、技術をつなぐ、クリック可能なキャリアパス。", open: "この職歴を見る", metric1: "業界横断の経験年数", metric2: "都市と市場", metric3: "中核領域", foundation: "材料研究からAI製品まで、エンドツーエンドの技術視点。" },
  ko: { back: "전체 이력서로 돌아가기", title: "커리어 발자취", lead: "도시, 산업, 제품과 기술을 하나의 탐색 가능한 경력 경로로 연결합니다.", open: "이 경력 보기", metric1: "산업 전반 경력", metric2: "도시 및 시장", metric3: "핵심 분야", foundation: "소재 연구부터 AI 제품까지 아우르는 엔드투엔드 기술 관점." },
  de: { back: "Zurück zum Lebenslauf", title: "Karriereweg", lead: "Städte, Branchen, Produkte und Technologien als navigierbarer Karriereweg.", open: "Station ansehen", metric1: "Jahre branchenübergreifend", metric2: "Städte und Märkte", metric3: "Kernbereiche", foundation: "Von der Materialforschung bis zum KI-Produkt: eine ganzheitliche Technologieperspektive." },
  fr: { back: "Retour au CV", title: "Parcours professionnel", lead: "Villes, secteurs, produits et technologies réunis en un parcours interactif.", open: "Voir cette expérience", metric1: "Années multisectorielles", metric2: "Villes et marchés", metric3: "Domaines clés", foundation: "De la recherche sur les matériaux aux produits IA : une vision technologique de bout en bout." },
  es: { back: "Volver al currículum", title: "Trayectoria profesional", lead: "Ciudades, sectores, productos y tecnologías conectados en una trayectoria interactiva.", open: "Ver esta experiencia", metric1: "Años entre sectores", metric2: "Ciudades y mercados", metric3: "Áreas clave", foundation: "Desde la investigación de materiales hasta productos de IA: una visión tecnológica integral." },
};

export default function ResumeSummary() {
  const [params] = useSearchParams();
  const lang = validParam(params.get("lang"), languages, "zh");
  const theme = validParam(params.get("theme"), themes, "lime");
  const role = validParam(params.get("role"), roles, "product");
  const text = labels[lang];
  const [progress, setProgress] = useState(0);
  const query = new URLSearchParams({ lang, theme, role }).toString();

  useEffect(() => {
    const update = () => setProgress(Math.min(100, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight) * 100));
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <main className={`resume-summary-native theme-${theme}`}>
    <div className="resume-progress" style={{ width: `${progress}%` }} />
    <header className="resume-summary-bar"><a href={`/resume?${query}`}><ArrowLeft />{text.back}</a><strong>JK<span>.</span> {text.title}</strong><span>{role.toUpperCase()}</span></header>
    <section className="summary-hero"><div><p>AI PRODUCT × DATA × GPU ECOSYSTEM</p><h1>{text.title}</h1><h2>{text.lead}</h2></div><div className="summary-metrics"><article><strong>13+</strong><span>{text.metric1}</span></article><article><strong>06</strong><span>{text.metric2}</span></article><article><strong>04</strong><span>{text.metric3}</span></article></div></section>
    <section className="summary-route">{items.map((item, index) => <article id={`map-${item.id}`} key={item.id}><div className="summary-route-index">{String(index + 1).padStart(2, "0")}</div><div><small>{item.year}</small><h2>{item.company}</h2><p>{lang === "zh" ? item.zh : item.en}</p><span><MapPin />{item.city}</span></div><a href={`/resume?${query}#job-${item.id}`}>{text.open}<ArrowUpRight /></a></article>)}</section>
    <footer className="summary-foundation"><Cpu /><div><small>SEMICONDUCTOR → HARDWARE → DATA → AI</small><h2>{text.foundation}</h2></div><Sparkles /></footer>
  </main>;
}
