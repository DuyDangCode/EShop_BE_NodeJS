import express from 'express';
import AccessController from '../../controllers/access.controller.js';
import { asyncHandler } from '../../helpers/index.helper.js';
import { authentication } from '../../auth/checkAuth.js';

const accessRouter = express.Router();

accessRouter.post('/users/signup', asyncHandler(AccessController.signup));
accessRouter.post('/users/signin', asyncHandler(AccessController.signin));

accessRouter.use(authentication);
accessRouter.post('/users/signout', asyncHandler(AccessController.signout));
export default accessRouter;
