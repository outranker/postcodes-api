import './env/index';
import Joi from 'joi';

// commenting default config
// dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required().required(),
    PORT: Joi.number().default(3000).required(),
    JWT_SECRET: Joi.string().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    TWILIO_ACCOUNT_SID: Joi.string().description('twilio account id'),
    TWILIO_AUTH_TOKEN: Joi.string().description('twilio auth token'),
    AWS_ACCESS_KEY_ID: Joi.string().description('aws access key id'),
    AWS_SECRET_ACCESS_KEY: Joi.string().description('aws secret access key'),
    AWS_REGION: Joi.string().description('aws region'),
    S3_BUCKET_NAME: Joi.string().description('s3 bucket name'),
    NODE_MAILER_USER: Joi.string().description('nodemailer user configuration'),
    NODE_MAILER_PASS: Joi.string().description('nodemailer pass configuration'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  twilio: {
    accountId: envVars.TWILIO_ACCOUNT_SID,
    token: envVars.TWILIO_AUTH_TOKEN,
  },
  keys: {
    secretOrKey: envVars.JWT_SECRET,
    secretOrKeyAdmin: envVars.JWT_SECRET_ADMIN,
  },
  aws: {
    awsAccessKeyId: envVars.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    awsRegion: envVars.AWS_REGION,
  },
  s3: {
    bucketName: envVars.S3_BUCKET_NAME,
  },
  nodemailer: {
    user: envVars.NODE_MAILER_USER,
    pass: envVars.NODE_MAILER_PASS,
  },
  gorse: {
    vibe_url: envVars.GORSE_VIBE_API,
    user_url: envVars.GORSE_USER_API,
  },
  git: {
    lastCommitMessage: process.env.lastCommitMessage as string,
    lastCommitHash: process.env.lastCommitHash as string,
    lastCommitDate: process.env.lastCommitDate as unknown as Date,
  },
};
