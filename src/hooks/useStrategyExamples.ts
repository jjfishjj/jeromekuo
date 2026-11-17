import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Language } from "@/i18n/types";

export interface StrategyExample { question: string; answer: string }

/** Examples from the admin-managed table; null means none saved for this language (use built-in copy). */
export function useStrategyExamples(lang: Language) {
  const [examples, setExamples] = useState<StrategyExample[] | null>(null);
  useEffect(() => {
    let active = true;
    supabase.from("learning_strategy_examples").select("question, answer").eq("language", lang).order("sort_order")
      .then(({ data }) => { if (active) setExamples(data && data.length ? data : null); });
    return () => { active = false; };
  }, [lang]);
  return examples;
}
