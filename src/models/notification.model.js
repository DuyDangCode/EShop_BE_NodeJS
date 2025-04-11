import { referrerPolicy } from 'helmet'
import { model, Schema } from 'mongoose'

const COLLECTION_NAME = 'notifications'
const DOCUMENT_NAME = 'notification'

//ORDER-001: order successfully
//ORDER-002: order failed
//PROMOTION-001: new promotion
//PRODUCT-001: new product

const notificationSchema = new Schema(
  {
    noti_type: {
      type: String,
      enum: ['ORDER-001', 'ORDER-002', 'PROMOTION-001', 'PRODUCT-001'],
      required: true,
    },
    noti_receiver: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    noti_content: {
      type: String,
      required: true,
    },
    noti_option: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

export default model(DOCUMENT_NAME, notificationSchema)
