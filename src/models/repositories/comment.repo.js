// {
//     comment_productId: {
//       type: Types.ObjectId,
//     },
//     comment_userId: {
//       type: Types.ObjectId,
//     },
//     comment_content: {
//       type: String,
//     },
//     comment_parrentId: {
//       type: Types.ObjectId,
//     },
//     comment_left: {
//       type: Number,
//     },
//     comment_right: {
//       type: Number,
//     },
//     comment_isDeleted: {
//       type: Boolean,
//     },

import { convertStringToObjectId } from '../../utils/index.js'
import commentModel from '../comment.model.js'

//   }
const createComment = async ({
  comment_parrentId = null,
  comment_productId,
  comment_userId,
  comment_content,
  comment_left = 1,
  comment_right = 2,
}) => {
  return await commentModel.create({
    comment_content,
    comment_parrentId: convertStringToObjectId(comment_parrentId),
    comment_productId: convertStringToObjectId(comment_productId),
    comment_userId: convertStringToObjectId(comment_userId),
    comment_left,
    comment_right,
  })
}

export { createComment }
