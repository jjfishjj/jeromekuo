import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMetadata } from "@/data/routeMetadata";

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

  useEffect(() => {
    const metadata = routeMetadata[pathname] ?? {
      title: "Page Not Found — Jerome Kuo",
      description: "The requested page could not be found.",
      index: false,
    };
    const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;

    document.title = metadata.title;
    upsertMeta('meta[name="description"]', "name", "description", metadata.description);
    upsertMeta('meta[name="robots"]', "name", "robots", metadata.index === false ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    upsertMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    upsertMeta('meta[property="og:image"]', "property", "og:image", socialImage);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", socialImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [pathname]);

  return null;
}
