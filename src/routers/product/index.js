import express from 'express'
import { authentication, checkRoleAdmin } from '../../auth/checkAuth.js'
import ProductController from '../../controllers/product.controller.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import { multerUploadSingleImage } from '../../configs/multer.config.js'

const productRouter = express.Router()

productRouter.get(
  '/published/all',
  asyncHandler(ProductController.getAllProductPublied),
)
productRouter.get(
  '/published/one/:product_slug',
  asyncHandler(ProductController.getOnePublisedProductBySlug),
)
productRouter.get(
  '/published/total',
  asyncHandler(ProductController.getTotalPublishedProduct),
)
productRouter.get(
  '/published/:product_type',
  asyncHandler(ProductController.getPublishedProductByCategory),
)

productRouter.get('/search/:keyword', asyncHandler(ProductController.search))
productRouter.get('', asyncHandler(ProductController.getOneProduct))

productRouter.use(checkRoleAdmin)
productRouter.post(
  '',
  multerUploadSingleImage,
  asyncHandler(ProductController.createProduct),
)
productRouter.patch(
  '/:productId',
  asyncHandler(ProductController.updateProduct),
)
productRouter.get('/draft/all', asyncHandler(ProductController.getAllDraft))
productRouter.post(
  '/publish',
  asyncHandler(ProductController.publishOneProduct),
)
productRouter.post(
  '/unpublish',
  asyncHandler(ProductController.unPublishOneProduct),
)
productRouter.get('/all', asyncHandler(ProductController.getAllProduct))
export default productRouter
