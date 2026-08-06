import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const textCache = new Map<string, string>();
let allFetched = false;
let fetchPromise: Promise<void> | null = null;

const fetchAllTexts = async () => {
  if (allFetched) return;
  const { data } = await supabase
    .from("site_content")
    .select("content_key, content_value")
    .eq("content_type", "text");
  if (data) {
    data.forEach((row) => {
      if (row.content_value) {
        textCache.set(row.content_key, row.content_value);
      }
    });
    allFetched = true;
  }
};

const ensureTextsFetched = () => {
  if (!fetchPromise) {
    fetchPromise = fetchAllTexts().finally(() => {
      fetchPromise = null;
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
    ensureTextsFetched().then(() => {
      if (textCache.has(contentKey)) {
        setValue(textCache.get(contentKey)!);
      }
    });
  }, [contentKey, fallback]);

  return value;
};

export const invalidateSiteTextCache = () => {
  textCache.clear();
  allFetched = false;
  fetchPromise = null;
};
