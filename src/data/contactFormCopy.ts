import type { Language } from "@/i18n/types";

type ContactFormCopy = {
  heading: string;
  collaborationTopics: string[];
  name: string;
  email: string;
  topic: string;
  topicPlaceholder: string;
  topics: { value: string; label: string }[];
  message: string;
  messageHint: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  privacy: string;
  githubFallback: string;
};

export const contactFormCopy: Record<Language, ContactFormCopy> = {
  zh: {
    heading: "傳送合作訊息",
    collaborationTopics: ["學習科學與教育設計合作", "產品或遊戲中的行為回饋系統", "自我成長工具與方法論探討", "跨語言學習經驗分享"],
    name: "姓名",
    email: "電子郵件",
    topic: "聯絡主題",
    topicPlaceholder: "請選擇主題",
    topics: [
      { value: "product", label: "AI／產品／技術合作" },
      { value: "learning", label: "學習系統與記憶設計" },
      { value: "speaking", label: "演講、工作坊或媒體邀約" },
      { value: "other", label: "其他" },
    ],
    message: "訊息內容",
    messageHint: "請簡述你的需求與方便聯絡的方式。",
    submit: "送出訊息",
    sending: "正在送出…",
    success: "訊息已送出，謝謝聯絡！",
    error: "目前無法送出訊息，請稍後再試，或透過 GitHub 聯絡。",
    privacy: "訊息會透過電子郵件服務轉交網站管理者；請勿填入密碼、健康或財務等敏感資料。",
    githubFallback: "改用 GitHub 聯絡",
  },
  en: {
    heading: "Send a collaboration inquiry",
    collaborationTopics: ["Learning science and education design", "Behavior feedback in products or games", "Self-growth tools and methods", "Multilingual learning experiences"],
    name: "Name",
    email: "Email address",
    topic: "Topic",
    topicPlaceholder: "Choose a topic",
    topics: [
      { value: "product", label: "AI, product, or technology" },
      { value: "learning", label: "Learning systems and memory design" },
      { value: "speaking", label: "Speaking, workshop, or media inquiry" },
      { value: "other", label: "Other" },
    ],
    message: "Message",
    messageHint: "Briefly describe your request and the best way to reach you.",
    submit: "Send message",
    sending: "Sending…",
    success: "Your message has been sent. Thank you for reaching out.",
    error: "We could not send your message. Please try again later or contact us on GitHub.",
    privacy: "Your message will be forwarded to the site owner by email. Do not include passwords or sensitive health or financial information.",
    githubFallback: "Contact via GitHub instead",
  },
  es: {
    heading: "Enviar una consulta de colaboración",
    collaborationTopics: ["Ciencia del aprendizaje y diseño educativo", "Sistemas de retroalimentación en productos o juegos", "Herramientas y métodos de crecimiento personal", "Experiencias de aprendizaje multilingüe"],
    name: "Nombre",
    email: "Correo electrónico",
    topic: "Tema",
    topicPlaceholder: "Elige un tema",
    topics: [
      { value: "product", label: "IA, producto o tecnología" },
      { value: "learning", label: "Sistemas de aprendizaje y memoria" },
      { value: "speaking", label: "Conferencias, talleres o prensa" },
      { value: "other", label: "Otro" },
    ],
    message: "Mensaje",
    messageHint: "Resume tu solicitud e indica cómo prefieres que te contacten.",
    submit: "Enviar mensaje",
    sending: "Enviando…",
    success: "Tu mensaje se ha enviado. Gracias por escribir.",
    error: "No se pudo enviar el mensaje. Inténtalo más tarde o contacta por GitHub.",
    privacy: "El mensaje se enviará por correo electrónico al responsable del sitio. No incluyas contraseñas ni datos sensibles de salud o finanzas.",
    githubFallback: "Contactar por GitHub",
  },
  he: {
    heading: "שליחת פנייה לשיתוף פעולה",
    collaborationTopics: ["מדעי הלמידה ועיצוב חינוכי", "משוב התנהגותי במוצרים או במשחקים", "כלים ושיטות לצמיחה אישית", "חוויות למידה רב־לשוניות"],
    name: "שם",
    email: "כתובת דוא״ל",
    topic: "נושא",
    topicPlaceholder: "בחירת נושא",
    topics: [
      { value: "product", label: "בינה מלאכותית, מוצר או טכנולוגיה" },
      { value: "learning", label: "מערכות למידה ועיצוב זיכרון" },
      { value: "speaking", label: "הרצאה, סדנה או פנייה תקשורתית" },
      { value: "other", label: "אחר" },
    ],
    message: "הודעה",
    messageHint: "תארו בקצרה את הבקשה ואת הדרך הנוחה ליצור קשר.",
    submit: "שליחת הודעה",
    sending: "ההודעה נשלחת…",
    success: "ההודעה נשלחה. תודה שפניתם.",
    error: "לא ניתן לשלוח כרגע. נסו שוב מאוחר יותר או פנו דרך GitHub.",
    privacy: "ההודעה תועבר לבעל האתר בדוא״ל. אין לכלול סיסמאות או מידע רפואי או פיננסי רגיש.",
    githubFallback: "פנייה דרך GitHub",
  },
  ko: {
    heading: "협업 문의 보내기",
    collaborationTopics: ["학습 과학 및 교육 설계 협업", "제품·게임의 행동 피드백 시스템", "자기 성장 도구와 방법론", "다국어 학습 경험 공유"],
    name: "이름",
    email: "이메일 주소",
    topic: "문의 주제",
    topicPlaceholder: "주제를 선택하세요",
    topics: [
      { value: "product", label: "AI·제품·기술 협업" },
      { value: "learning", label: "학습 시스템 및 기억 설계" },
      { value: "speaking", label: "강연·워크숍·미디어 문의" },
      { value: "other", label: "기타" },
    ],
    message: "메시지",
    messageHint: "요청 내용과 연락받기 편한 방법을 간단히 적어 주세요.",
    submit: "메시지 보내기",
    sending: "전송 중…",
    success: "메시지가 전송되었습니다. 연락해 주셔서 감사합니다.",
    error: "메시지를 전송할 수 없습니다. 나중에 다시 시도하거나 GitHub로 문의해 주세요.",
    privacy: "메시지는 이메일 서비스를 통해 사이트 운영자에게 전달됩니다. 비밀번호나 민감한 건강·금융 정보는 입력하지 마세요.",
    githubFallback: "GitHub로 문의하기",
  },
  fr: {
    heading: "Envoyer une demande de collaboration",
    collaborationTopics: ["Sciences de l’apprentissage et conception pédagogique", "Systèmes de retour comportemental dans les produits ou jeux", "Outils et méthodes de développement personnel", "Expériences d’apprentissage multilingue"],
    name: "Nom",
    email: "Adresse e-mail",
    topic: "Sujet",
    topicPlaceholder: "Choisissez un sujet",
    topics: [
      { value: "product", label: "IA, produit ou technologie" },
      { value: "learning", label: "Systèmes d’apprentissage et mémoire" },
      { value: "speaking", label: "Conférence, atelier ou demande média" },
      { value: "other", label: "Autre" },
    ],
    message: "Message",
    messageHint: "Décrivez brièvement votre demande et le meilleur moyen de vous joindre.",
    submit: "Envoyer le message",
    sending: "Envoi en cours…",
    success: "Votre message a été envoyé. Merci de nous avoir contactés.",
    error: "Impossible d’envoyer le message. Réessayez plus tard ou contactez-nous sur GitHub.",
    privacy: "Votre message sera transmis au responsable du site par e-mail. N’incluez aucun mot de passe ni renseignement médical ou financier sensible.",
    githubFallback: "Contacter via GitHub",
  },
};
