import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("messages").collect();
    },
});

export const create = mutation({
    args: {
        firstname: v.string(),
        lastname: v.string(),
        email: v.string(),
        message: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("messages", {
            ...args,
            createdAt: Date.now(),
        });
    },
});
