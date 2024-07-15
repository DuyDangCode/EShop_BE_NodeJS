import { BadRequestError, VoucherInvalidError } from '../core/error.res.js'
import { message } from '../core/httpStatusCode/message.js'
import { statusCodes } from '../core/httpStatusCode/statusCodes.js'
import productRepo from '../models/repositories/product.repo.js'
import {
  createVoucher,
  findVoucherByCode,
  findVoucherByIdPublish,
  updateVoucherById,
} from '../models/repositories/voucher.repo.js'

class VoucherService {
  static validateDate = ({ voucher_start_day, voucher_end_day }) => {
    const startDay = new Date(voucher_start_day)
    const endDay = new Date(voucher_end_day)
    const currentDay = new Date()

    if (endDay < currentDay)
      throw new VoucherInvalidError(
        'The end date cannot be less than the current date',
      )

    if (startDay > endDay)
      throw new VoucherInvalidError(
        'The start date cannot be greater than the end date',
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
      0,
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
    voucher_product_ids,
  }) {
    VoucherService.validateDate({ voucher_start_day, voucher_end_day })

    const foundVoucher = await findVoucherByCode(voucher_code)
    if (foundVoucher) throw new VoucherInvalidError('Voucher is exists')

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
      voucher_product_ids,
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
    voucher_product_ids,
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
      voucher_product_ids,
    })
  }

  static async applyVoucher({
    voucherId,
    productId,
    product_quantity,
    product_price,
    userId,
  }) {
    if (!product_price || !product_quantity || !productId || !userId)
      throw new BadRequestError('Something missing')
    //check order value
    const orderValue = VoucherService.calTotalOrderValue([
      {
        product_price,
        product_quantity,
      },
    ])
    //validata voucher
    const foundVoucher = await findVoucherByIdPublish(voucherId)

    if (!voucherId) {
      console.log(voucherId)
      return orderValue
    }
    //check voucher exists
    if (!foundVoucher) throw new VoucherInvalidError('Voucher not exists')
    console.log('Oke')

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
      voucher_max_uses,
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
      throw new VoucherInvalidError('The number of uses is 0')

    //check product
    if (voucher_applies_to === 'specific') {
      const foundProduct = await productRepo.findProductByIdPublish(productId)
      if (!foundProduct) throw new BadRequestError('Cant find product')

      if (!voucher_product_ids.includes(foundProduct._id))
        throw new BadRequestError('Invalid product')

      if (foundProduct.product_quantity < product.product_quantity)
        throw new BadRequestError('Not enough goods')
    }

    if (orderValue < voucher_min_order_value)
      throw new VoucherInvalidError(
        'The order does not meet the requirements to use the voucher',
      )

    if (voucher_type === 'fixed_amount') {
      return orderValue - voucher_value
    }
    return orderValue - orderValue * voucher_value
  }
}

export default VoucherService
