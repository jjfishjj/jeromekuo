import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Eye, EyeOff, Mic, RotateCcw, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Accent = "sixian" | "hailu";

type Phrase = {
  topic: "招呼" | "生活" | "飲食";
  chinese: string;
  hakka: Record<Accent, string>;
  pinyin: Record<Accent, string>;
};

const phrases: Phrase[] = [
  { topic: "招呼", chinese: "謝謝！", hakka: { sixian: "恁仔細！", hailu: "恁仔細！" }, pinyin: { sixian: "anˋ ziiˋ seˇ", hailu: "anˊ ziiˊ seˋ" } },
  { topic: "招呼", chinese: "謝謝你。", hakka: { sixian: "承蒙你。", hailu: "承蒙你。" }, pinyin: { sixian: "shinˇ mungˇ ngiˇ", hailu: "shin mung ngi" } },
  { topic: "招呼", chinese: "你叫什麼名字？", hakka: { sixian: "你安到麼个名？", hailu: "你安到麼个名？" }, pinyin: { sixian: "ngiˇ onˊ do eˋ gaiˋ miangˇ", hailu: "ngi onˋ doˇ maˋ gaiˇ miang" } },
  { topic: "生活", chinese: "今天天氣很好。", hakka: { sixian: "今晡日天時當好。", hailu: "今晡日天時當好。" }, pinyin: { sixian: "gimˊ buˊ ngidˋ tienˊ siiˇ dongˊ hoˋ", hailu: "gimˋ buˋ ngid tienˋ shi dongˋ hoˊ" } },
  { topic: "生活", chinese: "你要去哪裡？", hakka: { sixian: "你愛去哪位？", hailu: "你愛去哪位？" }, pinyin: { sixian: "ngiˇ oi hiˋ nai vi", hailu: "ngi oiˇ hiˇ naiˋ vui+" } },
  { topic: "生活", chinese: "慢慢來，不要急。", hakka: { sixian: "慢慢來，毋使遽。", hailu: "慢慢來，毋使遽。" }, pinyin: { sixian: "man man loiˇ, mˇ siiˋ giagˋ", hailu: "manˇ manˇ loi, m siiˊ giag" } },
  { topic: "飲食", chinese: "你吃飽了嗎？", hakka: { sixian: "你食飽吂？", hailu: "你食飽吂？" }, pinyin: { sixian: "ngiˇ siid bauˋ mangˇ", hailu: "ngi shid bauˊ mang" } },
  { topic: "飲食", chinese: "這個很好吃。", hakka: { sixian: "這个當好食。", hailu: "這个當好食。" }, pinyin: { sixian: "iaˋ ge dongˊ hoˋ siid", hailu: "liaˊ gaiˇ dongˋ hoˊ shid" } },
];

const accentNames: Record<Accent, string> = { sixian: "四縣腔", hailu: "海陸腔" };

export default function HakkaPractice() {
  const [accent, setAccent] = useState<Accent>("sixian");
  const [topic, setTopic] = useState<"全部" | Phrase["topic"]>("全部");
  const [index, setIndex] = useState(0);
  const [showPinyin, setShowPinyin] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [recording, setRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recordingUrl, setRecordingUrl] = useState("");
  const recordingUrlRef = useRef("");

  const filtered = useMemo(() => topic === "全部" ? phrases : phrases.filter((item) => item.topic === topic), [topic]);
  const phrase = filtered[index % filtered.length];
  const key = `${accent}-${phrase.chinese}`;

  useEffect(() => { setIndex(0); setFlipped(false); }, [topic, accent]);
  useEffect(() => () => {
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.ondataavailable = null;
      recorder.current.onstop = null;
      recorder.current.stop();
    }
    mediaStream.current?.getTracks().forEach((track) => track.stop());
    if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current);
  }, []);

  const replaceRecordingUrl = (nextUrl: string) => {
    if (recordingUrlRef.current) URL.revokeObjectURL(recordingUrlRef.current);
    recordingUrlRef.current = nextUrl;
    setRecordingUrl(nextUrl);
  };

  const move = (step: number) => {
    setIndex((current) => (current + step + filtered.length) % filtered.length);
    setFlipped(false);
    setNotice("");
  };

  const speak = () => {
    if (!("speechSynthesis" in window)) { setNotice("此瀏覽器不支援語音播放。"); return; }
    const voices = window.speechSynthesis.getVoices();
    const hakkaVoice = voices.find((voice) => /hak|hakka/i.test(`${voice.lang} ${voice.name}`));
    if (!hakkaVoice) {
      setNotice("目前裝置沒有客語語音。你仍可使用拼音跟讀與錄音比對；客語音檔將於串接語音資料庫後提供。");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(phrase.hakka[accent]);
    utterance.voice = hakkaVoice;
    utterance.lang = hakkaVoice.lang;
    utterance.rate = 0.82;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setNotice(`正在播放${accentNames[accent]}。`);
  };

  const toggleRecord = async () => {
    if (recording) { recorder.current?.stop(); setRecording(false); return; }
    let stream: MediaStream | null = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStream.current = stream;
      chunks.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      recorder.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => chunks.current.push(event.data);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        mediaStream.current = null;
        const nextUrl = URL.createObjectURL(new Blob(chunks.current, { type: mediaRecorder.mimeType }));
        replaceRecordingUrl(nextUrl);
        setRecording(false);
      };
      mediaRecorder.start();
      setRecording(true);
      setNotice("錄音中，讀完後再按一次停止。");
    } catch {
      stream?.getTracks().forEach((track) => track.stop());
      mediaStream.current = null;
      setRecording(false);
      setNotice("無法使用麥克風，請允許權限後再試一次。");
    }
  };

  const toggleComplete = () => setCompleted((items) => items.includes(key) ? items.filter((item) => item !== key) : [...items, key]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-elevated">
        <div className="p-5 sm:p-7 border-b border-border bg-gradient-to-r from-primary/15 via-card to-card">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div>
              <span className="text-xs font-semibold tracking-[.18em] text-primary">HAKKA SPEAKING LAB</span>
              <h3 className="text-2xl sm:text-3xl mt-2">一句一句，講出客家話</h3>
              <p className="text-sm text-muted-foreground mt-2">先聽、看拼音、再跟讀錄音。拼音依腔調同步切換。</p>
            </div>
            <div className="inline-flex rounded-xl bg-background/70 border border-border p-1" aria-label="選擇腔調">
              {(Object.keys(accentNames) as Accent[]).map((value) => (
                <button key={value} aria-pressed={accent === value} onClick={() => setAccent(value)} className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${accent === value ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"}`}>{accentNames[value]}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[210px_1fr]">
          <aside className="p-5 border-b lg:border-b-0 lg:border-r border-border bg-muted/20">
            <p className="text-xs font-medium text-muted-foreground mb-3">練習情境</p>
            <div className="flex lg:flex-col gap-2 overflow-x-auto">
              {(["全部", "招呼", "生活", "飲食"] as const).map((value) => <button key={value} onClick={() => setTopic(value)} className={`whitespace-nowrap text-left px-3 py-2.5 rounded-lg text-sm ${topic === value ? "bg-primary/15 text-primary font-medium" : "hover:bg-muted text-muted-foreground"}`}>{value}<span className="ml-2 text-xs opacity-60">{value === "全部" ? phrases.length : phrases.filter((item) => item.topic === value).length}</span></button>)}
            </div>
            <div className="mt-6 pt-5 border-t border-border hidden lg:block">
              <div className="flex justify-between text-xs mb-2"><span className="text-muted-foreground">本次進度</span><span>{completed.length}/{phrases.length * 2}</span></div>
              <Progress value={(completed.length / (phrases.length * 2)) * 100} className="h-2" />
            </div>
          </aside>

          <main className="p-5 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs rounded-full bg-muted px-3 py-1.5">{phrase.topic} · {index + 1}/{filtered.length}</span>
              <button onClick={() => setShowPinyin((value) => !value)} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">{showPinyin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}{showPinyin ? "隱藏拼音" : "顯示拼音"}</button>
            </div>

            <button onClick={() => setFlipped((value) => !value)} className="w-full min-h-[260px] text-left rounded-2xl border border-border bg-background/55 p-6 sm:p-9 hover:border-primary/40 transition group" aria-label="翻面查看中文">
              <p className="text-xs text-muted-foreground mb-6">{flipped ? "中文意思" : accentNames[accent]}</p>
              {flipped ? <p className="text-3xl sm:text-4xl font-semibold leading-relaxed">{phrase.chinese}</p> : <>
                <p className="text-3xl sm:text-5xl font-semibold leading-relaxed tracking-wide">{phrase.hakka[accent]}</p>
                <p className={`mt-6 text-lg sm:text-xl text-primary font-medium tracking-wide min-h-7 transition ${showPinyin ? "opacity-100" : "opacity-0 select-none"}`}>{phrase.pinyin[accent]}</p>
              </>}
              <p className="text-xs text-muted-foreground mt-8 group-hover:text-primary transition">點一下查看{flipped ? "客語" : "中文"}</p>
            </button>

            <div className="flex flex-wrap gap-3 mt-5">
              <Button onClick={speak} className="gap-2"><Volume2 className="h-4 w-4" />聽發音</Button>
              <Button variant={recording ? "destructive" : "outline"} onClick={toggleRecord} className="gap-2">{recording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}{recording ? "停止錄音" : "跟讀錄音"}</Button>
              <Button aria-pressed={completed.includes(key)} variant={completed.includes(key) ? "secondary" : "outline"} onClick={toggleComplete} className="gap-2"><Check className="h-4 w-4" />{completed.includes(key) ? "已完成" : "標記完成"}</Button>
              {recordingUrl && <audio src={recordingUrl} controls className="h-10 max-w-full" aria-label="你的跟讀錄音" />}
            </div>
            {notice && <div role="status" className="mt-4 text-sm text-muted-foreground rounded-lg bg-muted/50 px-4 py-3">{notice}</div>}

            <div className="flex items-center justify-between mt-7 pt-5 border-t border-border">
              <Button variant="ghost" onClick={() => move(-1)} className="gap-1"><ChevronLeft className="h-4 w-4" />上一句</Button>
              <button onClick={() => { setCompleted([]); replaceRecordingUrl(""); }} className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"><RotateCcw className="h-3.5 w-3.5" />重設進度</button>
              <Button variant="ghost" onClick={() => move(1)} className="gap-1">下一句<ChevronRight className="h-4 w-4" /></Button>
            </div>
          </main>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">第一版詞句用於介面示範；正式教學上線前，建議由客語教師依教育部客語拼音方案逐句校訂。參考：<a className="underline underline-offset-2" href="https://hakkadict.moe.edu.tw/" target="_blank" rel="noreferrer">教育部臺灣客語辭典</a>、<a className="underline underline-offset-2" href="https://speech.hakka.gov.tw/Translation/Online" target="_blank" rel="noreferrer">臺灣客語語音資料庫</a>。</p>
    </div>
  );
}
