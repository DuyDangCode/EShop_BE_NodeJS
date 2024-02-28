import express from 'express'
import CartServices from '../../services/cart.service.js'
import { asyncHandler } from '../../helpers/index.helper.js'
import CartController from '../../controllers/cart.controller.js'

const cartRouter = express.Router()
cartRouter.get('/:userId', asyncHandler(CartController.getCart))
cartRouter.post('/:userId', asyncHandler(CartController.addProduct))

export default cartRouter
