import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const textEq = vi.fn();
const textSelect = vi.fn(() => ({ eq: textEq }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: vi.fn(() => ({ select: textSelect })) },
}));

import { invalidateSiteTextCache, useSiteText } from "@/hooks/useSiteText";

describe("useSiteText", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("VITE_SUPABASE_PUBLISHABLE_KEY", "test-public-key");
    invalidateSiteTextCache();
  });

  afterEach(() => vi.unstubAllEnvs());

  it("shows fallback text and then applies remote content", async () => {
    textEq.mockResolvedValue({
      data: [{ content_key: "home-title", content_value: "Remote title" }],
    });

    const hook = renderHook(() => useSiteText("home-title", "Fallback title"));
    expect(hook.result.current).toBe("Fallback title");
    await waitFor(() => expect(hook.result.current).toBe("Remote title"));
  });

  it("can refetch after its cache is invalidated", async () => {
    textEq
      .mockResolvedValueOnce({ data: [{ content_key: "headline", content_value: "First" }] })
      .mockResolvedValueOnce({ data: [{ content_key: "headline", content_value: "Second" }] });

    const first = renderHook(() => useSiteText("headline", "Fallback"));
    await waitFor(() => expect(first.result.current).toBe("First"));
    first.unmount();

    invalidateSiteTextCache();
    const second = renderHook(() => useSiteText("headline", "Fallback"));
    await waitFor(() => expect(second.result.current).toBe("Second"));
    expect(textEq).toHaveBeenCalledTimes(2);
  });

  it("does not let an in-flight response repopulate an invalidated cache", async () => {
    let resolveOldRequest!: (value: { data: { content_key: string; content_value: string }[] }) => void;
    textEq.mockImplementationOnce(() => new Promise((resolve) => { resolveOldRequest = resolve; }));
    const first = renderHook(() => useSiteText("headline", "Fallback"));
    await waitFor(() => expect(textEq).toHaveBeenCalledTimes(1));

    invalidateSiteTextCache();
    first.unmount();
    textEq.mockResolvedValueOnce({ data: [{ content_key: "headline", content_value: "Fresh" }] });
    const second = renderHook(() => useSiteText("headline", "Fallback"));
    await waitFor(() => expect(second.result.current).toBe("Fresh"));

    resolveOldRequest({ data: [{ content_key: "headline", content_value: "Stale" }] });
    await new Promise((resolve) => setTimeout(resolve, 0));
    const third = renderHook(() => useSiteText("headline", "Fallback"));
    expect(third.result.current).toBe("Fresh");
  });
});
