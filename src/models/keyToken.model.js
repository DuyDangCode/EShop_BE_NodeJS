import mongoose from 'mongoose';

const COLLECTION_NAME = 'tokens';
const DOCUMENT_NAME = 'token';

const keyTokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: 'user',
    },
    publicKey: {
      type: String,
      require: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [],
    },
    refeshToken: {
      type: String,
      require: true,
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default mongoose.model(DOCUMENT_NAME, keyTokenSchema);
