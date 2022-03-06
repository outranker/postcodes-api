import config from '../config/config';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'postcodes-api documentation',
    version: '0.9.0',
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
      description: 'for local use',
    },
    {
      url: `https://postcodes-api.javohirmirzo.com/v1`,
      description: 'for production use',
    },
  ],
};

export default swaggerDef;
