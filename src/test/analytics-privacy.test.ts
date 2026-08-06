import { describe, expect, it } from "vitest";
import type { BeforeSendEvent } from "@vercel/analytics/react";
import { analyticsAllowed, filterAnalyticsEvent } from "@/lib/analyticsPrivacy";

describe("analytics privacy", () => {
  it("respects Do Not Track and Global Privacy Control", () => {
    expect(analyticsAllowed({ doNotTrack: "1" } as Navigator)).toBe(false);
    expect(analyticsAllowed({ doNotTrack: "0", globalPrivacyControl: true } as Navigator & { globalPrivacyControl: boolean })).toBe(false);
    expect(analyticsAllowed({ doNotTrack: "0" } as Navigator)).toBe(true);
  });

  it("removes query strings and fragments from analytics URLs", () => {
    const event = { url: "https://example.com/resume?source=email#contact" } as BeforeSendEvent;
    expect(filterAnalyticsEvent(event)?.url).toBe("https://example.com/resume");
  });

  it("does not collect admin page views", () => {
    const event = { url: "https://example.com/admin/login" } as BeforeSendEvent;
    expect(filterAnalyticsEvent(event)).toBeNull();
  });
});
