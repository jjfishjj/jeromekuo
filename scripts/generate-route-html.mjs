import { readFile, writeFile } from "node:fs/promises";

const siteUrl = "https://jeromekuo.vercel.app";
const metadata = JSON.parse(await readFile(new URL("../src/data/routeMetadata.json", import.meta.url), "utf8"));
const pageFaqs = JSON.parse(await readFile(new URL("../src/data/pageFaq.json", import.meta.url), "utf8"));
const seoPageContent = JSON.parse(await readFile(new URL("../src/data/seoPageContent.json", import.meta.url), "utf8"));
const template = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const escapeJsonForHtml = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");

function replaceMeta(html, attribute, key, content) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(<meta ${attribute}="${escapedKey}" content=")[^"]*("\\s*\\/?>)`);
  if (pattern.test(html)) {
    return html.replace(pattern, (_match, before, after) => `${before}${escapeHtml(content)}${after}`);
  }
  return html.replace("</head>", `  <meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(content)}" />\n  </head>`);
}

function renderStaticArticle(route, page) {
  const faqKey = route.slice(1);
  const faqs = pageFaqs[faqKey]?.zh;
  const content = seoPageContent[route];
  if (!faqs || !content) return { jsonLd: "", fallback: "" };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
  const jsonLd = `<script id="page-faq-jsonld" type="application/ld+json">${escapeJsonForHtml(faqPage)}</script>`;
  const sections = content.sections.map((section) => {
    const links = (section.links ?? []).map((link) => `<a href="${escapeHtml(link.url)}" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join(" · ");
    return `<section><h2>${escapeHtml(section.heading)}</h2><p>${escapeHtml(section.body)}</p>${links ? `<p>${links}</p>` : ""}</section>`;
  }).join("");
  const faqHtml = faqs.map(({ question, answer }) => `<section><h3>${escapeHtml(question)}</h3><p>${escapeHtml(answer)}</p></section>`).join("");
  const contactForm = route === "/contact" ? `<section aria-labelledby="fallback-contact-heading"><h2 id="fallback-contact-heading">傳送合作訊息</h2><form action="/api/contact" method="post"><p><label for="fallback-contact-name">姓名（必填）</label><br><input id="fallback-contact-name" name="name" type="text" autocomplete="name" maxlength="100" required></p><p><label for="fallback-contact-email">電子郵件（必填）</label><br><input id="fallback-contact-email" name="email" type="email" autocomplete="email" maxlength="254" required></p><p><label for="fallback-contact-topic">聯絡主題（必填）</label><br><select id="fallback-contact-topic" name="topic" required><option value="" disabled selected>請選擇主題</option><option value="product">AI／產品／技術合作</option><option value="learning">學習系統與記憶設計</option><option value="speaking">演講、工作坊或媒體邀約</option><option value="other">其他</option></select></p><p><label for="fallback-contact-message">訊息內容（必填）</label><br><textarea id="fallback-contact-message" name="message" minlength="10" maxlength="5000" rows="6" required></textarea></p><div aria-hidden="true" style="position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden"><label for="fallback-contact-website">Leave blank</label><input id="fallback-contact-website" name="website" type="text" tabindex="-1" autocomplete="off"></div><p>訊息會透過電子郵件服務轉交網站管理者；請勿填入密碼或敏感個人資料。</p><button type="submit">送出訊息</button></form></section>` : "";
  const fallback = `<noscript><main class="seo-fallback" lang="zh-Hant"><article><h1>${escapeHtml(content.heading)}</h1><p>${escapeHtml(content.intro)}</p>${sections}${contactForm}<section><h2>常見問題</h2>${faqHtml}</section></article></main></noscript>`;
  return { jsonLd, fallback };
}

for (const [route, page] of Object.entries(metadata)) {
  if (route === "/" || route === "/resume" || page.index === false) continue;

  const url = `${siteUrl}${route}`;
  const title = page.title;
  const description = page.description;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*("\s*\/>)/, (_match, before, after) => `${before}${escapeHtml(description)}${after}`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/>)/, (_match, before, after) => `${before}${url}${after}`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/>)/, (_match, before, after) => `${before}${url}${after}`)
    .replace(/(<meta property="og:title" content=")[^"]*("\s*\/>)/, (_match, before, after) => `${before}${escapeHtml(title)}${after}`)
    .replace(/(<meta property="og:description" content=")[^"]*("\s*\/>)/, (_match, before, after) => `${before}${escapeHtml(description)}${after}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*("\s*\/>)/, (_match, before, after) => `${before}${escapeHtml(title)}${after}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*("\s*\/>)/, (_match, before, after) => `${before}${escapeHtml(description)}${after}`);

  html = replaceMeta(html, "property", "og:type", route === "/memory" || route === "/journal" ? "article" : "website");
  html = replaceMeta(html, "property", "og:site_name", "Jerome Kuo Portfolio");
  if (page.keywords) {
    html = replaceMeta(html, "name", "keywords", page.keywords);
  } else {
    html = html.replace(/\s*<meta name="keywords" content="[^"]*"\s*\/?>\s*/, "\n");
  }
  html = replaceMeta(html, "name", "twitter:card", "summary_large_image");

  const { jsonLd, fallback } = renderStaticArticle(route, page);
  if (jsonLd) html = html.replace("</head>", `${jsonLd}\n</head>`);
  if (fallback) html = html.replace("</body>", `${fallback}\n</body>`);

  await writeFile(new URL(`../dist/${route.slice(1)}.html`, import.meta.url), html);
}

const vercelConfig = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"));
const resumeSummaryRewrite = vercelConfig.rewrites?.find(({ source }) => source === "/resume/summary");
if (resumeSummaryRewrite?.destination !== "/resume-summary.html") {
  throw new Error("/resume/summary must rewrite to its resume-summary static HTML artifact");
}
const netlifyRedirects = await readFile(new URL("../public/_redirects", import.meta.url), "utf8");
if (!netlifyRedirects.split(/\r?\n/).some((line) => line.trim() === "/resume/summary /resume-summary.html 200")) {
  throw new Error("Netlify /resume/summary must redirect to its resume-summary static HTML artifact");
}

const resumeSummaryMetadata = metadata["/resume-summary"];
const resumeSummaryHtml = await readFile(new URL("../dist/resume-summary.html", import.meta.url), "utf8");
const expectedResumeSummaryCanonical = `${siteUrl}/resume-summary`;
if (!resumeSummaryMetadata || !resumeSummaryHtml.includes(`<title>${escapeHtml(resumeSummaryMetadata.title)}</title>`)
  || !resumeSummaryHtml.includes(`<link rel="canonical" href="${expectedResumeSummaryCanonical}"`)) {
  throw new Error("The resume-summary static artifact must include its route-specific title and canonical URL");
}
