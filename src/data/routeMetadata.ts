export type Metadata = {
  title: string;
  description: string;
  index?: boolean;
};

export const routeMetadata: Record<string, Metadata> = {
  "/": {
    title: "Jerome Kuo — Learning Systems & AI Product",
    description: "Learning systems, AI product leadership, analytics, language learning, and applied technology.",
  },
  "/memory": {
    title: "Memory Training System — Jerome Kuo",
    description: "A practical memory-training system combining cognitive science, deliberate practice, and measurable learning experiments.",
  },
  "/journal": {
    title: "Reflection & Behavior Journal — Jerome Kuo",
    description: "A structured self-reflection and behavior analytics project for turning daily observations into actionable patterns.",
  },
  "/language": {
    title: "Language Learning Lab — Jerome Kuo",
    description: "Interactive multilingual learning experiments spanning learning styles, conversation, cultural facts, and pronunciation practice.",
  },
  "/game": {
    title: "Learning Games — Jerome Kuo",
    description: "Browser-based learning games and puzzles exploring attention, spatial reasoning, strategy, and responsive interaction design.",
  },
  "/systems": {
    title: "Systems Thinking — Jerome Kuo",
    description: "Systems maps and frameworks connecting learning design, behavior, technology, and product decision-making.",
  },
  "/videos": {
    title: "Video Library — Jerome Kuo",
    description: "Selected videos and learning resources covering technology, cognition, language, and applied experimentation.",
  },
  "/lectures": {
    title: "Lectures & Workshops — Jerome Kuo",
    description: "Talks, workshops, and teaching materials about learning systems, analytics, AI products, and technical communication.",
  },
  "/contact": {
    title: "Contact Jerome Kuo",
    description: "Contact Jerome Kuo about AI product, program management, learning systems, analytics, and technical storytelling.",
  },
  "/resume": {
    title: "Jerome Kuo — AI Product & Program Manager",
    description: "Jerome Kuo is an AI product and program leader spanning GenAI, analytics, GPU ecosystems, technical storytelling, and semiconductor supply chains.",
  },
  "/admin": { title: "Portfolio Admin", description: "Portfolio administration.", index: false },
  "/admin/login": { title: "Portfolio Admin Login", description: "Portfolio administration login.", index: false },
};
