import { BadRequestError } from '../core/error.res.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js'
import {
  createCart,
  findCartByUserId
} from '../models/repositories/cart.repo.js'
import productRepo from '../models/repositories/product.repo.js'
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
    //check user
    const userExist = await findUserWithId(userId)
    if (!userExist)
      throw new BadRequestError(statusCodes.BAD_REQUEST, 'not found user')

    //get cart
    return await CartServices.createCart(userId)
  }

  //add product
  /*  
    productId
    product_name
    porudtc_count
    product_price
    product_image   
  */

  /*
    product = {
      productId,
      productQuantity,
    }
   */
  static async addProduct({ userId, product }) {
    //check product
    const validProducts = await productRepo.checkProduct(product)
    if (!validProducts)
      throw new BadRequestError(statusCodes.BAD_REQUEST, 'Cant find product')
    //add product

    let cart = await findCartByUserId(userId)
    const userIdObject = convertStringToObjectId(userId)
    const productIdObjet = convertStringToObjectId(product.productId)

    const updateProductExists = await CartServices.updateQuantity(
      userId,
      product
    ) //update if produt exist in cart
    if (
      !updateProductExists.modifiedCount &&
      !updateProductExists.upsertedCount
    ) {
      return await cartModel
        .findOneAndUpdate(
          { userId: userIdObject },
          {
            $push: {
              cart_products: {
                productId: productIdObjet,
                productQuantity: product.productQuantity
              }
            },
            $inc: { cart_count: 1 }
          },
          { upsert: true, new: true }
        )
        .lean()
    }

    return cartModel.findOne({ userId: userIdObject }).lean()
  }

  //reduce product quantity
  //increase product quantity
  static async updateQuantity(userId, product) {
    const { productId, productQuantity = 1 } = product
    return await cartModel.updateOne(
      {
        userId: convertStringToObjectId(userId),
        'cart_products.productId': convertStringToObjectId(productId)
      },
      {
        $inc: {
          'cart_products.$.productQuantity': productQuantity
        }
      }
    )
  }

  //remove one product

  //remove all products
}

export default CartServices
