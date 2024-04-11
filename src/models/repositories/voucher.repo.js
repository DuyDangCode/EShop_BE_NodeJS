import { convertStringToObjectId } from '../../utils/index.js'
import voucherModel from '../voucher.model.js'

const findVoucherByCode = async (voucher_code) => {
  return await voucherModel.findOne({ voucher_code }).lean()
}

const findVoucherByIdPublish = async (voucherId) => {
  return await voucherModel
    .findOne({
      _id: convertStringToObjectId(voucherId),
      voucher_is_activate: true
    })
    .lean()
}

const createVoucher = async ({
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
}) => {
  return await voucherModel.create({
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

const updateVoucherById = async (id, update, isNew = true) => {
  return await voucherModel
    .findByIdAndUpdate(convertStringToObjectId(id), update, { new: isNew })
    .lean()
}

export {
  findVoucherByCode,
  createVoucher,
  updateVoucherById,
  findVoucherByIdPublish
}
