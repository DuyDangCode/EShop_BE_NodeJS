import { CREATED, OK } from '../core/success.res.js';
import VoucherService from '../services/voucher.service.js';

class VoucherController {
  static async createVoucher(req, res) {
    return new CREATED({
      message: 'Create voucher successful',
      metadata: await VoucherService.createVoucher(req.body),
    }).send(res);
  }

  static async updateVoucher(req, res) {
    return new OK({
      message: 'Update voucher successful',
      metadata: await VoucherService.updateVoucher({
        _id: req.params.voucherId,
        ...req.body,
      }),
    }).send(res);
  }
}

export default VoucherController;
