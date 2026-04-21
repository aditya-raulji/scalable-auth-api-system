import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { env } from './env';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const connectionString = env.databaseUrl || process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_RXuP2GIgq3JV@ep-mute-smoke-am9p5v3x-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = global.prisma || new PrismaClient({ adapter });

prisma
  .$connect()
  .then(() => {
    console.log('Prisma connected successfully');
  })
  .catch((error) => {
    console.error('Prisma connection error:', error);
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };
