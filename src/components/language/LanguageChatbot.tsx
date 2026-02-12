import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Globe } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const greetings: Record<string, string> = {
  "中文": "你好！我是語言學習助手，可以用中文、英文、日文、韓文、西班牙文和你對話。試試用不同語言跟我聊天吧！",
  "English": "Hello! I'm a language learning assistant. Try talking to me in different languages!",
  "日本語": "こんにちは！いろんな言語で話しかけてみてください！",
  "한국어": "안녕하세요! 다양한 언어로 대화해 보세요!",
  "Español": "¡Hola! Intenta hablarme en diferentes idiomas.",
};

const mockResponses: Record<string, string[]> = {
  zh: [
    "很好的問題！學習語言最重要的是保持好奇心。你今天想練習哪個方面呢？",
    "我注意到你在用中文！你知道嗎，中文的四聲系統讓它成為一種「音樂性」很強的語言。",
    "每天練習一點比一次練很久更有效。這跟記憶科學中的「間隔重複」原理一致。",
  ],
  en: [
    "Great question! The key to language learning is consistent practice. What aspect would you like to focus on?",
    "Interesting! Did you know that switching between languages actually strengthens your cognitive flexibility?",
    "Keep it up! Research shows that multilingual speakers have better problem-solving skills.",
  ],
  ja: [
    "いい質問ですね！言語学習で大切なのは、毎日少しずつ練習することです。",
    "日本語を使っていますね！敬語の使い分けは難しいですが、とても面白いシステムです。",
    "頑張ってください！多言語を学ぶことは脳のトレーニングにもなります。",
  ],
  ko: [
    "좋은 질문이에요! 언어 학습에서 가장 중요한 건 꾸준한 연습이에요.",
    "한국어를 사용하고 계시네요! 한글은 정말 효율적인 문자 체계입니다.",
    "화이팅! 다국어를 배우면 인지 능력도 함께 향상됩니다.",
  ],
  es: [
    "¡Buena pregunta! Lo más importante en el aprendizaje de idiomas es la práctica constante.",
    "¡Estás usando español! ¿Sabías que el español es el cuarto idioma más hablado del mundo?",
    "¡Sigue así! Aprender varios idiomas mejora la flexibilidad cognitiva.",
  ],
};

function detectLanguage(text: string): string {
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return "ja";
  if (/[\uac00-\ud7af]/.test(text)) return "ko";
  if (/[\u4e00-\u9fff]/.test(text)) return "zh";
  if (/[áéíóúñ¿¡]/i.test(text)) return "es";
  return "en";
}

const LanguageChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greetings["中文"] },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock response with detected language
    setTimeout(() => {
      const lang = detectLanguage(userMsg.content);
      const responses = mockResponses[lang] || mockResponses.en;
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <Globe className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">多語言對話助手</h4>
            <p className="text-xs text-muted-foreground">支援 中文・English・日本語・한국어・Español</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="h-3.5 w-3.5 text-accent" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-3.5 w-3.5 text-accent" />
              </div>
              <div className="bg-muted rounded-xl px-4 py-2.5 text-sm text-muted-foreground">
                <span className="animate-pulse">⋯</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border bg-muted/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="用任何語言輸入訊息..."
              className="flex-1 text-sm"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            目前為展示版本，使用預設回應。啟用 Cloud 後可連接 AI 模型進行真實對話。
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageChatbot;
