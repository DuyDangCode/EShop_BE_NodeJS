import express from 'express';
import { authentication } from '../../auth/checkAuth.js';
import ProductController from '../../controllers/product.controller.js';
import { asyncHandler } from '../../helpers/index.helper.js';

const productRouter = express.Router();

productRouter.use(authentication);
productRouter.post('', asyncHandler(ProductController.createProduct));

export default productRouter;
