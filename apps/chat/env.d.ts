export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      LOG_LEVEL?: 'trace' | 'debug' | 'info' | 'event' | 'warn' | 'error' | 'fatal' | 'silent';
    }
  }
}
