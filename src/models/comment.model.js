import { model, Types, Schema } from "mongoose";

const COLLECTION_NAME = "comments";
const DOCUMENT_NAME = "comment";

const commentSchema = new Schema(
  {
    comment_productId: {
      type: Types.ObjectId,
      ref: "products",
      required: true,
    },
    comment_userId: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
    },
    comment_content: {
      type: String,
      required: true,
    },
    comment_parrentId: {
      type: Types.ObjectId,
      ref: "comments",
    },
    comment_left: {
      type: Number,
      required: true,
    },
    comment_right: {
      type: Number,
      required: true,
    },
    comment_isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
);
commentSchema.index({
  comment_productId: 1,
  comment_right: 1,
  comment_left: 1,
});

export default model(DOCUMENT_NAME, commentSchema);
