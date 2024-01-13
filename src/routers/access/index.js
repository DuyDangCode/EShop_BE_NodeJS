import express from 'express';
import AccessController from '../../controllers/access.controller.js';
import { asyncHandler } from '../../helpers/index.helper.js';
import { authentication } from '../../auth/checkAuth.js';

const accessRouter = express.Router();

accessRouter.post('/signup', asyncHandler(AccessController.signup));
accessRouter.post('/signin', asyncHandler(AccessController.signin));

accessRouter.use(authentication);
accessRouter.post('/signout', asyncHandler(AccessController.signout));
accessRouter.post(
  '/handleRefreshtoken',
  asyncHandler(AccessController.handleRefreshToken)
);
export default accessRouter;
