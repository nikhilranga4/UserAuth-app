// src/app.d.ts

import { AppRouter } from "~/server/trpc"; // Import the tRPC app router

declare global {
  // Extend the Next.js session (this depends on how your session is configured)
  namespace Express {
    interface Request {
      session: {
        user: {
          id: string;
          email: string;
        };
      };
    }
  }
}
