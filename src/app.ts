import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import jwtStrategy from './config/passport';
import config from './config/config';
import stores from './config/load-stores';
import authLimiter from './middlewares/rateLimiter';
import routes from './routes/v1';
import Errors from './middlewares/error';
import pino from './config/pino';
import pe from 'express-pino-logger';
const pinoExpress = pe({
  logger: pino,
  base: undefined,
});
const app = express();

// using pino express logger
app.use(pinoExpress);

// setting stores to app locals
// app.locals.stores = stores();

// set security HTTP headers
app.use(helmet());

// parse json request body
// app.use(express.json());
app.use(express.json());

// serving static files
app.use(express.static('public'));

// parse urlencoded request body
// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());

// TS throwing errors, probably this isn't the way to use
// app.options(cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// default landing page
app.get('/', (req, res) => {
  res.send({ code: 1000, data: 'Success' });
});

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  // next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));

  res.sendStatus(404);
});

// convert error to ApiError, if needed
app.use(Errors.errorConverter);

// handle error
app.use(Errors.errorHandler);

export default app;

// export function listen(port: any, arg1: () => void): any {
//   throw new Error('Function not implemented.');
// }
