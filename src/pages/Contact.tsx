import { Layout } from "@/components/layout/Layout";
import { contactData, siteConfig } from "@/data/siteData";
import { Github, Mail, CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="tag-pill mb-4 inline-flex">🚀 開始您的學習之旅</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 mt-4">
              想在學習上有所突破？
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              讓我們談 30 分鐘。我會幫您釐清學習型態、規劃策略，並找到最適合的方法。
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-12">
        <div className="section-container">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-8">
            {[
              { icon: "🎯", title: "免費諮詢", desc: "30 分鐘探索通話，完全免費" },
              { icon: "📋", title: "務實評估", desc: "不過度承諾，給出可行建議" },
              { icon: "⚡", title: "快速啟動", desc: "立即開始改變學習方式" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-muted-foreground mb-10 leading-relaxed text-center">
              {contactData.intro}
            </p>

            {/* Suitable Topics */}
            <div className="glass-card p-8 mb-8">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                適合合作的主題
              </h2>
              <ul className="space-y-3">
                {contactData.suitableTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3">
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full justify-start border-border hover:border-primary hover:text-primary"
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
                  className="w-full justify-start border-border hover:border-primary hover:text-primary"
                >
                  <Mail className="mr-3 h-5 w-5" />
                  Email — {contactData.email.includes("TODO") ? "待補充" : contactData.email}
                </Button>
              </a>

              <a
                href={siteConfig.bookingUrl}
                className="block"
              >
                <Button
                  size="lg"
                  className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  預約 30 分鐘免費諮詢
                </Button>
              </a>
            </div>

            {/* Note */}
            {contactData.email.includes("TODO") && (
              <p className="mt-6 text-sm text-primary bg-primary/10 p-3 rounded-lg border border-primary/20">
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
