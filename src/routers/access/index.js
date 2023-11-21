import express from 'express';
import AccessController from '../../controllers/access.controller.js';
import { asyncHandler } from '../../auth/checkAuth.js';

const accessRouter = express.Router();

accessRouter.post('/users/signup', asyncHandler(AccessController.signup));
accessRouter.post('/users/signin', asyncHandler(AccessController.signin));

export default accessRouter;
