import { Router } from 'express'
import { asyncHandler } from '../../helpers/index.helper.js'
import CommentController from '../../controllers/comment.controller.js'
const commentRouter = Router()

commentRouter.post('', asyncHandler(CommentController.createComment))

export default commentRouter
