import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env;

export default {
  DEBUG: env.NODE_ENV === 'dev' || env.DEBUG == '1',

  DB: {
    CLIENT: env.DB_CLIENT || 'pg',
    VERSION: env.DB_VERSION || '13.3',
    HOST: env.DB_HOST || '172.17.0.2',
    USER: env.DB_USER || 'postgres',
    PASSWORD: env.DB_PASSWORD || 'password',
    NAME: env.DB_NAME || 'mydb',
  },

  AUTH: {
    ACCESS_TOKEN_SECRET: env.AUTH_ACCESS_TOKEN_SECRET || 'access',
    REFRESH_TOKEN_SECRET: env.AUTH_REFRESH_TOKEN_SECRET || 'refresh',
    EXPIRES_IN: env.AUTH_EXPIRES_IN || 3600,
  },

  PORT: env.PORT || 8000,
  AUTH_PORT: env.PORT || 8001,
};
