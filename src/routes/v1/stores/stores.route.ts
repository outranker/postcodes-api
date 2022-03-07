import express from 'express';
import validate from '../../../middlewares/validate';
import storesValidation from '../../../validations/stores/stores.validation';
import StoresController from '../../../controllers/stores/stores.controller';
import catchAsync from '../../../utils/catchAsync';
// import auth from '../../../middlewares/auth';

const router = express.Router();

router.route('/').get(validate(storesValidation.getOneStore), catchAsync(StoresController.getOneStore));
router.route('/list').get(validate(storesValidation.getStoreList), catchAsync(StoresController.getStoreList));
router
  .route('/coordinates')
  .get(validate(storesValidation.getStoreByCoordinates), catchAsync(StoresController.getStoreCoordinates));
router.route('/nearby').get(validate(storesValidation.getNearbyStores), catchAsync(StoresController.getNearbyStores));

export default router;
