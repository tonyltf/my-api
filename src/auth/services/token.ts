import jwt from 'jsonwebtoken';

import config from '../../lib/config';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, EXPIRES_IN, REFRESH_EXPIRES_IN, TOKEN_TYPE } = config.AUTH;

const TokenService = ((logger: any) => {

  const generateAccessToken = (payload: any) => jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: EXPIRES_IN
  });

  const generateRefreshToken = (payload: any) => jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN
  });

  const generateToken = (payload: any) => ({
    access_token: generateAccessToken(payload),
    refresh_token: generateRefreshToken(payload),
    expires_in: EXPIRES_IN,
    token_type: TOKEN_TYPE
  });

  const refreshToken = (refreshToken: string) => {
    try {
      const payload: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const { iat, exp, nbf, jti, ...rest } = payload;

      return generateToken(rest);
    } catch (e) {
      logger?.error(e);
      // throw new HttpError(HTTP_STATUS.UNAUTHORIZED, 'invalid refresh token', { info: 'invalid refresh token' });
    }
  };

  return {
    generateAccessToken,
    generateRefreshToken,
    generateToken,
    refreshToken,
  }
});

export default TokenService;
