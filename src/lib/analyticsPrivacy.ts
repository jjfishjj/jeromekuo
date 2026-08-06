import type { BeforeSendEvent } from "@vercel/analytics/react";

type PrivacyNavigator = Navigator & { globalPrivacyControl?: boolean };

export const analyticsAllowed = (
  client: PrivacyNavigator = navigator as PrivacyNavigator,
) => client.doNotTrack !== "1" && client.globalPrivacyControl !== true;

export const filterAnalyticsEvent = (event: BeforeSendEvent) => {
  if (!analyticsAllowed()) return null;

  const url = new URL(event.url);
  if (url.pathname.startsWith("/admin")) return null;

  url.search = "";
  url.hash = "";
  return { ...event, url: url.toString() };
};
