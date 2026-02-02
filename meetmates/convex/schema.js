import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Users table
    users:defineTable({
        name: v.string(),
        tokenIdentifier: v.string(), // clerk user ID for AUTH
        email: v.string(),
        imageUrl: v.optional(v.string()),

        hasCompletedOnBoarding: v.boolean(),
        location: v.optional(
            v.object({
                city: v.string(),
                state: v.optional(v.string()),
                country: v.string(),
            })
        ),
        interests: v.optional(v.array(v.string())), // min 3 categories

        //Organizer tracking (User Subscription)
        freeEventsCreated: v.number(), //Track free event limit (1 free)

        // Time stamps
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_token",["tokenIdentifier"]),
});