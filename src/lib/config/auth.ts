import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

const env = process.env;

export const AUTH_ACCESS_TOKEN_SECRET = 'access';
export const AUTH_REFRESH_TOKEN_SECRET = 'refresh';


const jwtOpts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.AUTH_ACCESS_TOKEN_SECRET || AUTH_ACCESS_TOKEN_SECRET,
};

export {
  jwtOpts
};
