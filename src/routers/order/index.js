import express from 'express'
import OrderController from '../../controllers/order.controller.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import { authentication, checkRoleCustomer } from '../../auth/checkAuth.js'

const orderRouter = express.Router()

orderRouter.use(checkRoleCustomer)
orderRouter.post('/review', asyncHandler(OrderController.checkout))
orderRouter.post('', asyncHandler(OrderController.order))

export default orderRouter
