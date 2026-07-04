import { mutation } from "./_generated/server";

/**
 * Seed the database with real project data from resume.
 * Run via: npx convex run seed:run
 */
export const run = mutation({
    args: {},
    handler: async (ctx) => {
        // Clear existing projects first
        const existingProjects = await ctx.db.query("projects").collect();
        for (const p of existingProjects) {
            await ctx.db.delete(p._id);
        }

        // Clear existing articles
        const existingArticles = await ctx.db.query("articles").collect();
        for (const a of existingArticles) {
            await ctx.db.delete(a._id);
        }

        // === WORK PROJECTS ===
        const workProjects = [
            {
                title: "Eganow Dev",
                description: "AI-Powered Project Management Platform — Built a full-featured project management web app functionally equivalent to Linear. Issue tracking, boards, sprints, and a GitHub App (OAuth) integration for real-time PR, commit, and branch sync. Integrated Claude Code as an AI coding agent for automated PR reviews, code suggestions, and auto-generated pull requests.",
                image: "",
                url: "https://eganow-dev.vercel.app",
                type: "work",
                order: 1,
                createdAt: Date.now(),
            },
            {
                title: "Kron Automation",
                description: "LLM-Powered HR Document Automation System — Production system generating HR documents (contracts, KPI templates, job descriptions, policy docs) from structured business inputs via LLM-driven agentic pipelines. Orchestrated LLM calls across three providers with per-document prompt design. Processed ~300 requests/minute at peak via DOCX templating engine and Excel ingestion pipeline.",
                image: "",
                url: "https://youtu.be/i3LS-AYBiq8",
                type: "work",
                order: 2,
                createdAt: Date.now(),
            },
        ];

        // === PERSONAL PROJECTS ===
        const personalProjects = [
            {
                title: "Security Agent Fleet",
                description: "Parallel multi-agent architecture using LangGraph that routes pull requests to 10 specialized agent nodes (security, auth, performance, accessibility) concurrently. Persistent cross-session memory management tracking recurring bugs and coding standards, with human-in-the-loop state checkpoints for high-risk findings. Deterministic static-analysis layer using Python's AST module to trace a change's blast radius.",
                image: "",
                githubUrl: "https://github.com/Bessiedelight/agent-fleet",
                type: "personal",
                order: 1,
                createdAt: Date.now(),
            },
            {
                title: "ShopBot Enterprise",
                description: "Multi-Agent Customer Support System — Supervisor node routes conversations to three specialist sub-agents (Order, Refund, Complaints). Built deterministic Business Logic Gates — pure-Python validators that check every structured LLM output against business rules, with automatic correction loops and human-in-the-loop interrupts for refund approvals.",
                image: "",
                githubUrl: "https://github.com/Bessiedelight/customer-service-agent",
                type: "personal",
                order: 2,
                createdAt: Date.now(),
            },
            {
                title: "LLM From Scratch",
                description: "Decoder-Only Transformer in PyTorch — Implemented a decoder-only transformer from first principles (tokenizer, embeddings, multi-head self-attention, feed-forward layers, pre-LN blocks with residual connections), plus a production-style version using nn.TransformerDecoder — both trained for autoregressive text generation.",
                image: "",
                githubUrl: "https://github.com/Bessiedelight/llm-pytorch",
                type: "personal",
                order: 3,
                createdAt: Date.now(),
            },
        ];

        for (const p of workProjects) {
            await ctx.db.insert("projects", p);
        }
        for (const p of personalProjects) {
            await ctx.db.insert("projects", p);
        }

        return `Seeded ${workProjects.length} work projects and ${personalProjects.length} personal projects.`;
    },
});
