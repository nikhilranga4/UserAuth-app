// src/server/context.ts

import { type inferAsyncReturnType } from "@trpc/server";
import { prisma } from "~/server/prisma"; // Prisma instance for database access

// Create a context with Prisma and the session (using some session handling)
export function createContextInner({ req }: { req: Request }) {
  return {
    prisma,
    session: req.session, // Assuming you have session management for user authentication
  };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
