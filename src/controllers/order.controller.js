import OrderService from '../services/order.service.js'
import { OK } from '../core/success.res.js'
import { HEADERS } from '../constrant/req.constrant.js'

class OrderController {
  static async checkout(req, res) {
    return new OK({
      message: 'Review successful',
      metadata: await OrderService.review(req.body),
    }).send(res)
  }

  static async order(req, res) {
    return new OK({
      message: 'Order successful',
      metadata: await OrderService.order(req.body),
    }).send(res)
  }
  static async getOrder(req, res) {
    const userId = req.headers[HEADERS.CLIENT]?.toString()
    return new OK({
      message: 'Get order successful',
      metadata: await OrderService.getOrder({ userId, ...req.body }),
    }).send(res)
  }

  static async getAmountOrder(req, res) {
    const userId = req.headers[HEADERS.CLIENT]?.toString()
    return new OK({
      message: 'Get total order successful',
      metadata: await OrderService.getAmountOrders({ userId, ...req.body }),
    }).send(res)
  }
}

export default OrderController
