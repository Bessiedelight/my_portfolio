import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("articles").collect();
    },
});

export const create = mutation({
    args: {
        title: v.string(),
        coverImage: v.string(),
        mediumUrl: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("articles", {
            ...args,
            createdAt: Date.now(),
        });
    },
});

export const update = mutation({
    args: {
        id: v.id("articles"),
        title: v.string(),
        coverImage: v.string(),
        mediumUrl: v.string(),
        order: v.number(),
    },
    handler: async (ctx, args) => {
        const { id, ...fields } = args;
        await ctx.db.patch(id, fields);
    },
});

export const remove = mutation({
    args: { id: v.id("articles") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
});
