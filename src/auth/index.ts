import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import { BasicStrategy } from 'passport-http';
import morgan from 'morgan';

import config from '../lib/config';
import services from './services';
import { GrantType, HTTP_STATUS } from '../lib/constant';
import logger from '../lib/logger';

const PORT = config.AUTH_PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
})); 

passport.use(
  new BasicStrategy(async (username: string, password: string, done: Function) => {
    try {
      const { validateUser } = services;
      const result: any =  await validateUser({ username, password });
      if (result) {
        return done(null, { uid: result.uid });
      }
    } catch (e) {
      logger.error(e);
    }
    return done(null, false, { message: 'Invalid username or password.' });
  })
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('basic', { successRedirect: '/loggedIn' }));
app.get('/loggedIn', passport.authenticate('basic', { session: false }), (req: Request, res: Response, next) => {
  try{
    const payload = req.user;
    const { generateToken } = services;
    res.status(HTTP_STATUS.OK).send(generateToken(payload));
  } catch (e) {
    res.status(HTTP_STATUS.SERVER_ERROR).send();
  }
});

app.post('/register', async (req: Request, res: Response, next) => {
  try {
    const { username, password } = req.body;
    const { createAccount } = services;
    if (username && password) {
      const result = await createAccount({ username, password });
      if (result) {
        res.status(HTTP_STATUS.OK).send({ success: true });
      } 
    }
  } catch (e) {
    logger.error(e);
    res.status(HTTP_STATUS.SERVER_ERROR).send();
  }
});

app.post('/token', async (req: Request, res: Response, next) => {
  try{
    const payload = req.body;
    const { grant_type, refresh_token } : { grant_type: GrantType, refresh_token: string } = payload;
    const { refreshToken } = services;

    if (grant_type === GrantType.refresh_token) {
      res.status(HTTP_STATUS.OK).send(refreshToken(refresh_token));
    } else {
      // throw new HttpError(HTTP_STATUS.BAD_REQUEST, 'invalid grant_type', { payload });
      res.status(HTTP_STATUS.BAD_REQUEST).send('invalid grant_type');
    }
  } catch (e) {
    logger.error(e);
    res.status(HTTP_STATUS.SERVER_ERROR).send();
  }
});

app.listen(PORT, () => {
  logger.info(`Listening to port ${PORT}`);
});
