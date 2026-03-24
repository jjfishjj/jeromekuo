import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Save, Type } from "lucide-react";

interface TextSlotDef {
  key: string;
  page: string;
  section: string;
  label: string;
  multiline?: boolean;
  defaultValue: string;
}

const TEXT_SLOTS: TextSlotDef[] = [
  { key: "hero.role1", page: "home", section: "hero", label: "首頁 — 主標題第一行", defaultValue: "學習系統設計師" },
  { key: "hero.role2", page: "home", section: "hero", label: "首頁 — 主標題第二行", defaultValue: "記憶應用顧問" },
  { key: "hero.tagline", page: "home", section: "hero", label: "首頁 — 副標語", multiline: true, defaultValue: "把學習科學變成你的超能力：透過系統化的記憶設計，讓學習更高效、反思更有力。" },
  { key: "hero.domain1", page: "home", section: "hero", label: "首頁 — 標籤 1", defaultValue: "學習科學" },
  { key: "hero.domain2", page: "home", section: "hero", label: "首頁 — 標籤 2", defaultValue: "記憶設計" },
  { key: "hero.domain3", page: "home", section: "hero", label: "首頁 — 標籤 3", defaultValue: "行為反思" },
  { key: "hero.ctaPrimary", page: "home", section: "hero", label: "首頁 — 主按鈕文字", defaultValue: "預約 30 分鐘探索通話" },
  { key: "hero.ctaSecondary", page: "home", section: "hero", label: "首頁 — 次按鈕文字", defaultValue: "瀏覽學習資源" },
  { key: "hero.greeting", page: "home", section: "hero", label: "首頁 — 問候語", defaultValue: "✨ 學習系統 × 記憶設計" },
];

interface SlotState {
  value: string;
  dirty: boolean;
}

const AdminTextSlots = () => {
  const [slots, setSlots] = useState<Record<string, SlotState>>({});
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initializeAndFetch();
  }, []);

  const initializeAndFetch = async () => {
    const keys = TEXT_SLOTS.map((s) => s.key);

    // Ensure all slots exist
    const { data: existing } = await supabase
      .from("site_content")
      .select("content_key, content_value")
      .in("content_key", keys);

    const existingKeys = new Set(existing?.map((e) => e.content_key) || []);
    const missing = TEXT_SLOTS.filter((s) => !existingKeys.has(s.key));

    if (missing.length > 0) {
      await supabase.from("site_content").insert(
        missing.map((s) => ({
          content_key: s.key,
          page: s.page,
          section: s.section,
          content_type: "text",
          content_value: s.defaultValue,
        }))
      );
    }

    // Re-fetch all
    const { data } = await supabase
      .from("site_content")
      .select("content_key, content_value")
      .in("content_key", keys);

    const stateMap: Record<string, SlotState> = {};
    TEXT_SLOTS.forEach((slotDef) => {
      const row = data?.find((d) => d.content_key === slotDef.key);
      stateMap[slotDef.key] = {
        value: row?.content_value ?? slotDef.defaultValue,
        dirty: false,
      };
    });
    setSlots(stateMap);
  };

  const handleChange = (key: string, value: string) => {
    setSlots((prev) => ({
      ...prev,
      [key]: { value, dirty: true },
    }));
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const dirtyEntries = Object.entries(slots).filter(([, s]) => s.dirty);

    for (const [key, s] of dirtyEntries) {
      await supabase
        .from("site_content")
        .update({ content_value: s.value })
        .eq("content_key", key);
    }

    setSlots((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        next[key] = { ...next[key], dirty: false };
      }
      return next;
    });

    setSaving(false);
    toast({ title: "文字內容已儲存", description: `已更新 ${dirtyEntries.length} 個欄位` });
  };

  const hasDirty = Object.values(slots).some((s) => s.dirty);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" /> 前台文字管理
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            修改下方欄位後按「儲存」，前台文字會即時更新。
          </p>
        </div>
        <Button onClick={handleSaveAll} disabled={!hasDirty || saving} size="sm">
          <Save className="h-4 w-4 mr-1" />
          {saving ? "儲存中..." : "儲存全部"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {TEXT_SLOTS.map((slotDef) => {
            const state = slots[slotDef.key];
            if (!state) return null;

            return (
              <div key={slotDef.key} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {slotDef.label}
                  </label>
                  <span className="text-xs text-muted-foreground font-mono">
                    {slotDef.key}
                  </span>
                </div>
                {slotDef.multiline ? (
                  <Textarea
                    value={state.value}
                    onChange={(e) => handleChange(slotDef.key, e.target.value)}
                    className="text-sm"
                    rows={3}
                  />
                ) : (
                  <Input
                    value={state.value}
                    onChange={(e) => handleChange(slotDef.key, e.target.value)}
                    className="text-sm"
                  />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTextSlots;
