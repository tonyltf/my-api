import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';
import { BasicStrategy } from 'passport-http';

import config from './lib/config';

const PORT = config.PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "cats" }));

passport.use(new BasicStrategy(
  (username: string, password: string, done: Function) => {
    console.log({ username, password, done})
    return done(null, { username, password })
    return done(null, false, { message: 'Invalid username or password.' });
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req: Request, res: Response, next) => {
  res.status(200).send('Hello world');
});

app.get('/unauthorized', (req: Request, res: Response, next) => {
  res.status(401).send();
});

app.get('/token', 
  passport.authenticate('basic', { session: false }),
  (req: Request, res: Response, next) => {
  console.log(req.user)
  res.status(200).send({
    access_token: 'test',
    refresh_token: 'test',
    expires_in: 123,
    token_type: 'bearer'
  });
});

app.post('/login',
  passport.authenticate('basic', { successRedirect: '/token' }));

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
 