import { OK } from '../core/success.res.js'
import CartServices from '../services/cart.service.js'

class CartController {
  static async getCart(req, res) {
    return new OK({
      message: 'Get cart successful',
      metadata: await CartServices.getCart(req.params)
    }).send(res)
  }
}

export default CartController
