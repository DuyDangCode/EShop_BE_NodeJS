import { BadRequestError } from '../core/error.res.js'
import commentModel from '../models/comment.model.js'
import MESSAGE from '../core/message.js'
import { createComment } from '../models/repositories/comment.repo.js'
import { convertStringToObjectId } from '../utils/index.js'
class CommentService {
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
  //   }
  static async insertComment({
    comment_productId,
    comment_userId,
    comment_content,
    comment_parrentId = null,
  }) {
    if (!comment_content || !comment_userId || !comment_productId)
      throw new BadRequestError(MESSAGE.missParams)
    if (comment_parrentId) {
      //reply comment
    } else {
      const comment = await commentModel.aggregate([
        {
          $match: {
            comment_productId: convertStringToObjectId(comment_productId),
          },
        },
        {
          $group: {
            _id: '$comment_productId',
            maxRight: { $max: '$comment_right' },
          },
        },
      ])
      if (comment.length === 0) {
        return await createComment({
          comment_productId,
          comment_userId,
          comment_content,
        })
      }

      const left = comment[0].maxRight + 1,
        right = comment[0].maxRight + 2
      return await createComment({
        comment_productId,
        comment_userId,
        comment_content,
        comment_left: left,
        comment_right: right,
      })
    }
  }
}

export default CommentService
