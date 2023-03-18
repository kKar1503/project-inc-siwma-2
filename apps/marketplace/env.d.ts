export {};

declare global {
  namespace NodeJS {
    type NodeEnv = 'development' | 'production';
    interface ProcessEnv {
      NEXT_BUILD_OPTION: 'ignoreType' | 'checkType';
    }
  }
}
