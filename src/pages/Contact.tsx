import { Layout } from "@/components/layout/Layout";
import { contactData } from "@/data/siteData";
import { Github, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-muted/30">
        <div className="section-container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {contactData.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {contactData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              {contactData.intro}
            </p>

            {/* Suitable Topics */}
            <div className="mb-12">
              <h2 className="text-sm font-medium text-foreground uppercase tracking-wider mb-4">
                適合合作的主題
              </h2>
              <ul className="space-y-3">
                {contactData.suitableTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full justify-start border-border hover:border-accent hover:text-accent"
                >
                  <Github className="mr-3 h-5 w-5" />
                  GitHub — @jjfishjj
                </Button>
              </a>

              <a
                href={`mailto:${contactData.email}`}
                className="block"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full justify-start border-border hover:border-accent hover:text-accent"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  Email — {contactData.email.includes("TODO") ? "待補充" : contactData.email}
                </Button>
              </a>
            </div>

            {/* Note */}
            {contactData.email.includes("TODO") && (
              <p className="mt-6 text-sm text-amber-600 dark:text-amber-400 bg-amber-500/10 p-3 rounded-lg">
                ⚠️ Email 地址待補充。請在 src/data/siteData.ts 中更新 contactData.email。
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
