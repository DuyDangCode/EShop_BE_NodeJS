import { BadRequestError, VoucherInvalidError } from '../core/error.res.js'
import { message } from '../core/httpStatusCode/message.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import productRepo from '../models/repositories/product.repo.js'
import {
  createVoucher,
  findVoucherByCode,
  updateVoucherById
} from '../models/repositories/voucher.repo.js'

class VoucherService {
  static validateDate = ({ voucher_start_day, voucher_end_day }) => {
    const startDay = new Date(voucher_start_day)
    const endDay = new Date(voucher_end_day)
    const currentDay = new Date()

    if (endDay < currentDay)
      throw new VoucherInvalidError(
        statusCodes.BAD_REQUEST,
        'The end date cannot be less than the current date'
      )

    if (startDay > endDay)
      throw new VoucherInvalidError(
        statusCodes.BAD_REQUEST,
        'The start date cannot be greater than the end date'
      )
  }

  static countUserUsed({ voucher_users_used = [], userId }) {
    let count = 0
    voucher_users_used.find((user) => {
      if (user === userId) count++
      return false
    })
    return count
  }

  static calTotalOrderValue(products = []) {
    return products.reduce(
      (total, product) =>
        total + product.product_price * product.product_quantity,
      0
    )
  }

  // create voucher by admin
  static async createVoucher({
    voucher_name,
    voucher_description = '',
    voucher_code,
    voucher_type,
    voucher_value,
    voucher_start_day,
    voucher_end_day,
    voucher_max_uses,
    voucher_max_use_per_user,
    voucher_min_order_value,
    voucher_is_activate,
    voucher_applies_to,
    voucher_product_ids
  }) {
    VoucherService.validateDate({ voucher_start_day, voucher_end_day })

    const foundVoucher = await findVoucherByCode(voucher_code)
    if (foundVoucher)
      throw new VoucherInvalidError(
        statusCodes.BadRequestError,
        'Voucher is exists'
      )

    return await createVoucher({
      voucher_name,
      voucher_description,
      voucher_code,
      voucher_type,
      voucher_value,
      voucher_start_day,
      voucher_end_day,
      voucher_max_uses,
      voucher_max_use_per_user,
      voucher_min_order_value,
      voucher_is_activate,
      voucher_applies_to,
      voucher_product_ids
    })
  }

  // update voucher by admin
  static async updateVoucher({
    _id,
    voucher_name,
    voucher_description = '',
    voucher_type,
    voucher_value,
    voucher_start_day,
    voucher_end_day,
    voucher_max_uses,
    voucher_max_use_per_user,
    voucher_min_order_value,
    voucher_is_activate,
    voucher_applies_to,
    voucher_product_ids
  }) {
    VoucherService.validateDate({ voucher_start_day, voucher_end_day })
    return await updateVoucherById(_id, {
      voucher_name,
      voucher_description,
      voucher_type,
      voucher_value,
      voucher_start_day,
      voucher_end_day,
      voucher_max_uses,
      voucher_max_use_per_user,
      voucher_min_order_value,
      voucher_is_activate,
      voucher_applies_to,
      voucher_product_ids
    })
  }

  /**
   * @argument voucher_code
   * @argument products = {
   *  product_name,
   *  product_quantity,
   *  product_price,
   * }
   * @argument userId
   * @returns totalCost
   */
  static async applyVoucher({ voucher_code, products = [], userId }) {
    if (products.length === 0)
      throw new BadRequestError(statusCodes.BAD_REQUEST, 'Products is empty')

    //validata voucher
    const foundVoucher = await findVoucherByCode(voucher_code)

    //check voucher exists
    if (!foundVoucher)
      throw new VoucherInvalidError(
        statusCodes.BAD_REQUEST,
        'Voucher not exists'
      )

    const {
      _id,
      voucher_is_activate,
      voucher_end_day,
      voucher_user_count,
      voucher_users_used,
      voucher_max_use_per_user,
      voucher_min_order_value,
      voucher_applies_to,
      voucher_product_ids,
      voucher_type,
      voucher_value,
      voucher_max_uses
    } = foundVoucher

    //check voucher date
    VoucherService.validateDate({ voucher_end_day })

    //check voucher status
    if (!voucher_is_activate) throw new VoucherInvalidError()
    //check voucher amount
    if (voucher_max_uses === voucher_user_count) throw new VoucherInvalidError()
    if (
      VoucherService.countUserUsed({ voucher_users_used, userId }) ===
      voucher_max_use_per_user
    )
      throw new VoucherInvalidError(
        statusCodes.BAD_REQUEST,
        'The number of uses is 0'
      )

    //check product
    if (voucher_applies_to === 'specific') {
      products.map(async (product) => {
        const foundProduct = await productRepo.findProductByName(
          product.product_name
        )
        if (!foundProduct)
          throw new BadRequestError(
            statusCodes.BAD_REQUEST,
            'Cant find product'
          )

        if (voucher_product_ids.includes(foundProduct._id))
          throw new BadRequestError(statusCodes.BAD_REQUEST, 'Invalid product')

        if (foundProduct.product_quantity < product.product_quantity)
          throw new BadRequestError(statusCodes.BAD_REQUEST, 'Not enough goods')
      })
    }

    //check order value
    const orderValue = VoucherService.calTotalOrderValue(products)
    if (orderValue < voucher_min_order_value)
      throw new VoucherInvalidError(
        statusCodes.BAD_REQUEST,
        'The order does not meet the requirements to use the voucher'
      )

    const update = {
      $push: {
        voucher_users_used: userId
      },
      $inc: {
        voucher_user_count: 1
      }
    }
    const result = await updateVoucherById(_id, update)
    if (!result)
      throw new BadRequestError(statusCodes.BAD_REQUEST, 'something went wrong')

    if (voucher_type === 'fixed_amount') {
      return orderValue - voucher_value
    }
    return orderValue - orderValue * voucher_value
  }
}

export default VoucherService
