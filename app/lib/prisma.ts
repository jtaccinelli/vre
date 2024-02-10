import { PrismaClient } from "@prisma/client";

export async function createPrismaHandler() {
  return new PrismaClient();
}
