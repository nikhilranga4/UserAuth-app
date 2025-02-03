// src/server/trpc.ts

import * as trpc from "@trpc/server";
import { prisma } from "~/server/prisma"; // Prisma instance for database access
import { createContext } from "~/server/context"; // Assuming this is the correct import

// Initialize tRPC
const t = trpc.initTRPC.create();

// Create a router (Add any additional routers here)
export const appRouter = t.router({
  user: userRouter, // Adding the user router to the main app router
  // You can add other routers here as needed
});

// Export type definition of the API
export type AppRouter = typeof appRouter;

// Create context for tRPC (auth, database, etc.)
export const createContext = ({ req }: { req: Request }) => {
  return {
    prisma,
    session: req.session, // Assuming you're using some session handler
  };
};
