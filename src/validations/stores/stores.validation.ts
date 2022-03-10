import Joi from 'joi';

/**
 * validation for /v1/stores/
 * query param: name string required
 */
const getOneStore = {
  query: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

const getStoreList = {};

/**
 * validation for /v1/stores/coordinates
 * query param: postcode string optional
 */
const getStoreByCoordinates = {
  query: Joi.object().keys({
    postcode: Joi.string().optional(),
  }),
};

/**
 * validation for /v1/stores/nearby
 * query param: postcode string required
 * query param: radius string required
 */
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
