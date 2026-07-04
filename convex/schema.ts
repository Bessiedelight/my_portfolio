import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    articles: defineTable({
        title: v.string(),
        coverImage: v.string(),
        mediumUrl: v.string(),
        order: v.number(),
        createdAt: v.number(),
    }),

    projects: defineTable({
        title: v.string(),
        description: v.string(),
        image: v.string(),
        url: v.optional(v.string()),
        githubUrl: v.optional(v.string()),
        type: v.string(), // "work" | "personal"
        order: v.number(),
        createdAt: v.number(),
    }),

    messages: defineTable({
        firstname: v.string(),
        lastname: v.string(),
        email: v.string(),
        message: v.string(),
        createdAt: v.number(),
    }),
});
