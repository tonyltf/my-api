import TokenService from './token'


const logger = console;

export default {
  ...TokenService(logger),
};
