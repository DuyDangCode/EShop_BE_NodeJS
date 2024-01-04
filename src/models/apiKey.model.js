import mongoose from 'mongoose';

const DOCUMENT_NAME = 'apikey';
const COLLECTION_NAME = 'apikeys';

const apikeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: [String],
      require: true,
      enum: ['001', '002', '003'],
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

export default mongoose.model(DOCUMENT_NAME, apikeySchema);
