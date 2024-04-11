import OrderService from '../services/order.service.js'
import { OK } from '../core/success.res.js'

class OrderController {
  static async checkout(req, res) {
    return new OK({
      message: 'Review successful',
      metadata: await OrderService.review(req.body)
    }).send(res)
  }

  static async order(req, res) {
    return new OK({
      message: 'Order successful',
      metadata: await OrderService.order(req.body)
    }).send(res)
  }
}

export default OrderController
