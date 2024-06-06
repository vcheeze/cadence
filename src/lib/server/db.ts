import { PrismaClient } from '@prisma/client/edge';

import { DATABASE_URL } from '$env/static/private';

export const db = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  }
});

export interface DatabaseUser {
  id: string;
  email: string;
  name: string;
}
