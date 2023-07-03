import { z } from 'zod';

export {};

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_BUILD_OPTION: z.enum(['ignoreType', 'checkType']),
  NEXT_ESLINT_OPTION: z.enum(['ignoreLint', 'checkLint']),
  NEXT_PUBLIC_CHAT_SERVER_URL: z.string(),
  NEXT_PUBLIC_AWS_BUCKET: z.string(),
});

declare global {
  namespace NodeJS {
    type NodeEnv = 'development' | 'production';
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
