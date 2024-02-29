import { BadRequestError } from '../core/error.res.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import { OK } from '../core/success.res.js'
import CartServices from '../services/cart.service.js'

class CartController {
  static async getCart(req, res) {
    return new OK({
      message: 'Get cart successful',
      metadata: await CartServices.getCart(req.params)
    }).send(res)
  }

  static async addProduct(req, res) {
    return new OK({
      message: 'Add product successful',
      metadata: await CartServices.addProduct({
        userId: req.params.userId,
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
      userId: req.params.userId,
      ...req.body.product
    })
    if (!result)
      throw new BadRequestError(statusCodes.BAD_REQUEST, 'Update product fail')
    return new OK({
      message: 'Update product successful',
      metadata: result
    }).send(res)
  }
}

export default CartController
