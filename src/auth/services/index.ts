import TokenService from './token'
import AccountService from './account';

const logger: any = console;

export default {
  ...TokenService(logger),
  ...AccountService(logger),
};
