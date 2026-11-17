import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Trash2, ArrowUp, ArrowDown, Download } from "lucide-react";
import { languageNames, type Language } from "@/i18n/types";
import { learningStrategyCopy } from "@/data/learningStrategyCopy";

interface Row { id?: string; question: string; answer: string; sort_order: number; dirty?: boolean }

const AdminStrategyExamples = () => {
  const [lang, setLang] = useState<Language>("zh");
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("learning_strategy_examples").select("id, question, answer, sort_order").eq("language", lang).order("sort_order");
    if (error) toast({ title: "讀取失敗", description: error.message, variant: "destructive" });
    setRows(data ?? []);
    setLoading(false);
  }, [lang, toast]);
  useEffect(() => { load(); }, [load]);

  const update = (i: number, patch: Partial<Row>) => setRows((r) => r.map((row, j) => (j === i ? { ...row, ...patch, dirty: true } : row)));

  const importDefaults = () => {
    const c = learningStrategyCopy[lang];
    setRows(c.samples.map((q, i) => ({ question: q, answer: c.sampleValues[i], sort_order: i, dirty: true })));
  };

  const move = (i: number, d: number) => setRows((r) => {
    const j = i + d; if (j < 0 || j >= r.length) return r;
    const next = [...r]; [next[i], next[j]] = [next[j], next[i]];
    return next.map((row, k) => ({ ...row, sort_order: k, dirty: true }));
  });

  const save = async () => {
    const bad = rows.find((r) => !r.question.trim() || r.question.length > 120 || r.answer.trim().length < 10 || r.answer.length > 2000);
    if (bad) { toast({ title: "請檢查內容", description: "問題 1–120 字；答案 10–2000 字。", variant: "destructive" }); return; }
    const dirty = rows.map((r, i) => ({ ...r, sort_order: i })).filter((r) => r.dirty || !r.id);
    for (const r of dirty) {
      const payload = { language: lang, question: r.question.trim(), answer: r.answer.trim(), sort_order: r.sort_order };
      const { error } = r.id
        ? await supabase.from("learning_strategy_examples").update(payload).eq("id", r.id)
        : await supabase.from("learning_strategy_examples").insert(payload);
      if (error) { toast({ title: "儲存失敗", description: error.message, variant: "destructive" }); return; }
    }
    toast({ title: "已儲存", description: "前台會立即使用新內容。" });
    load();
  };

  const remove = async (i: number) => {
    const row = rows[i];
    if (row.id) {
      const { error } = await supabase.from("learning_strategy_examples").delete().eq("id", row.id);
      if (error) { toast({ title: "刪除失敗", description: error.message, variant: "destructive" }); return; }
    }
    setRows((r) => r.filter((_, j) => j !== i));
  };

  return (
    <Card>
      <CardHeader className="space-y-3">
        <CardTitle>AI 學習策略 — 範例問題與答案</CardTitle>
        <p className="text-sm text-muted-foreground">「問題」是前台的按鈕文字，「答案」是點按後自動填入的學習挑戰描述。某語言沒有任何資料時，前台使用內建預設。</p>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={lang} onValueChange={(v) => setLang(v as Language)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>{(Object.keys(languageNames) as Language[]).map((l) => <SelectItem key={l} value={l}>{languageNames[l]}</SelectItem>)}</SelectContent>
          </Select>
          {!loading && rows.length === 0 && <Button variant="outline" size="sm" className="gap-1.5" onClick={importDefaults}><Download className="h-4 w-4" />載入目前預設內容</Button>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? <p className="text-sm text-muted-foreground">載入中…</p> : rows.length === 0 ? <p className="text-sm text-muted-foreground">此語言尚未自訂，前台顯示內建預設。</p> : rows.map((row, i) => (
          <div key={row.id ?? `new-${i}`} className="space-y-2 rounded-lg border border-border p-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">#{i + 1}</span>
              <Input aria-label="問題" value={row.question} maxLength={120} placeholder="問題（按鈕文字）" onChange={(e) => update(i, { question: e.target.value })} />
              <Button variant="ghost" size="icon" aria-label="上移" onClick={() => move(i, -1)}><ArrowUp className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="下移" onClick={() => move(i, 1)}><ArrowDown className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="刪除" onClick={() => remove(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
            <Textarea aria-label="答案" value={row.answer} maxLength={2000} rows={3} placeholder="答案（填入挑戰欄的完整描述）" onChange={(e) => update(i, { answer: e.target.value })} />
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-1.5" onClick={() => setRows((r) => [...r, { question: "", answer: "", sort_order: r.length, dirty: true }])}><Plus className="h-4 w-4" />新增一題</Button>
          <Button className="gap-1.5" onClick={save} disabled={!rows.some((r) => r.dirty)}><Save className="h-4 w-4" />儲存</Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminStrategyExamples;
