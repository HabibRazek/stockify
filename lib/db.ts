import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

//? this is to avoid the warnnnigs in dev mode caused by hot reloading of next js so the globale dont effected by the hot reloading ( too many connections to the db )
