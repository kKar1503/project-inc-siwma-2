import { PrismaClient } from '@prisma/client';
import { logger } from '@/utils/logger';

logger.info('Initializing PrismaClient...');
let prisma = new PrismaClient();

export default prisma;
