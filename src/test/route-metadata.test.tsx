import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RouteMetadata from "@/components/RouteMetadata";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { routeMetadata } from "@/data/routeMetadata";

const renderMetadata = (path: string) => render(
  <LanguageProvider>
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><RouteMetadata /></MemoryRouter>
  </LanguageProvider>,
);

describe("route metadata", () => {
  it.each(Object.entries(routeMetadata).filter(([, metadata]) => metadata.index !== false))(
    "sets unique public metadata for %s",
    async (path, metadata) => {
      renderMetadata(path);
      await waitFor(() => expect(document.title).toBe(metadata.title));
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://jeromekuo.vercel.app${path === "/" ? "/" : path}`,
      );
      expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", metadata.description);
      const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute("content") ?? "";
      expect(keywords).toBe(metadata.keywords);
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", expect.stringContaining("index"));
      if (path === "/resume") {
        expect(document.querySelector('meta[property="og:type"]')).toHaveAttribute("content", "profile");
      }
      if (path === "/memory" || path === "/journal" || path === "/contact") {
        await waitFor(() => expect(document.getElementById("page-faq-jsonld")).not.toBeNull());
        const schema = JSON.parse(document.getElementById("page-faq-jsonld")!.textContent!);
        expect(schema["@type"]).toBe("FAQPage");
        expect(schema.mainEntity).toHaveLength(3);
      }
    },
  );

  it("prevents admin routes and missing pages from being indexed", async () => {
    const { unmount } = renderMetadata("/admin");
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow"));
    unmount();
    renderMetadata("/missing");
    await waitFor(() => expect(document.title).toBe("Page Not Found — Jerome Kuo"));
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    expect(document.querySelector('meta[name="keywords"]')).toBeNull();
  });

  it("uses /resume-summary as the canonical URL for the legacy resume summary alias", async () => {
    renderMetadata("/resume/summary");
    await waitFor(() => expect(document.title).toBe(routeMetadata["/resume-summary"].title));
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://jeromekuo.vercel.app/resume-summary",
    );
    expect(document.querySelector('meta[name="keywords"]')).toHaveAttribute(
      "content",
      routeMetadata["/resume-summary"].keywords,
    );
  });
});
