import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("projects").collect();
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        image: v.string(),
        url: v.optional(v.string()),
        githubUrl: v.optional(v.string()),
        type: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("projects", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("projects"),
        title: v.string(),
        description: v.string(),
        image: v.string(),
        url: v.optional(v.string()),
        githubUrl: v.optional(v.string()),
        type: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

export const remove = mutation({
    args: { id: v.id("projects") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
