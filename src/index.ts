import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import morgan from 'morgan';


import config from './lib/config';
import { getUser } from './lib/db/users';
import { jwtOpts } from './lib/config/auth';

const PORT = config.PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('public'));

passport.use(new JwtStrategy(jwtOpts, function(jwt_payload, done) {
  console.log({ jwt_payload });
  return done(null, { test: 1 });
})); 

// passport.serializeUser((user: any, done) => done(null, user));

// passport.deserializeUser((user: any, done) => done(null, user));

// app.use(passport.initialize());
// app.use(passport.session());


app.get('/', (req: Request, res: Response, next) => {
  res.status(200).send('Hello world');
});

app.get('/private', passport.authenticate('jwt', { session: false }), (req: Request, res: Response, next) => {
  res.status(200).send('Private Hello world');
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
