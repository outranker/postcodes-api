import './init';
import './config/env/index';
import app from './app';
import config from './config/config';
import colorful from './config/colorful';
import logger from './config/pino';

let server: any;
server = app.listen(config.port, () => {
  logger.systemLog(colorful.listenPort);
  logger.systemLog(colorful.environmentNode);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.fatal('Server closed on unexpected error');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: any) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    logger.systemLog(`${signal} RECEIVED. CLOSING APPLICATION!`);
    if (server) {
      server.close();
    }
    process.exit(1);
  });
}
