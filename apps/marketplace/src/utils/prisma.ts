import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | undefined;

const client = prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') prisma = client;

export default client;
