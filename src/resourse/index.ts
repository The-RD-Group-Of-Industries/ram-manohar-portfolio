/**
 * Provides a Prisma client instance for interacting with the database.
 * 
 * The `db` export is a singleton instance of the Prisma client, which is
 * initialized either from the global `prisma` object (if it exists) or by
 * creating a new Prisma client instance.
 * 
 * If the application is not running in production mode, the `prisma` global
 * is set to the `db` instance for easy access throughout the application.
 * 
 * The `client` export provides a namespace for any additional Prisma-related
 * functionality that may be added in the future.
 */

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export const client = {
  prisma: {},
};
