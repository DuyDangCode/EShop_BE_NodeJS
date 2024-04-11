import express from 'express'
import OrderController from '../../controllers/order.controller.js'
import { asyncHandler } from '../../helpers/index.helper.js'

const orderRouter = express.Router()

orderRouter.post('/review', asyncHandler(OrderController.checkout))
orderRouter.post('', asyncHandler(OrderController.order))

export default orderRouter
