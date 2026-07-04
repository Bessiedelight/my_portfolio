// Replaces the old fetch()-to-FastAPI proxy. Runs the graph directly
// inside the Next.js API route — no separate Python process, no port 8000.
import type { NextApiRequest, NextApiResponse } from "next";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { graph } from "@/lib/agent/graph";

// Simple in-memory rate limiting: 2 requests / 60s per IP.
// (Same caveat as the old Python dict-based version: resets on redeploy
// and isn't shared across serverless instances. Fine for a portfolio site.)
const RATE_LIMIT = 2;
const RATE_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = rateLimitStore.get(ip);
  if (!bucket || now - bucket.windowStart > RATE_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

type HistoryMessage = { role: string; content: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res.status(200).json({
      reply: "You're sending messages too quickly. Please wait a moment and try again.",
    });
  }

  const { message, history = [] } = req.body as {
    message: string;
    history?: HistoryMessage[];
  };

  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Missing message." });
  }

  const messages = history
    .slice(-10)
    .map((m) =>
      m.role === "user"
        ? new HumanMessage(m.content)
        : new AIMessage(m.content)
    );
  messages.push(new HumanMessage(message));

  try {
    console.log("INVOKING GRAPH WITH USER MESSAGE:", message, "HISTORY:", JSON.stringify(history));
    const result = await graph.invoke({ messages, isInScope: true });
    console.log("GRAPH RESULT MESSAGES:", result.messages.map(m => ({ type: m._getType(), content: m.content })));

    for (let i = result.messages.length - 1; i >= 0; i--) {
      const msg = result.messages[i];
      if (msg instanceof AIMessage && msg.content) {
        return res.status(200).json({ reply: msg.content });
      }
    }

    return res.status(200).json({
      reply: "I'm not sure how to answer that. Ask me about Bessie's projects or skills!",
    });
  } catch (error) {
    console.error("Agent error:", error);
    return res.status(200).json({
      reply: "I'm having trouble processing that right now. Please try again in a moment.",
    });
  }
}