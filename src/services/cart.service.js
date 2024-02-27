import { BadRequestError } from '../core/error.res.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import cartModel from '../models/cart.model.js'
import {
  createCart,
  findCartByUserId
} from '../models/repositories/cart.repo.js'
import { findUserWithId } from '../models/repositories/user.repo.js'
import { convertStringToObjectId } from '../utils/index.js'

class CartServices {
  //create cart
  static async createCart(userId) {
    const cart = await findCartByUserId(userId)
    if (cart) return cart
    return await createCart(userId)
  }

  //get cart
  static async getCart({ userId }) {
    console.log('userId', userId)
    //check user
    const userExist = await findUserWithId(userId)
    if (!userExist)
      throw new BadRequestError(statusCodes.BAD_REQUEST, 'not found user')

    //get cart
    return await CartServices.createCart(userId)
  }

  //reduce product quantty

  //increase product quantity

  //remove one product

  //remove all products
}

export default CartServices
