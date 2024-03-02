import express from 'express'
import { asyncHandler } from '../../helpers/index.helper.js'
import CartController from '../../controllers/cart.controller.js'
import { authentication } from '../../auth/checkAuth.js'

const cartRouter = express.Router()

cartRouter.use(authentication)
cartRouter.get('/', asyncHandler(CartController.getCart))
cartRouter.post('/', asyncHandler(CartController.addProduct))
cartRouter.patch('/', asyncHandler(CartController.updateProduct))
cartRouter.delete('/', asyncHandler(CartController.removeCart))
cartRouter.delete(
  '/products/:productId',
  asyncHandler(CartController.removeProduct)
)

export default cartRouter
