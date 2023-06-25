import { z } from 'zod';

export {};

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_BUILD_OPTION: z.enum(['ignoreType', 'checkType']),
  NEXT_ESLINT_OPTION: z.enum(['ignoreLint', 'checkLint']),
});

declare global {
  namespace NodeJS {
    type NodeEnv = 'development' | 'production';
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
