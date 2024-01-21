import mongoose from 'mongoose';

const DOCUMENT_NAME = 'voucher';
const COLLECTION_NAME = 'vouchers';

const voucherSchema = new mongoose.Schema(
  {
    voucher_name: {
      type: String,
      required: true,
    },
    voucher_description: {
      type: String,
      default: '',
    },
    voucher_type: {
      type: String,
      enum: ['fixed_amount', 'percentage'],
      default: 'fixed_amount', //percentage
    },
    voucher_value: {
      type: Number,
      required: true,
    },
    voucher_code: {
      type: String,
      unique: true,
      required: true,
    },
    voucher_start_day: {
      type: Date,
      required: true,
    },
    voucher_end_day: {
      type: Date,
      required: true,
    },
    voucher_max_uses: {
      type: Number,
      required: true,
    },
    voucher_user_count: {
      type: Number,
      default: 0,
    },
    voucher_users_used: {
      type: Array,
      default: [],
    },
    voucher_max_use_per_user: {
      type: Number,
      required: true,
    },
    voucher_min_order_value: {
      type: Number,
      required: true,
    },
    voucher_is_activate: {
      type: Boolean,
      default: false,
    },
    voucher_applies_to: {
      type: String,
      enum: ['all', 'specific'],
      required: true,
    },
    voucher_product_ids: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model(DOCUMENT_NAME, voucherSchema);
