import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import { BasicStrategy } from 'passport-http';

import config from '../lib/config';
import { getUser } from '../lib/db/users';
import services from './services';

const PORT = config.AUTH_PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "cats" }));

passport.use(new BasicStrategy(
  async (username: string, password: string, done: Function) => {
    try {

      const result: any = await getUser({ username, password });
      console.log({ result })
      if (result) {
        return done(null, { uid: result.uid })
      }
    } catch (e) {
      console.error(e);
    }
    return done(null, false);
    // return done(null, false, { message: 'Invalid username or password.' });
  }
))

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

app.get('/token', 
  passport.authenticate('basic', { session: false }),
  (req: Request, res: Response, next) => {
  const payload = req.user;
  console.log({ payload });
  const { generateAccessToken, generateRefreshToken, getAccessTokenExpires } = services;

  res.status(200).send({
    access_token: generateAccessToken(payload),
    refresh_token: generateRefreshToken(payload),
    expires_in: getAccessTokenExpires(),
    token_type: 'bearer'
  });
});

app.post('/login',
  passport.authenticate('basic', { successRedirect: '/token' }));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
 