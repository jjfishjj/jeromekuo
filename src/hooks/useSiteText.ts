import { useState, useEffect } from "react";

const hasSupabaseConfig = () => Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
const textCache = new Map<string, string>();
let allFetched = false;
let fetchPromise: Promise<void> | null = null;
let fetchGeneration = 0;

const fetchAllTexts = async (generation: number) => {
  if (allFetched || !hasSupabaseConfig()) return;
  const { supabase } = await import("@/integrations/supabase/client");
  if (generation !== fetchGeneration) return;
  const { data } = await supabase
    .from("site_content")
    .select("content_key, content_value")
    .eq("content_type", "text");
  if (data && generation === fetchGeneration) {
    data.forEach((row) => {
      if (row.content_value) {
        textCache.set(row.content_key, row.content_value);
      }
    });
    allFetched = true;
  }
};

const ensureTextsFetched = () => {
  const generation = fetchGeneration;
  if (!fetchPromise) {
    fetchPromise = fetchAllTexts(generation).finally(() => {
      if (generation === fetchGeneration) fetchPromise = null;
    });
  }
  return fetchPromise;
};

export const useSiteText = (contentKey: string, fallback: string): string => {
  const [value, setValue] = useState<string>(textCache.get(contentKey) ?? fallback);

  useEffect(() => {
    if (textCache.has(contentKey)) {
      setValue(textCache.get(contentKey)!);
      return;
    }
    if (!hasSupabaseConfig()) return;
    let active = true;
    ensureTextsFetched()
      .then(() => {
        if (active && textCache.has(contentKey)) {
          setValue(textCache.get(contentKey)!);
        }
      })
      .catch(() => {
        // The fallback text remains usable if the optional content service is unavailable.
      });
    return () => {
      active = false;
    };
  }, [contentKey, fallback]);

  return value;
};

export const invalidateSiteTextCache = () => {
  fetchGeneration += 1;
  textCache.clear();
  allFetched = false;
  fetchPromise = null;
};
