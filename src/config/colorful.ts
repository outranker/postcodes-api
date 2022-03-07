import './env/index';
import chalk from 'chalk';
const dev = {
  listenPort: chalk.greenBright.bold('[LISTEN]', chalk.cyanBright.bold('PORT'), chalk.whiteBright.bold(process.env.PORT)),
  environmentNode: chalk.greenBright.bold(
    '[ENVIRONMENT]',
    chalk.cyanBright.bold('NODE'),
    chalk.whiteBright.bold(process.env.NODE_ENV)
  ),
  databaseMongo: chalk.greenBright.bold(
    '[DATABASE]',
    chalk.cyanBright.bold('MongoDB'),
    chalk.whiteBright.bold('Connected!')
  ),
};
const prod = {
  listenPort: `[LISTEN] PORT ${process.env.PORT}`,

  environmentNode: `[ENVIRONMENT] NODE ${process.env.NODE_ENV}`,

  databaseMongo: `[DATABASE] MongoDB Connected!`,
};
const env = process.env.NODE_ENV !== 'production' ? dev : prod;
export default prod;
