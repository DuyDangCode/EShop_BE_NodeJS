import { Router } from 'express'
import { asyncHandler } from '../../helpers/index.helper.js'
import CommentController from '../../controllers/comment.controller.js'
const commentRouter = Router()

//publish route
commentRouter.get(
  '/total',
  asyncHandler(CommentController.getTotalCommentByProductId),
)

commentRouter.post('', asyncHandler(CommentController.createComment))

export default commentRouter
