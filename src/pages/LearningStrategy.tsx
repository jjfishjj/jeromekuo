import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Brain, Sparkles, Square, Copy, Check, ArrowRight, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";
import { learningStrategyCopy } from "@/data/learningStrategyCopy";
import { learningInputSchema, readStrategyStream } from "@/lib/learningStrategy";
import cover from "@/assets/placeholder-memory-cover.jpg";

export default function LearningStrategy() {
  const { lang } = useLanguage();
  const c = learningStrategyCopy[lang];
  const [challenge, setChallenge] = useState("");
  const [goal, setGoal] = useState("");
  const [minutes, setMinutes] = useState("20");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);
  const requestRef = useRef<AbortController | null>(null);
  useEffect(() => () => requestRef.current?.abort(), []);

  async function generate(event: FormEvent) {
    event.preventDefault();
    if (requestRef.current) return;
    const input = learningInputSchema.safeParse({ challenge, goal, minutes: Number(minutes), language: lang });
    if (!input.success) { setError(c.invalid); return; }
    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true); setError(""); setNotice(""); setResult(""); setCopied(false);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/learning-strategy`, {
        method: "POST", headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify(input.data), signal: controller.signal,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(typeof body.error === "string" ? body.error : c.failed);
      }
      await readStrategyStream(response, (text) => setResult((current) => current + text));
    } catch (err) {
      if (controller.signal.aborted) setNotice(c.stopped);
      else { setResult(""); setError(err instanceof Error ? err.message : c.failed); }
    } finally { requestRef.current = null; setLoading(false); }
  }

  async function copy() {
    try { await navigator.clipboard.writeText(result); setCopied(true); }
    catch { setNotice(c.copyFailed); }
  }

  return <Layout>
    <section className="border-b border-border bg-muted/20 py-10 md:py-14">
      <div className="section-container grid items-center gap-8 md:grid-cols-[1fr_240px]">
        <div className="max-w-3xl">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-primary"><Sparkles className="h-4 w-4" />Lovable AI · {c.nav}</p>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">{c.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">{c.intro}</p>
        </div>
        <img src={cover} alt="" className="hidden aspect-[3/2] w-full rounded-lg object-cover md:block" />
      </div>
    </section>
    <section className="section-container grid gap-10 py-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
      <form onSubmit={generate} className="min-w-0 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="challenge">{c.challenge}</Label>
          <Textarea id="challenge" value={challenge} onChange={(e) => setChallenge(e.target.value)} placeholder={c.placeholder} minLength={10} maxLength={2000} required disabled={loading} className="min-h-40 resize-y" />
          <p className="text-end text-xs text-muted-foreground">{challenge.length} / 2000</p>
        </div>
        <fieldset disabled={loading} className="space-y-2">
          <legend className="mb-2 text-xs text-muted-foreground">{c.examples}</legend>
          <div className="flex flex-wrap gap-2">{c.samples.map((sample, i) => <Button key={sample} type="button" variant="outline" size="sm" className="h-auto whitespace-normal text-start" onClick={() => setChallenge(c.sampleValues[i])}>{sample}</Button>)}</div>
        </fieldset>
        <div className="space-y-2"><Label htmlFor="goal">{c.goal}</Label><Input id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} maxLength={300} placeholder={c.goalPlaceholder} disabled={loading} /></div>
        <div className="space-y-2"><Label htmlFor="minutes">{c.time}</Label><div className="flex items-center gap-3"><Input id="minutes" type="number" min={5} max={120} required value={minutes} onChange={(e) => setMinutes(e.target.value)} disabled={loading} className="w-24" /><span className="text-sm text-muted-foreground">{c.minutes}</span></div></div>
        <p className="text-xs leading-6 text-muted-foreground">{c.privacy}</p>
        {error && <p role="alert" className="break-words rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-foreground">{error}</p>}
        {notice && <p role="status" className="text-sm text-muted-foreground">{notice}</p>}
        <Button type="submit" disabled={loading} className="h-auto min-h-11 w-full gap-2 whitespace-normal">{loading ? <Loader2 className="h-4 w-4 shrink-0 motion-safe:animate-spin" /> : <Sparkles className="h-4 w-4 shrink-0" />}{loading ? c.generating : c.generate}</Button>
        {loading && <Button type="button" variant="outline" className="w-full gap-2" onClick={() => requestRef.current?.abort()}><Square className="h-3 w-3" />{c.stop}</Button>}
      </form>
      <div className="min-w-0 border-t border-border pt-6 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0" aria-busy={loading}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h2 className="flex items-center gap-2 text-lg font-semibold"><Brain className="h-5 w-5 text-primary" />{c.result}</h2>{result && !loading && <Button type="button" variant="ghost" size="sm" onClick={copy} className="gap-2">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? c.copied : c.copy}</Button>}</div>
        {result ? <article className="break-words text-sm leading-7 [&_h1]:mb-4 [&_h1]:text-xl [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-lg [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-base [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:ps-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:ps-5 [&_li]:mb-2 [&_table]:w-full [&_table]:table-fixed [&_td]:border [&_td]:border-border [&_td]:p-3 [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-3"><ReactMarkdown remarkPlugins={[remarkGfm]} disallowedElements={["img", "a"]} unwrapDisallowed>{result}</ReactMarkdown></article> : <div className="flex min-h-64 flex-col items-center justify-center border-y border-dashed border-border py-12 text-center"><Brain className="mb-5 h-10 w-10 text-primary/60" /><h3 className="font-medium">{loading ? c.generating : c.empty}</h3><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{loading ? "" : c.emptyBody}</p></div>}
        <p className="mt-8 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">{c.disclaimer}</p>
        <Button asChild variant="link" className="mt-3 h-auto whitespace-normal px-0 text-start"><Link to="/contact">{c.consult}<ArrowRight className="ms-2 h-4 w-4 shrink-0" /></Link></Button>
      </div>
    </section>
  </Layout>;
}