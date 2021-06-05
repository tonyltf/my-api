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

  PORT: env.PORT || 8000,
  AUTH_PORT: env.PORT || 8001,
};
