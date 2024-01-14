import express from 'express';
import { authentication } from '../../auth/checkAuth.js';
import ProductController from '../../controllers/product.controller.js';
import { asyncHandler } from '../../helpers/index.helper.js';

const productRouter = express.Router();

productRouter.get(
  '/published/all',
  asyncHandler(ProductController.getAllPublished)
);

productRouter.use(authentication);
productRouter.post('', asyncHandler(ProductController.createProduct));
productRouter.get('/draft/all', asyncHandler(ProductController.getAllDraft));
productRouter.post(
  '/publish',
  asyncHandler(ProductController.publishOneProduct)
);
productRouter.post(
  '/unpublish',
  asyncHandler(ProductController.unPublishOneProduct)
);

export default productRouter;
