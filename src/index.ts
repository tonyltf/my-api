import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from '../lib/config';


// const PORT : number = parseInt(process.env["PORT"], 10) || 8080;
const PORT = config.PORT;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
})