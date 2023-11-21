import mongoose from 'mongoose';

const COLLECTION_NAME = 'users';
const DOCUMENT_NAME = 'user';

const userSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model(DOCUMENT_NAME, userSchema);
