import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const textEq = vi.fn();
const textSelect = vi.fn(() => ({ eq: textEq }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: vi.fn(() => ({ select: textSelect })) },
}));

import { invalidateSiteTextCache, useSiteText } from "@/hooks/useSiteText";

describe("useSiteText", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    invalidateSiteTextCache();
  });

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
});
