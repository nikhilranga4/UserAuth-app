import "server-only";
// src/trpc/server.ts

import { createCaller, type AppRouter } from "~/server/api/root"; // Correct the alias
import { createContext } from "~/server/trpc"; // Correct the alias
import { createQueryClient } from "./query-client"; // Ensure the path is correct

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 *
 * Renamed the function to avoid naming conflicts with other potential `createContext` functions.
 */
const createTRPCContextWrapper = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createTRPCContextWrapper);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient
);
