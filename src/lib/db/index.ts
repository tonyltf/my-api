import knex from 'knex';
import config from '../config';
const { CLIENT, VERSION, HOST, USER, PASSWORD, NAME } = config.DB;

const pg = knex({
  client: CLIENT,
  version: VERSION,
  connection: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: NAME,
  },
  debug: config.DEBUG
});

export default pg;
