import * as dotenv from 'dotenv';
import { AUTH_ACCESS_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET } from './auth';

dotenv.config();

const env = process.env;

export default {
  DEBUG: env.NODE_ENV === 'dev' || env.DEBUG == '1',

  DB: {
    CLIENT: env.DB_CLIENT || 'pg',
    VERSION: env.DB_VERSION || '13.3',
    HOST: env.DB_HOST || '172.17.0.3',
    USER: env.DB_USER || 'postgres',
    PASSWORD: env.DB_PASSWORD || 'password',
    NAME: env.DB_NAME || 'mydb',
  },

  AUTH: {
    ACCESS_TOKEN_SECRET: env.AUTH_ACCESS_TOKEN_SECRET || AUTH_ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: env.AUTH_REFRESH_TOKEN_SECRET || AUTH_REFRESH_TOKEN_SECRET,
    EXPIRES_IN: env.AUTH_EXPIRES_IN || 3600,
    REFRESH_EXPIRES_IN: env.REFRESH_EXPIRES_IN || '7d',
    TOKEN_TYPE: env.TOKEN_TYPE || 'Bearer',
  },

  PORT: env.PORT || 3000,
  AUTH_PORT: env.AUTH_PORT || 3000,
};
