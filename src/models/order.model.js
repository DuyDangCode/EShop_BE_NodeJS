'use strict';

import mongoose from 'mongoose';

const DOCUMENT_NAME = 'order';
const COLLECTION_NAME = 'orders';

const orderSchema = new mongoose.Schema(
  {
    order_user: {
      type: String,
      required: true,
    },
    order_checkout: {
      type: Object,
      required: true,
    },
    //address
    order_shipping: {
      type: String,
      required: true,
    },
    //payment status
    order_payment: {
      type: String,
      enum: ['online', 'upon receipt'],
      required: true,
    },
    order_products: {
      type: Array,
      required: true,
    },
    order_tracking: {
      type: String,
    },
    order_status: {
      type: String,
      enum: ['pending', 'confirm', 'shipping', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

export default new mongoose.model(DOCUMENT_NAME, orderSchema);
