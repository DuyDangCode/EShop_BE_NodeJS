import { convertStringToObjectId } from '../../utils/index.js'
import cartModel from '../cart.model.js'

const findCartByUserId = async (userId) => {
  return await cartModel
    .findOne({ userId: convertStringToObjectId(userId) })
    .lean()
}

const createCart = async (userId, cartProducts = [], cartCount = 0) => {
  return await cartModel.create({
    userId: convertStringToObjectId(userId),
    cart_count: cartCount,
    cartProducts: cartProducts
  })
}

export { findCartByUserId, createCart }
