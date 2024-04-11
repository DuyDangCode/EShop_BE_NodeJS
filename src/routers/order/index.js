import express from 'express'
import OrderController from '../../controllers/order.controller.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import { authentication } from '../../auth/checkAuth.js'

const orderRouter = express.Router()

orderRouter.use(authentication)
orderRouter.post('/review', asyncHandler(OrderController.checkout))
orderRouter.post('', asyncHandler(OrderController.order))

export default orderRouter
