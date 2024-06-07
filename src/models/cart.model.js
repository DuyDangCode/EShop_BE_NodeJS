import mongoose from 'mongoose'

const COLLECTION_NAME = 'carts'
const DOCUMENT_NAME = 'cart'

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    cart_products: {
      type: Array,
      default: [],
      /*
        {
          productId
          product_name
          product_quantity
          product_price
          product_image

        }
      */
    },
    cart_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    COLLECTION_NAME: COLLECTION_NAME,
  },
)

export default mongoose.model(DOCUMENT_NAME, cartSchema)
