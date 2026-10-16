import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Github, Mail, CheckCircle2, MessageCircle, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageFaq } from "@/components/PageFaq";
import { contactData, siteConfig } from "@/data/siteData";
import { contactFormCopy } from "@/data/contactFormCopy";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";

type FormStatus = "success" | "error" | null;

const Contact = () => {
  const { lang, t } = useLanguage();
  const copy = contactFormCopy[lang];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Contact request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="tag-pill mb-4 inline-flex">{t("contact.badge")}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-4">{t("contact.title")}</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t("contact.subtitle")}</p>
            <nav aria-label={lang === "zh" ? "麵包屑" : "Breadcrumb"} className="mt-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-accent">{t("nav.home")}</Link>
              <span aria-hidden="true" className="px-2">/</span>
              <span aria-current="page">{t("nav.contact")}</span>
            </nav>
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="contact-form-heading">
        <div className="section-container">
          <div className="mx-auto grid grid-cols-1 max-w-5xl items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
            <div className="glass-card p-5 sm:p-8">
              <h2 id="contact-form-heading" className="mb-2 text-2xl font-semibold text-foreground">{copy.heading}</h2>
              <p className="mb-7 text-sm leading-6 text-muted-foreground">{t("contact.subtitle")}</p>

              <form id="contact-form" action="/api/contact" method="post" aria-labelledby="contact-form-heading" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-foreground">{copy.name} <span aria-hidden="true">*</span></label>
                  <input id="contact-name" name="name" type="text" required maxLength={100} autoComplete="name" className="min-h-12 w-full rounded-md border border-input bg-background px-3 py-3 text-base text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-foreground">{copy.email} <span aria-hidden="true">*</span></label>
                  <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" className="min-h-12 w-full rounded-md border border-input bg-background px-3 py-3 text-base text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                </div>

                <div>
                  <label htmlFor="contact-topic" className="mb-2 block text-sm font-medium text-foreground">{copy.topic} <span aria-hidden="true">*</span></label>
                  <select id="contact-topic" name="topic" required defaultValue="" className="min-h-12 w-full rounded-md border border-input bg-background px-3 py-3 text-base text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="" disabled>{copy.topicPlaceholder}</option>
                    {copy.topics.map((topic) => <option key={topic.value} value={topic.value}>{topic.label}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-foreground">{copy.message} <span aria-hidden="true">*</span></label>
                  <textarea id="contact-message" name="message" required minLength={10} maxLength={5000} rows={6} aria-describedby="contact-message-hint" className="w-full resize-y rounded-md border border-input bg-background px-3 py-3 text-base leading-6 text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                  <p id="contact-message-hint" className="mt-2 text-xs leading-5 text-muted-foreground">{copy.messageHint}</p>
                </div>

                <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="contact-website">Leave this field blank</label>
                  <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <p className="text-xs leading-5 text-muted-foreground">{copy.privacy}</p>

                <div aria-live="polite" aria-atomic="true" className="min-h-6">
                  {status === "success" && <p role="status" className="text-sm font-medium text-emerald-400">{copy.success}</p>}
                  {status === "error" && <p className="text-sm font-medium text-destructive" role="alert">{copy.error}</p>}
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting} className="min-h-12 w-full sm:w-auto">
                  <Send aria-hidden="true" className="mr-2 h-4 w-4" />
                  {isSubmitting ? copy.sending : copy.submit}
                </Button>
              </form>
            </div>

            <aside className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t("contact.topicsTitle")}</h2>
                <ul className="space-y-3">
                  {copy.collaborationTopics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <Button asChild size="lg" variant="outline" className="min-h-12 w-full justify-start border-border hover:border-primary hover:text-primary">
                  <a href={contactData.github} target="_blank" rel="noopener noreferrer">
                    <Github aria-hidden="true" className="mr-3 h-5 w-5" />
                    GitHub — @jjfishjj
                  </a>
                </Button>
                {contactData.email ? (
                  <Button asChild size="lg" variant="outline" className="min-h-12 w-full justify-start border-border hover:border-primary hover:text-primary">
                    <a href={`mailto:${contactData.email}`}>
                      <Mail aria-hidden="true" className="mr-3 h-5 w-5" />
                      Email — {contactData.email}
                    </a>
                  </Button>
                ) : (
                  <Button type="button" size="lg" variant="outline" className="min-h-12 w-full justify-start" disabled>
                    <Mail aria-hidden="true" className="mr-3 h-5 w-5" />
                    {t("contact.emailPending")}
                  </Button>
                )}
                {siteConfig.bookingUrl ? (
                  <Button asChild size="lg" className="min-h-12 w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle aria-hidden="true" className="mr-3 h-5 w-5" />
                      {t("contact.bookCall")}
                    </a>
                  </Button>
                ) : (
                  <Button type="button" size="lg" className="min-h-12 w-full justify-start" disabled>
                    <MessageCircle aria-hidden="true" className="mr-3 h-5 w-5" />
                    {t("contact.bookCall")}（待設定）
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
      <PageFaq page="contact" />
    </Layout>
  );
};

export default Contact;
