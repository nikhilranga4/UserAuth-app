import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { db } from "~/server/db"; // Import your Prisma DB instance

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // Custom field for user ID
      // Add any other properties you want to store in the session
      // Example: role: UserRole;
    } & DefaultSession["user"];
  }

  // You can extend the User interface here if needed
  // interface User {
  //   role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!, // GitHub Client ID from .env
      clientSecret: process.env.GITHUB_SECRET!, // GitHub Client Secret from .env
    }),
    // Add more providers if needed here
  ],
  adapter: PrismaAdapter(db), // Prisma adapter to store user info in the database
  callbacks: {
    session: async ({ session, user }) => {
      // Custom session handling
      if (user) {
        session.user.id = user.id; // Add custom user fields to session
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
