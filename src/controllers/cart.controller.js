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
}

export default CartController
