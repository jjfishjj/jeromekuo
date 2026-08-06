import { useEffect } from "react";
import { Analytics, track } from "@vercel/analytics/react";
import { analyticsAllowed, filterAnalyticsEvent } from "@/lib/analyticsPrivacy";

export default function ResumeAnalytics() {
  useEffect(() => {
    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, string>>).detail;
      if (!detail?.name || !analyticsAllowed() || window.location.pathname !== "/resume") return;
      const { name, ...properties } = detail;
      track(name, properties);
    };
    const onClick = (event: MouseEvent) => {
      if (!analyticsAllowed() || window.location.pathname !== "/resume") return;
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      if (link.getAttribute("href") === "/Jerome-Kuo-Resume.pdf") track("resume_download");
      if (link.href.startsWith("mailto:")) track("contact_click", { location: link.closest("footer") ? "footer" : "navigation" });
    };
    window.addEventListener("resume:analytics", onCustom);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("resume:analytics", onCustom); document.removeEventListener("click", onClick); };
  }, []);
  return <Analytics beforeSend={filterAnalyticsEvent} />;
}
