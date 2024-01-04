import { HEADERS } from '../constrant/req.constrant.js';
import { BadRequestError } from '../core/error.res.js';
import { findById } from '../services/apiKey.service.js';

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

const checkApiKey = async (req, res, next) => {
  const key = req.headers[HEADERS.API_KEY]?.toString();
  if (!key) next(new BadRequestError());
  const objKey = await findById(key);
  if (!objKey) next(new BadRequestError());
  req.objKey = objKey;
  next();
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions)
      next(new BadRequestError(403, 'Permission denied'));

    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission) next(new BadRequestError(403, 'Permission denied'));

    next();
  };
};

export { asyncHandler, checkApiKey, checkPermission };
