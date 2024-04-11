import {
  BadRequestError,
  InternalServerError,
  OrderError
} from '../core/error.res.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import orderModel from '../models/order.model.js'
import { findCartByUserId } from '../models/repositories/cart.repo.js'
import inventoryRepo from '../models/repositories/inventory.repo.js'
import productRepo from '../models/repositories/product.repo.js'
import { findUserWithId } from '../models/repositories/user.repo.js'
import {
  findVoucherByIdPublish,
  updateVoucherById
} from '../models/repositories/voucher.repo.js'
import { convertStringToObjectId } from '../utils/index.js'
import { aquireLock, releaseLock } from './redis.service.js'
import VoucherService from './voucher.service.js'

class OrderService {
  /**
   * cart_Id
   * user_Id
   * products: [
   *  product1: {
   *  voucherId
   *  productId,
   *  product_quantity,
   *  product_price,
   *  }
   *
   * ]
   */
  static async review({ cartId, userId, products }) {
    if (!cartId || !userId || !products) throw new BadRequestError()

    //kiem tra cartid co ton tai
    const foundCart = await findCartByUserId(userId)
    if (!foundCart) throw new BadRequestError('not found cart')
    //kiem tra userId trong cartId co giong nhau

    if (foundCart._id.toString() !== cartId)
      throw new BadRequestError('not found cart')
    //kiem tra san pham
    //kiem tra san pham co ton tai va gia cua san pham co dung
    const isCheckProducts = await productRepo.checkProductIds(products)
    if (!isCheckProducts) throw new OrderError('something wrong')

    const results = {
      totalCost: 0,
      feeShip: 0,
      totalDiscount: 0,
      totalCheckout: 0
    }
    //chua co kiem tra gia va so luong
    for (let i = 0; i < products.length; i++) {
      results.totalCost +=
        products[i].product_price * products[i].product_quantity

      results.totalCheckout += await VoucherService.applyVoucher({
        voucherId: products[i].voucherId,
        product_price: products[i].product_price,
        product_quantity: products[i].product_quantity,
        productId: products[i].productId,
        userId
      })

      const { voucher_value } = await findVoucherByIdPublish(
        products[i].voucherId
      )
      results.totalDiscount += voucher_value
    }

    return results
  }

  static async order({
    cartId,
    userId,
    products,
    address,
    phone,
    order_payment
  }) {
    if (!cartId || !userId || !products || !address || !phone || !order_payment)
      throw new BadRequestError('something is missed')

    const checkoutContent = await OrderService.review({
      cartId,
      userId,
      products
    })

    const aquireProducts = []
    const inventoryIds = []
    const productIndexs = []
    for (let i = 0; i < products.length; i++) {
      const lock = await aquireLock(
        products[i].productId,
        products[i].product_quantity,
        cartId
      )
      if (lock) {
        releaseLock(lock.key)
        inventoryIds.push(lock.invenId)
        productIndexs.push(i)
      } else {
        aquireProducts.push(false)
      }
    }

    if (aquireProducts[0] === false) {
      //return goods inventory
      try {
        for (let i = 0; i < inventoryIds.length; i++) {
          const result = await inventoryRepo.returnGoodsInventory(
            inventoryIds[i],
            products[productIndexs[i]].product_quantity,
            cartId
          )
        }
      } catch (error) {
        throw new InternalServerError('Somthing wrong')
      }
      throw new BadRequestError('Sold out')
    }

    const result = await orderModel.create({
      order_user: convertStringToObjectId(userId),
      order_checkout: checkoutContent,
      order_shipping: address,
      order_payment: order_payment,
      order_products: products,
      order_tracking: ''
    })
    for (let i = 0; i < products.length; i++) {
      const update = {
        $push: {
          voucher_users_used: userId
        },
        $inc: {
          voucher_user_count: 1
        }
      }
      await updateVoucherById(products[i].voucherId, update)
    }
    return result
  }
}

export default OrderService
