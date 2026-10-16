import { useState, useEffect } from "react";

interface SiteContentMedia {
  media_url: string | null;
  content_value: string | null;
}

const hasSupabaseConfig = () => Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
const cache = new Map<string, SiteContentMedia>();

export const useSiteContent = (contentKey: string | undefined) => {
  const [media, setMedia] = useState<SiteContentMedia | null>(
    contentKey ? cache.get(contentKey) ?? null : null,
  );
  const [loading, setLoading] = useState(Boolean(contentKey && !cache.has(contentKey)));

  useEffect(() => {
    if (!contentKey) {
      setLoading(false);
      return;
    }

    if (cache.has(contentKey)) {
      setMedia(cache.get(contentKey)!);
      setLoading(false);
      return;
    }

    if (!hasSupabaseConfig()) {
      setLoading(false);
      return;
    }

    let active = true;
    const loadMedia = async () => {
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        const { data } = await supabase
          .from("site_content")
          .select("media_url, content_value")
          .eq("content_key", contentKey)
          .maybeSingle();
        if (active) {
          if (data) {
            cache.set(contentKey, data);
            setMedia(data);
          }
          setLoading(false);
        }
      } catch {
        if (active) setLoading(false);
      }
    };

    void loadMedia();
    return () => {
      active = false;
    };
  }, [contentKey]);

  return { media, loading };
};

export const invalidateSiteContentCache = () => {
  cache.clear();
};
