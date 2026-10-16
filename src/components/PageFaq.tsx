import { useLanguage } from "@/i18n/LanguageContext";
import pageFaqData from "@/data/pageFaq.json";
import type { Language } from "@/i18n/types";

type PageFaqKind = keyof typeof pageFaqData;

const sectionTitles: Record<Language, string> = {
  zh: "常見問題",
  en: "Frequently asked questions",
  es: "Preguntas frecuentes",
  he: "שאלות נפוצות",
  ko: "자주 묻는 질문",
  fr: "Questions fréquentes",
};

export function PageFaq({ page }: { page: PageFaqKind }) {
  const { lang } = useLanguage();
  const translations = pageFaqData[page] as Record<Language, { question: string; answer: string }[]>;
  const items = translations[lang] ?? translations.zh;

  return (
    <section
      className="py-20 border-t border-border/50"
      aria-labelledby={`${page}-faq-heading`}
      lang={lang}
      dir={lang === "he" ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-accent mb-3">FAQ</p>
          <h2 id={`${page}-faq-heading`} className="text-3xl font-semibold text-foreground mb-8">
            {sectionTitles[lang]}
          </h2>
          <div className="divide-y divide-border/70 border-y border-border/70">
            {items.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-base font-medium text-foreground marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4">
                  <span>{question}</span>
                  <span aria-hidden="true" className="shrink-0 text-xl text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl pr-8 text-sm leading-7 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
