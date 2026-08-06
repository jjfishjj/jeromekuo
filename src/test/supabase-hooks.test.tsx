import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const maybeSingle = vi.fn();
const contentEq = vi.fn(() => ({ maybeSingle }));
const contentSelect = vi.fn(() => ({ eq: contentEq }));
const textEq = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => ({
      select: (columns: string) => columns === "content_key, content_value"
        ? { eq: textEq }
        : contentSelect(columns),
    })),
  },
}));

import { invalidateSiteContentCache, useSiteContent } from "@/hooks/useSiteContent";

describe("Supabase content hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    invalidateSiteContentCache();
  });

  it("loads media content and reuses its cache", async () => {
    maybeSingle.mockResolvedValue({ data: { media_url: "https://example.com/image.jpg", content_value: "Alt" } });

    const first = renderHook(() => useSiteContent("hero-image"));
    await waitFor(() => expect(first.result.current.loading).toBe(false));
    expect(first.result.current.media?.media_url).toBe("https://example.com/image.jpg");
    first.unmount();

    const second = renderHook(() => useSiteContent("hero-image"));
    expect(second.result.current.loading).toBe(false);
    expect(maybeSingle).toHaveBeenCalledTimes(1);
  });

  it("finishes loading when Supabase returns no matching row", async () => {
    maybeSingle.mockResolvedValue({ data: null });
    const hook = renderHook(() => useSiteContent("missing-content"));
    await waitFor(() => expect(hook.result.current.loading).toBe(false));
    expect(hook.result.current.media).toBeNull();
  });
});
