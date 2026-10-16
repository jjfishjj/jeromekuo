import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMetadata } from "@/data/routeMetadata";
import pageFaqData from "@/data/pageFaq.json";
import { useLanguage } from "@/i18n/LanguageContext";

const siteUrl = "https://jeromekuo.vercel.app";
const socialImage = `${siteUrl}/jerome-kuo-og.png`;
const upsertMeta = (selector: string, attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const metadataPath = pathname === "/resume/summary" ? "/resume-summary" : pathname;
    const metadata = routeMetadata[metadataPath] ?? {
      title: "Page Not Found — Jerome Kuo",
      description: "The requested page could not be found.",
      index: false,
    };
    const canonicalUrl = `${siteUrl}${metadataPath === "/" ? "/" : metadataPath}`;

    document.title = metadata.title;
    upsertMeta('meta[name="description"]', "name", "description", metadata.description);
    if ("keywords" in metadata && metadata.keywords) {
      upsertMeta('meta[name="keywords"]', "name", "keywords", metadata.keywords);
    } else {
      document.head.querySelector('meta[name="keywords"]')?.remove();
    }
    upsertMeta('meta[name="robots"]', "name", "robots", metadata.index === false ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    upsertMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    const openGraphType = pathname === "/resume" ? "profile" : pathname === "/memory" || pathname === "/journal" ? "article" : "website";
    upsertMeta('meta[property="og:type"]', "property", "og:type", openGraphType);
    upsertMeta('meta[property="og:site_name"]', "property", "og:site_name", "Jerome Kuo Portfolio");
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", socialImage);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", socialImage);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const faqPageKey = pathname === "/memory" ? "memory" : pathname === "/journal" ? "journal" : pathname === "/contact" ? "contact" : null;
    const faqTranslations = faqPageKey ? pageFaqData[faqPageKey] : null;
    const faqs = faqTranslations?.[lang] ?? faqTranslations?.zh;
    const faqScript = document.getElementById("page-faq-jsonld") as HTMLScriptElement | null;
    if (faqs) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      };
      const script = faqScript ?? document.createElement("script");
      script.id = "page-faq-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema).replace(/</g, "\\u003c");
      if (!faqScript) document.head.appendChild(script);
    } else {
      faqScript?.remove();
    }
  }, [pathname, lang]);

  return null;
}
