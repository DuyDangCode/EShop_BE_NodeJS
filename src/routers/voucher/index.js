import express from 'express';
import { asyncHandler } from '../../helpers/index.helper.js';
import VoucherController from '../../controllers/vouhcer.controller.js';
import { authentication } from '../../auth/checkAuth.js';

const voucherRouter = express.Router();

voucherRouter.use(authentication);
voucherRouter.post('/', asyncHandler(VoucherController.createVoucher));
voucherRouter.patch(
  '/:voucherId',
  asyncHandler(VoucherController.updateVoucher)
);

export default voucherRouter;
