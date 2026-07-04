import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { tavily } from "@tavily/core";
import { searchResume } from "./resume";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY || "" });

export const resumeLookup = tool(
  async ({ query }: { query: string }) => {
    return searchResume(query);
  },
  {
    name: "resume_lookup",
    description:
      "Search Bessie's resume for information about her skills, experience, " +
      "education, projects, contact details, leadership, or certifications. " +
      "Use this for any direct question about Bessie's background.",
    schema: z.object({
      query: z.string().describe("What to look up in Bessie's resume"),
    }),
  }
);

export const searchWeb = tool(
  async ({ query }: { query: string }) => {
    const scopedQuery = `Bessie Delight Kekeli ${query}`;
    try {
      const results = await tvly.search(scopedQuery, {
        searchDepth: "basic",
        maxResults: 5,
        includeDomains: [
          "github.com/Bessiedelight",
          "medium.com/@bessiedelight",
          "linkedin.com/in/delight-bessie",
        ],
      });

      if (!results.results || results.results.length === 0) {
        return "No relevant results found for this query about Bessie.";
      }

      return results.results
        .map(
          (r) =>
            `**${r.title}**\n${r.url}\n${(r.content || "").slice(0, 300)}`
        )
        .join("\n\n---\n\n");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      return `Search unavailable: ${message}`;
    }
  },
  {
    name: "search_web",
    description:
      "Search the web for information specifically about Bessie Delight " +
      "Kekeli. Use this to find details from her GitHub repos, Medium " +
      "articles, or LinkedIn profile. Always scope the query to Bessie.",
    schema: z.object({
      query: z.string().describe("What to search for about Bessie"),
    }),
  }
);

export const ALL_TOOLS = [resumeLookup, searchWeb];
