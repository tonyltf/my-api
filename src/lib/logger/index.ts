import winston from 'winston';
import WinstonLogStash from 'winston3-logstash-transport';

// const transportsConfiguration = {
//   port: 5044,
//   node_name: 'my node name',
//   host: '127.0.0.1'
// };

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ]
});


logger.add(new WinstonLogStash({
  mode: 'tcp',
  host: '127.0.0.1',
  port: 5044
}));

export default logger;
