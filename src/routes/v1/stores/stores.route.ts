import express from 'express';
import validate from '../../../middlewares/validate';
import storesValidation from '../../../validations/stores/stores.validation';
import StoresController from '../../../controllers/stores/stores.controller';
import catchAsync from '../../../utils/catchAsync';

const router = express.Router();

/**
 * get a store by name
 */
router.route('/').get(validate(storesValidation.getOneStore), catchAsync(StoresController.getOneStore));

/**
 * get all stores array as is
 */
router.route('/list').get(validate(storesValidation.getStoreList), catchAsync(StoresController.getStoreList));

/**
 * get the latitude and longitude for each postcode
 */
router
  .route('/coordinates')
  .get(validate(storesValidation.getStoreByCoordinates), catchAsync(StoresController.getStoreCoordinates));

/**
 * get list of stores in a given radius of a given postcode
 */
router.route('/nearby').get(validate(storesValidation.getNearbyStores), catchAsync(StoresController.getNearbyStores));

export default router;
