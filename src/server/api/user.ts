// src/server/api/user.ts

import { createRouter } from "~/server/trpc";
import { z } from "zod"; // For validation

// User schema for input validation
const UserProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  fbLink: z.string().url().optional(),
  linkedinLink: z.string().url().optional(),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.date(),
});

// API logic for user profile handling
export const userRouter = createRouter()
  .mutation("addProfile", {
    input: UserProfileSchema,
    async resolve({ input, ctx }) {
      // Assuming you're using Prisma to interact with SQLite
      const user = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id }, // User is authenticated via session
        data: {
          fullName: input.fullName,
          fbLink: input.fbLink || null,
          linkedinLink: input.linkedinLink || null,
          gender: input.gender,
          dob: input.dob,
        },
      });
      return user;
    },
  })
  .query("getProfile", {
    async resolve({ ctx }) {
      // Fetching user profile from the SQLite database
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      return user;
    },
  });
