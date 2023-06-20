export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      HOST?: string;
      LOG_LEVEL?: 'trace' | 'debug' | 'info' | 'event' | 'warn' | 'error' | 'fatal' | 'silent';
      CORS?: string;
      DATABASE_URL?: string;
    }
  }
}
