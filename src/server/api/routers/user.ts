// src/server/api/routers/user.ts

import { createRouter } from "~/server/trpc";
import { z } from "zod"; // For validation

const UserProfileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  fbLink: z.string().url().optional(),
  linkedinLink: z.string().url().optional(),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.date(),
});

export const userRouter = createRouter()
  .mutation("addProfile", {
    input: UserProfileSchema,
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
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
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });
      return user;
    },
  });
