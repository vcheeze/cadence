import { PrismaClient } from '@prisma/client/edge';

export const db = new PrismaClient();

export interface DatabaseUser {
  id: string;
  email: string;
  name: string;
}
