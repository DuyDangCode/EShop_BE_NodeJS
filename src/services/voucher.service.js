import { BadRequestError } from '../core/error.res.js';
import { statusCodes } from '../core/httpStatusCode/statusCodes.js';
import {
  createVoucher,
  findVoucherByCode,
  updateVoucherById,
} from '../models/repositories/voucher.repo.js';

const validateDate = ({ voucher_start_day, voucher_end_day }) => {
  const startDay = new Date(voucher_start_day);
  const endDay = new Date(voucher_end_day);
  const currentDay = new Date();

  if (startDay > endDay)
    throw new BadRequestError(
      statusCodes.BAD_REQUEST,
      'The start date cannot be greater than the end date'
    );

  if (startDay < currentDay)
    throw new BadRequestError(
      statusCodes.BAD_REQUEST,
      'The start date cannot be less than the end date'
    );

  if (endDay < currentDay)
    throw new BadRequestError(
      statusCodes.BAD_REQUEST,
      'The end date cannot be less than the end date'
    );
};

class VoucherService {
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
    validateDate({ voucher_start_day, voucher_end_day });

    const foundVoucher = await findVoucherByCode(code);
    if (foundVoucher)
      throw new BadRequestError(statusCodes.BAD_REQUEST, 'Voucher is exists');

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
    });
  }

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
    validateDate({ voucher_start_day, voucher_end_day });
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
    });
  }
}

export default VoucherService;
