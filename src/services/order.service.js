import {
  BadRequestError,
  InternalServerError,
  OrderError,
} from '../core/error.res.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import orderModel from '../models/order.model.js'
import { findCartByUserId } from '../models/repositories/cart.repo.js'
import inventoryRepo from '../models/repositories/inventory.repo.js'
import productRepo from '../models/repositories/product.repo.js'
import { findUserWithId } from '../models/repositories/user.repo.js'
import {
  findVoucherByIdPublish,
  updateVoucherById,
} from '../models/repositories/voucher.repo.js'
import { convertStringToObjectId } from '../utils/index.js'
import CartServices from './cart.service.js'
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
    if (!foundCart) throw new BadRequestError('cart not found')
    //kiem tra userId trong cartId co giong nhau
    if (foundCart._id.toString() !== cartId)
      throw new BadRequestError('cart not found')

    //kiem tra san pham
    //kiem tra san pham co ton tai va gia cua san pham co dung
    const isCheckProducts = await productRepo.checkProductIds(products)
    if (!isCheckProducts) throw new OrderError('product not found')

    const results = {
      totalCost: 0,
      feeShip: 0,
      totalDiscount: 0,
      totalCheckout: 0,
    }
    //chua co kiem tra gia va so luong
    for (let i = 0; i < products.length; i++) {
      const voucherId = products[i].voucherId
      results.totalCost +=
        products[i].product_price * products[i].product_quantity

      results.totalCheckout += await VoucherService.applyVoucher({
        voucherId: products[i].voucherId,
        product_price: products[i].product_price,
        product_quantity: products[i].product_quantity,
        productId: products[i].productId,
        userId,
      })

      let voucherValue = 0
      if (voucherId) {
        const { voucher_value } = await findVoucherByIdPublish(voucherId)
        voucherValue = voucher_value
      }
      results.totalDiscount += voucherValue
    }

    return results
  }

  static async order({
    cartId,
    userId,
    products,
    address,
    phone,
    order_payment,
  }) {
    if (!cartId || !userId || !products || !address || !phone || !order_payment)
      throw new BadRequestError('something is missed')

    const checkoutContent = await OrderService.review({
      cartId,
      userId,
      products,
    })

    const aquireProducts = []
    const inventoryIds = []
    const productIndexs = []

    for (let i = 0; i < products.length; i++) {
      const lock = await aquireLock(
        products[i].productId,
        products[i].product_quantity,
        cartId,
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
            cartId,
          )
        }
      } catch (error) {
        throw new InternalServerError('Somthing wrong')
      }
      throw new BadRequestError('Sold out')
    }

    const productWithObjectIdArr = products.map((product) => {
      product.productId = convertStringToObjectId(product.productId)
      return product
    })
    const result = await orderModel.create({
      order_user: convertStringToObjectId(userId),
      order_checkout: checkoutContent,
      order_shipping: address,
      order_payment: order_payment,
      order_products: productWithObjectIdArr,
      order_tracking: '',
    })

    //update voucher and cart after order success
    for (let i = 0; i < products.length; i++) {
      //updater voucher
      if (products[i].voucherId) {
        const update = {
          $push: {
            voucher_users_used: userId,
          },
          $inc: {
            voucher_user_count: 1,
          },
        }
        await updateVoucherById(products[i].voucherId, update)
      }

      //remove product from cart
      await CartServices.removeProduct(userId, products[i].productId)
    }

    return result
  }

  static async getOrder({
    userId,
    filter = 'all',
    page = 1,
    limit = 5,
    sort = 'updateTime',
    select,
  }) {
    if (!userId) throw new BadRequestError('not found userId')
    const filterParam =
      filter !== 'all' && typeof filter === 'object'
        ? { order_user: convertStringToObjectId(userId), ...filter }
        : { order_user: convertStringToObjectId(userId) }
    const sortParam = sort !== 'updateTime' ? { updateAt: 1 } : { createAt: 1 }
    const skip = (page - 1) * 5
    const selectParams =
      select && typeof select === 'object'
        ? {
            _id: 1,
            order_products: 1,
            ...select,
          }
        : {
            _id: 1,
            order_products: 1,
          }
    return await orderModel
      .find(filterParam)
      .skip(skip)
      .limit(limit)
      .sort(sortParam)
      .select(selectParams)
      .lean()
  }

  static async getAmountOrders({ userId, filter }) {
    if (!userId) throw new BadRequestError('not found userId')
    const filterParam =
      filter !== 'all' && typeof filter === 'object'
        ? { order_user: convertStringToObjectId(userId), ...filter }
        : { order_user: convertStringToObjectId(userId) }
    console.log(filterParam)
    const resultTotal = await orderModel.aggregate([
      {
        $match: filterParam,
      },
      {
        $count: 'total',
      },
    ])

    return resultTotal.length > 0 ? resultTotal?.[0] : { total: 0 }
  }

  static async getOrderDetail({ userId, orderId }) {
    if (!userId) throw new BadRequestError('not found userId')
  }
}

export default OrderService
