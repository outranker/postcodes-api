import * as Dotenv from 'dotenv';

type nodeEnvTypes =
  | 'src/config/env/production.env'
  | 'src/config/env/test.env'
  | 'src/config/env/local.env'
  | 'src/config/env/development.env';

let whichNodeEnv: nodeEnvTypes = 'src/config/env/development.env';

whichNodeEnv =
  process.env.NODE_ENV === 'production'
    ? 'src/config/env/production.env'
    : process.env.NODE_ENV === 'test'
    ? 'src/config/env/test.env'
    : process.env.NODE_ENV === 'local'
    ? 'src/config/env/local.env'
    : 'src/config/env/development.env';

const dotEnv = Dotenv.config({
  path: `${whichNodeEnv}`,
});
if (!dotEnv) {
  throw Error('Node environment not loaded!');
}
export default dotEnv;
