import p from 'pino';
const pinoLevel = [
  {
    fatal: 60,
    error: 50,
    warn: 40,
    info: 30,
    debug: 20,
    trace: 10,
    silent: 'infinity',
  },
];
const pino = p({
  redact: { paths: ['req.headers', 'res.headers', 'hostname', 'pid', 'req.id', 'req.remotePort'], remove: true },
  customLevels: {
    systemLog: 32,
    console: 33,
    notFound: 51,
    generalErrorHandler: 52,
    axiosErr: 53,
    catchException: 61,
    catchRejection: 62,
  },
  mixin() {
    return { microservice: 'postcodes-api' };
  },
  timestamp: true,
});

export default pino;
