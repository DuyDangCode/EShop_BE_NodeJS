import mongoose from 'mongoose'

const DOCUMENT_NAME = 'inventory'
const COLLECTION_NAME = 'inventories'

const inventorySchema = new mongoose.Schema(
  {
    inven_productId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'product',
    },
    inven_stock: {
      type: Number,
      required: true,
    },
    inven_location: {
      type: String,
      default: 'unKnow',
    },
    inven_reservation: {
      type: Array,
      default: [],
    },
    inven_return_goods: {
      type: Array,
      default: [],
    },
    inven_import: {
      type: Array,
      default: [],
    },
    inven_export: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

export default mongoose.model(DOCUMENT_NAME, inventorySchema)
