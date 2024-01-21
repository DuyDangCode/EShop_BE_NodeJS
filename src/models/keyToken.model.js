import mongoose from 'mongoose';

const COLLECTION_NAME = 'tokens';
const DOCUMENT_NAME = 'token';

const keyTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'user',
    },
    publicKey: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
    refeshToken: {
      type: String,
      required: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default mongoose.model(DOCUMENT_NAME, keyTokenSchema);
