import { BadRequestError } from '../core/error.res.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import { OK } from '../core/success.res.js'
import CartServices from '../services/cart.service.js'

class CartController {
  static async getCart(req, res) {
    return new OK({
      message: 'Get cart successful',
      metadata: await CartServices.getCart(req.keyStore.userId)
    }).send(res)
  }

  static async addProduct(req, res) {
    return new OK({
      message: 'Add product successful',
      metadata: await CartServices.addProduct({
        userId: req.keyStore.userId,
        product: req.body.product
      })
    }).send(res)
  }

  /* 
  req.body.product = {
    productId,
    productQuantity: newQuantity - oldQuantity
  }
  */

  static async updateProduct(req, res) {
    console.log(req.body)
    const result = await CartServices.updateQuantity({
      userId: req.keyStore.userId,
      ...req.body.product
    })
    if (!result)
      throw new BadRequestError(statusCodes.BAD_REQUEST, 'Update product fail')
    return new OK({
      message: 'Update product successful',
      metadata: result
    }).send(res)
  }

  static async removeCart(req, res) {
    return new OK({
      message: 'Remove cart successful',
      metadata: await CartServices.removeCart(req.keyStore.userId)
    }).send(res)
  }

  static async removeProduct(req, res) {
    return new OK({
      message: 'Remove product in cart successful',
      metadata: await CartServices.removeProduct(
        req.keyStore.userId,
        req.params.productId
      )
    }).send(res)
  }
}

export default CartController
