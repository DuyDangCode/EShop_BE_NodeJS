import MESSAGE from '../core/message.js'
import { OK } from '../core/success.res.js'
import CommentService from '../services/comment.service.js'

class CommentController {
  static async createComment(req, res, next) {
    return new OK({
      message: MESSAGE.createCommentSuccess,
      metadata: await CommentService.insertComment(req.body),
    }).send(res)
  }
  static async getTotalCommentByProductId(req, res, next) {
    return new OK({
      message: 'Get total comment successful',
      metadata: await CommentService.getTotalCommentByProductId(
        req?.query?.comment_productId,
      ),
    }).send(res)
  }
}

export default CommentController
