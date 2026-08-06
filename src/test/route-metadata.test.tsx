import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RouteMetadata from "@/components/RouteMetadata";
import { routeMetadata } from "@/data/routeMetadata";

describe("route metadata", () => {
  it.each(Object.entries(routeMetadata).filter(([, metadata]) => metadata.index !== false))(
    "sets unique public metadata for %s",
    async (path, metadata) => {
      render(<MemoryRouter initialEntries={[path]}><RouteMetadata /></MemoryRouter>);
      await waitFor(() => expect(document.title).toBe(metadata.title));
      expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://jeromekuo.vercel.app${path === "/" ? "/" : path}`,
      );
      expect(document.querySelector('meta[name="description"]')).toHaveAttribute("content", metadata.description);
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", expect.stringContaining("index"));
    },
  );

  it("prevents admin routes and missing pages from being indexed", async () => {
    const { unmount } = render(<MemoryRouter initialEntries={["/admin"]}><RouteMetadata /></MemoryRouter>);
    await waitFor(() => expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow"));
    unmount();
    render(<MemoryRouter initialEntries={["/missing"]}><RouteMetadata /></MemoryRouter>);
    await waitFor(() => expect(document.title).toBe("Page Not Found — Jerome Kuo"));
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
  });
});
