declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'local' | 'test';
      MARIADB_HOST: number;
      MARIADB_USER: string;
      MARIADB_NAME: string;
      MARIADB_PASS: string;
      MARIADB_PORT: number;
      APP_PORT: number;
      MARIADB_POOLSIZE: number;
      SECRETFORPASSWORD: string;
      SECRET: string;
      UPLOADPATH: string;
      S3_BUCKET_NAME: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_REGION: string;
      AWS_BUCKET_NAME: string;
    }
    interface Global {
      STATUS_NORMAL: number;
      STATUS_HIDDEN: number;
      USER_STATUS_NORMAL: number;
      USER_STATUS_BLACK: number;
      FALSE: number;
      TRUE: number;
      REG_EXP: any;
    }
  }
}

export {};
