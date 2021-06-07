import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import { BasicStrategy } from 'passport-http';
import morgan from 'morgan';

import config from '../lib/config';
import { getUser } from '../lib/db/users';
import services from './services';

const PORT = config.AUTH_PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));
app.use(session({ secret: 'cats' }));

passport.use(
  new BasicStrategy(async (username: string, password: string, done: Function) => {
    try {
      const result: any = await getUser({ username, password });
      if (result) {
        return done(null, { uid: result.uid });
      }
    } catch (e) {
      console.error(e);
    }
    return done(null, false, { message: 'Invalid username or password.' });
  })
);

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => done(null, user));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('basic', { successRedirect: '/token' }));

app.get('/token', passport.authenticate('basic', { session: false }), (req: Request, res: Response, next) => {
  try{
    const payload = req.user;
    const { generateToken } = services;
    res.status(200).send(generateToken(payload));
  } catch (e) {
    res.status(500).send();
  }
});

app.post('/register', async (req: Request, res: Response, next) => {
  try {
    const { username, password } = req.body;
    const { createAccount } = services;
    if (username && password) {
      const result = await createAccount({ username, password });
      if (result) {
        res.status(200).send({ success: true });
      }
    }
  } catch (e) {
    res.status(500).send();
  }
  res.status(400).send({ success: false });
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
