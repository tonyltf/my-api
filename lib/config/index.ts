import * as dotenv from 'dotenv';

dotenv.config();

const env = process.env;

export default {
  PORT: env.PORT || 3000,
};
