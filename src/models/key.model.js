import mongoose from 'mongoose';

const COLLECTION_NAME = 'users';
const DOCUMENT_NAME = 'user';

const keyTokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      require: true,
      ref: 'user',
    },
    publicKey: {
      type: String,
      require: true,
    },
    refreshToken: {
      type: Array,
      default: [],
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

export default mongoose.model(DOCUMENT_NAME, keyTokenSchema);
