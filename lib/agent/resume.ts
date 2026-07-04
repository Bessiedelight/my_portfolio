export interface Project {
  name: string;
  description: string;
  url?: string;
  github?: string;
  year?: string;
  highlights: string[];
  stack: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Contact {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  medium: string;
}

export interface Skills {
  languages: string[];
  ai_frameworks: string[];
  ai_coding_tools: string[];
  backend: string[];
  databases: string[];
  infrastructure: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export interface Leadership {
  role: string;
  org: string;
  period: string;
  description: string;
}

export interface Resume {
  name: string;
  title: string;
  location: string;
  contact: Contact;
  summary: string;
  skills: Skills;
  experience: Experience[];
  projects: {
    work: Project[];
    personal: Project[];
  };
  education: Education;
  leadership: Leadership[];
  certifications: string[];
}

export const RESUME: Resume = {
  name: "Bessie Delight Kekeli",
  title: "AI Engineer",
  location: "Accra, Ghana",
  contact: {
    phone: "+233 (0) 245 277 263",
    email: "bessiedelight@gmail.com",
    linkedin: "https://linkedin.com/in/delight-bessie",
    github: "https://github.com/Bessiedelight",
    website: "https://bessie.vercel.app",
    medium: "https://medium.com/@bessiedelight",
  },
  summary:
    "AI Engineer with production experience building agentic systems, " +
    "LLM-powered applications, and backend infrastructure. Focused on " +
    "agentic orchestration (LangGraph, LangChain, RAG, MCP), with hands-on " +
    "work spanning multi-agent architectures, transformer models built from " +
    "first principles, and production pipelines integrating multiple LLM " +
    "providers. Backed by a solid foundation in backend engineering " +
    "(C#, ASP.NET Core, Node.js) and full-stack development.",
  skills: {
    languages: ["Python", "JavaScript/TypeScript", "C#"],
    ai_frameworks: [
      "LangGraph", "LangChain", "LlamaIndex",
      "RAG (Retrieval Augmented Generation)",
      "MCP (Model Context Protocol)", "FastAPI", "PyTorch", "Fine-tuning",
    ],
    ai_coding_tools: ["Codex", "Antigravity", "Claude Code"],
    backend: ["ASP.NET Core", "Node.js", "REST APIs", "OAuth 2.0"],
    databases: ["Convex DB", "ChromaDB", "SQL Server", "Redis"],
    infrastructure: [
      "BullMQ", "Upstash", "GitHub Apps API", "Git/GitHub",
    ],
  },
  experience: [
    {
      company: "Eganow",
      role: "Backend Engineer Intern (C#)",
      period: "Feb 2026 – Apr 2026",
      location: "Ghana",
      description:
        "Software company building enterprise solutions for financial " +
        "services and banking systems in Ghana.",
      highlights: [
        "Built and shipped backend features for internal workflows using ASP.NET Core and C#, including REST API integrations.",
        "Developed and maintained secure, high-performance API endpoints.",
      ],
    },
    {
      company: "TekSol Limited",
      role: "Full-Stack Engineer Intern (Next.js)",
      period: "Apr 2023 – Jun 2023",
      location: "Accra, Ghana",
      description:
        "Ghana-based fintech licensed by the Bank of Ghana as an " +
        "Enhanced Payment Service Provider.",
      highlights: [
        "Built front-end features and UI components with Next.js for admin dashboards used by the Eganow admin teams.",
        "Worked directly with senior engineers on backend systems, improving code quality and system reliability.",
      ],
    },
  ],
  projects: {
    work: [
      {
        name: "Eganow Dev",
        description: "AI-Powered Project Management Platform",
        url: "https://eganow-dev.vercel.app",
        year: "2025",
        highlights: [
          "Built a full-featured project management web app functionally equivalent to Linear — issue tracking, boards, sprints, and a GitHub App (OAuth) integration for real-time PR, commit, and branch sync.",
          "Integrated Claude Code as an AI coding agent for automated PR reviews, code suggestions, and auto-generated pull requests.",
        ],
        stack: "Claude Code Agent SDK, LangGraph, Next.js, Node.js, Convex DB, GitHub Apps API, OAuth 2.0",
      },
      {
        name: "Kron Automation",
        description: "LLM-Powered HR Document Automation System",
        url: "https://youtu.be/i3LS-AYBiq8",
        year: "2025",
        highlights: [
          "Production system generating HR documents (contracts, KPI templates, job descriptions, policy docs) from structured business inputs via LLM-driven agentic pipelines using LangChain, LangGraph, RAG.",
          "Orchestrated LLM calls across three providers (OpenAI, Groq, Google GenAI) with per-document prompt design and parallel API key rotation.",
          "Processed ~300 requests/minute at peak (BullMQ workers, Redis queuing, cutting throttle latency from ~1,000ms to 200ms) via a DOCX templating engine and Excel ingestion pipeline.",
        ],
        stack: "Python, LangGraph, LangChain, RAG, BullMQ, Redis, OpenAI/Groq/Google GenAI",
      },
    ],
    personal: [
      {
        name: "Security Agent Fleet",
        description: "Parallel Multi-Agent PR Review Architecture",
        github: "https://github.com/Bessiedelight/agent-fleet",
        highlights: [
          "Designed a parallel multi-agent architecture using LangGraph that routes pull requests to 10 specialized agent nodes (security, auth, performance, accessibility) concurrently.",
          "Implemented persistent cross-session memory management to track recurring team bugs and custom coding standards, with human-in-the-loop state checkpoints for high-risk findings.",
          "Built a deterministic static-analysis layer using Python's AST module to trace a change's blast radius.",
        ],
        stack: "Python, Claude Agent SDK, LangGraph, LangChain, AST-Based Static Analysis, Long-Term Vector Memory, State Checkpointing",
      },
      {
        name: "ShopBot Enterprise",
        description: "Multi-Agent Customer Support System",
        github: "https://github.com/Bessiedelight/customer-service-agent",
        highlights: [
          "Designed a multi-agent architecture with LangGraph — a Supervisor node routes conversations to three specialist sub-agents (Order, Refund, Complaints).",
          "Built deterministic Business Logic Gates — pure-Python validators that check every structured LLM output against business rules, with automatic correction loops and human-in-the-loop interrupts.",
        ],
        stack: "Python, LangGraph, LangChain, OpenAI API, structured output / function calling",
      },
      {
        name: "LLM From Scratch",
        description: "Decoder-Only Transformer in PyTorch",
        github: "https://github.com/Bessiedelight/llm-pytorch",
        highlights: [
          "Implemented a decoder-only transformer from first principles (tokenizer, embeddings, multi-head self-attention, feed-forward layers, pre-LN blocks with residual connections).",
          "Built a production-style version using nn.TransformerDecoder — both trained for autoregressive text generation.",
        ],
        stack: "Python, PyTorch, Transformer Architecture, Attention Mechanisms",
      },
    ],
  },
  education: {
    degree: "BSc Computer Science",
    school: "University of Cape Coast, Ghana",
    period: "Jan 2022 – July 2026",
  },
  leadership: [
    {
      role: "ML Club Head",
      org: "CSITSA — University of Cape Coast",
      period: "Jan 2026 – Jun 2026",
      description: "Led the ML & Data Science club, organizing technical sessions and coordinating student projects in machine learning and AI engineering.",
    },
    {
      role: "AI Lead",
      org: "Google Developer Groups — University of Cape Coast",
      period: "Seasonal",
      description: "Lead data science initiatives for the chapter, focusing on building AI systems to solve real world problems.",
    },
  ],
  certifications: [
    "LangGraph — LangChain Academy",
    "LangChain — LangChain Academy",
    "Ultimate Next.js Course — JSMastery",
    "Technical writing on AI engineering and agentic systems — medium.com/@bessiedelight",
  ],
};

function formatProjects(category: "work" | "personal"): string {
  const projects = RESUME.projects[category] || [];
  const parts = [`## ${category.charAt(0).toUpperCase() + category.slice(1)} Projects`];
  for (const p of projects) {
    const link = p.url || p.github || "";
    let part = `**${p.name}** — ${p.description}`;
    if (link) {
      part += ` (${link})`;
    }
    part += "\n";
    for (const h of p.highlights) {
      part += `• ${h}\n`;
    }
    part += `Stack: ${p.stack}`;
    parts.push(part);
  }
  return parts.join("\n\n");
}

function fullResumeText(): string {
  const sections = [
    formatResumeSection("summary"),
    `\n**Location:** ${RESUME.location}`,
    `\n${formatResumeSection("contact")}`,
    `\n${formatResumeSection("skills")}`,
    `\n${formatResumeSection("experience")}`,
    `\n${formatResumeSection("projects")}`,
    `\n${formatResumeSection("education")}`,
    `\n${formatResumeSection("leadership")}`,
    `\n${formatResumeSection("certifications")}`,
  ];
  return sections.join("\n");
}

export function formatResumeSection(section: string): string {
  const cleanSection = section.toLowerCase().trim();

  if (["summary", "bio", "about", "overview"].includes(cleanSection)) {
    return `**${RESUME.name}** — ${RESUME.title}\n\n${RESUME.summary}`;
  }

  if (["contact", "links", "socials"].includes(cleanSection)) {
    const c = RESUME.contact;
    return (
      `📧 Email: ${c.email}\n` +
      `📱 Phone: ${c.phone}\n` +
      `🔗 LinkedIn: ${c.linkedin}\n` +
      `💻 GitHub: ${c.github}\n` +
      `🌐 Website: ${c.website}\n` +
      `📝 Medium: ${c.medium}`
    );
  }

  if (["skills", "technical skills", "tech stack"].includes(cleanSection)) {
    const s = RESUME.skills;
    const parts: string[] = [];
    for (const [category, items] of Object.entries(s)) {
      const label = category.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
      parts.push(`**${label}:** ${items.join(", ")}`);
    }
    return parts.join("\n");
  }

  if (["experience", "work experience", "jobs"].includes(cleanSection)) {
    const parts: string[] = [];
    for (const exp of RESUME.experience) {
      let part = `**${exp.role}** at ${exp.company} (${exp.period})\n`;
      part += `${exp.description}\n`;
      for (const h of exp.highlights) {
        part += `• ${h}\n`;
      }
      parts.push(part);
    }
    return parts.join("\n");
  }

  if (["projects", "all projects"].includes(cleanSection)) {
    return formatProjects("work") + "\n\n" + formatProjects("personal");
  }

  if (["work projects", "professional projects"].includes(cleanSection)) {
    return formatProjects("work");
  }

  if (["personal projects", "side projects"].includes(cleanSection)) {
    return formatProjects("personal");
  }

  if (cleanSection === "education") {
    const e = RESUME.education;
    return `**${e.degree}** — ${e.school} (${e.period})`;
  }

  if (["leadership", "involvement", "clubs"].includes(cleanSection)) {
    const parts: string[] = [];
    for (const l of RESUME.leadership) {
      parts.push(`**${l.role}** — ${l.org} (${l.period})\n${l.description}`);
    }
    return parts.join("\n\n");
  }

  if (["certifications", "certs", "publications"].includes(cleanSection)) {
    return RESUME.certifications.map((c) => `• ${c}`).join("\n");
  }

  // Full resume
  return fullResumeText();
}

export function searchResume(query: string): string {
  const queryLower = query.toLowerCase();

  const sectionKeywords: Record<string, string[]> = {
    summary: ["who", "about", "summary", "bio", "introduce", "background", "tell me about"],
    contact: ["contact", "email", "phone", "linkedin", "github", "medium", "reach", "website", "links"],
    skills: ["skill", "tech", "stack", "language", "framework", "tool", "database", "know", "proficient"],
    experience: ["experience", "work history", "job", "intern", "eganow", "teksol", "employment"],
    projects: ["project", "built", "build", "created", "portfolio", "agent fleet", "shopbot", "kron", "eganow dev", "llm from scratch"],
    education: ["education", "university", "degree", "school", "study", "bsc", "cape coast"],
    leadership: ["lead", "club", "ml club", "gdg", "csitsa", "google developer"],
    certifications: ["cert", "publication", "course", "langchain academy", "jsmastery"],
  };

  const matchedSections: string[] = [];
  for (const [section, keywords] of Object.entries(sectionKeywords)) {
    if (keywords.some((kw) => queryLower.includes(kw))) {
      matchedSections.push(section);
    }
  }

  if (matchedSections.length === 0) {
    return fullResumeText();
  }

  const parts: string[] = [];
  for (const section of matchedSections) {
    parts.push(formatResumeSection(section));
  }

  return parts.join("\n\n---\n\n");
}
