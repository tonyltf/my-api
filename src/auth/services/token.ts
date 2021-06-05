import jwt from 'jsonwebtoken';

import config from '../../lib/config';

const { ACCESS_TOKEN_SECRET, REFERSH_TOKEN_SECRET, EXPIRES_IN } = config.AUTH;

const TokenService = ((logger: any) => {

  const generateToken = (payload: any) => jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: EXPIRES_IN
  });

  return {
    generateToken,
  }
});

export default TokenService;
