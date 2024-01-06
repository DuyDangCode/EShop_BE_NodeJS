import { HEADERS } from '../constrant/req.constrant.js';
import { BadRequestError } from '../core/error.res.js';
import { asyncHandler } from '../helpers/index.helper.js';
import { findById } from '../services/apiKey.service.js';
import KeyService from '../services/key.service.js';
import JWT from 'jsonwebtoken';

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

const authentication = asyncHandler(async (req, res, next) => {
  // check userId missing
  const userId = req.headers[HEADERS.CLIENT]?.toString();
  if (!userId) throw new BadRequestError();
  // check token missing
  const token = req.headers[HEADERS.AUTHORIZATION]?.toString();
  if (!token) throw new BadRequestError();
  // get keys in dbs
  const keysFormDb = await KeyService.findByUserId(userId);
  // console.log(`key: ${keysFormDb}`, keysFormDb);
  if (!keysFormDb) throw new BadRequestError();
  try {
    // verify access tokens
    const payload = JWT.verify(token, keysFormDb.publicKey);
    // compare userId in access token with userId in token form db
    if (userId !== payload.userId) throw new BadRequestError();
    // set token
    // req.keys = keysFormDb;
    req.keys = token;
    return next();
  } catch (error) {
    throw new BadRequestError(400, 'aa');
  }
});

export { checkApiKey, checkPermission, authentication };
