import { BadRequestError } from '../core/error.res.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import cartModel from '../models/cart.model.js'
import productModel from '../models/product.model.js'
import {
  createCart,
  findCartByUserId,
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
  static async getCart(userId) {
    //check user
    const userExist = await findUserWithId(userId)
    if (!userExist) throw new BadRequestError('not found user')

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
    const validProduct = await productRepo.checkProduct(product)
    if (!validProduct) throw new BadRequestError('Cant find product')
    //add product

    let cart = await findCartByUserId(userId)
    const userIdObject = convertStringToObjectId(userId)
    const productIdObjet = convertStringToObjectId(product.productId)

    const updateProductExists = await CartServices.updateQuantityV2(
      userId,
      product,
    ) //update if produt exist in cart
    if (updateProductExists) {
      return updateProductExists
    }

    return await cartModel
      .findOneAndUpdate(
        { userId: userIdObject },
        {
          $push: {
            cart_products: {
              productId: productIdObjet,
              product_thumb: validProduct.product_thumb,
              product_name: validProduct.product_name,
              product_price: validProduct.product_price,
              productQuantity: product.productQuantity,
            },
          },
          $inc: { cart_count: 1 },
        },
        { upsert: true, new: true },
      )
      .lean()
  }

  //reduce product quantity
  //increase product quantity
  static async updateQuantity({ userId, productId, newQuantity, oldQuantity }) {
    const productQuantity = newQuantity - oldQuantity
    //check product
    const validProducts = await productRepo.checkProduct({
      productId,
      productQuantity,
    })

    if (!validProducts) throw new BadRequestError('Cant find product')

    const updateProductExists = await cartModel.updateOne(
      {
        userId: convertStringToObjectId(userId),
        'cart_products.productId': convertStringToObjectId(productId),
        'cart_products.productQuantity': { $ne: newQuantity },
        'cart_products.productQuantity': { $eq: oldQuantity },
      },
      {
        $inc: {
          'cart_products.$.productQuantity': productQuantity,
        },
      },
    )

    if (updateProductExists.modifiedCount || updateProductExists.upsertedCount)
      return cartModel
        .findOne({ userId: convertStringToObjectId(userId) })
        .lean()

    return null
  }

  static async updateQuantityV2(userId, product) {
    const { productId, productQuantity = 1 } = product
    const updateProductExists = await cartModel.updateOne(
      {
        userId: convertStringToObjectId(userId),
        'cart_products.productId': convertStringToObjectId(productId),
      },
      {
        $inc: {
          'cart_products.$.productQuantity': productQuantity,
        },
      },
    )

    if (updateProductExists.modifiedCount || updateProductExists.upsertedCount)
      return cartModel
        .findOne({ userId: convertStringToObjectId(userId) })
        .lean()

    return null
  }

  //remove one product
  static async removeProduct(userId, productId) {
    const productIdObject = convertStringToObjectId(productId)
    return await cartModel
      .findOneAndUpdate(
        {
          userId: convertStringToObjectId(userId),
          'cart_products.productId': convertStringToObjectId(productId),
        },
        {
          $pull: {
            cart_products: {
              productId: productIdObject,
            },
          },
          $inc: {
            cart_count: -1,
          },
        },
        {
          new: true,
        },
      )
      .lean()
  }

  //remove all products
  static async removeCart(userId) {
    return await cartModel
      .findOneAndUpdate(
        { userId: userId },
        {
          cart_products: [],
          cart_count: 0,
        },
        {
          upsert: true,
          new: true,
        },
      )
      .lean()
  }
}

export default CartServices
