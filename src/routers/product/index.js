import express from 'express'
import { authentication } from '../../auth/checkAuth.js'
import ProductController from '../../controllers/product.controller.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import { multerUploadSingleImage } from '../../configs/multer.config.js'

const productRouter = express.Router()

productRouter.get(
  '/published/all',
  asyncHandler(ProductController.getAllProduct)
)
productRouter.get('/search/:keyword', asyncHandler(ProductController.search))
productRouter.get('', asyncHandler(ProductController.getOneProduct))

productRouter.use(authentication)
productRouter.post(
  '',
  multerUploadSingleImage,
  asyncHandler(ProductController.createProduct)
)
productRouter.patch(
  '/:productId',
  asyncHandler(ProductController.updateProduct)
)
productRouter.get('/draft/all', asyncHandler(ProductController.getAllDraft))
productRouter.post(
  '/publish',
  asyncHandler(ProductController.publishOneProduct)
)
productRouter.post(
  '/unpublish',
  asyncHandler(ProductController.unPublishOneProduct)
)

export default productRouter
