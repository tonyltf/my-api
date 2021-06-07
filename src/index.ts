import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import config from './lib/config';

const PORT = config.PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req: Request, res: Response, next) => {
  res.status(200).send('Hello world');
});
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
