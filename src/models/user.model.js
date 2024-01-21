import mongoose, { Schema } from 'mongoose';

const COLLECTION_NAME = 'users';
const DOCUMENT_NAME = 'user';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      maxLength: 255,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      maxLength: 50,
      unique: true,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      enum: ['activate', 'inactivate'],
      default: 'activate',
    },
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export default mongoose.model(DOCUMENT_NAME, userSchema);
