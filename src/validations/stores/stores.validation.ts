import Joi from 'joi';

const getOneStore = {
  query: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getStoreList = {};

const getStoreByCoordinates = {
  query: Joi.object().keys({
    postcode: Joi.string().optional(),
  }),
};
const getNearbyStores = {
  query: Joi.object().keys({
    postcode: Joi.string().required(),
    radius: Joi.string().required(),
  }),
};
export default {
  getOneStore,
  getStoreList,
  getStoreByCoordinates,
  getNearbyStores,
};
