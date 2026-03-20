import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SiteContentMedia {
  media_url: string | null;
  content_value: string | null;
}

const cache = new Map<string, SiteContentMedia>();

export const useSiteContent = (contentKey: string | undefined) => {
  const [media, setMedia] = useState<SiteContentMedia | null>(
    contentKey ? cache.get(contentKey) ?? null : null
  );
  const [loading, setLoading] = useState(!cache.has(contentKey ?? ""));

  useEffect(() => {
    if (!contentKey) return;

    if (cache.has(contentKey)) {
      setMedia(cache.get(contentKey)!);
      setLoading(false);
      return;
    }

    supabase
      .from("site_content")
      .select("media_url, content_value")
      .eq("content_key", contentKey)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          cache.set(contentKey, data);
          setMedia(data);
        }
        setLoading(false);
      });
  }, [contentKey]);

  return { media, loading };
};

export const invalidateSiteContentCache = () => {
  cache.clear();
};
