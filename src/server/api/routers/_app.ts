// src/server/api/routers/_app.ts

import { createRouter } from "~/server/trpc";
import { userRouter } from "../user"; // Importing the user router

export const appRouter = createRouter({
  user: userRouter, // Registering the user router
});

export type AppRouter = typeof appRouter; // Export the app router's type definition
