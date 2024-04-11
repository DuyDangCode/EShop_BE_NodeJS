import { HEADERS } from '../constrant/req.constrant.js'
import { BadRequestError } from '../core/error.res.js'
import { asyncHandler } from '../helpers/index.helper.js'
import { findById } from '../services/apiKey.service.js'
import KeyService from '../services/key.service.js'
import JWT from 'jsonwebtoken'
import { verifyJWT } from './authUtils.js'

const checkApiKey = async (req, res, next) => {
  const key = req.headers[HEADERS.API_KEY]?.toString()
  if (!key) next(new BadRequestError('Not found key'))
  const objKey = await findById(key)
  if (!objKey) next(new BadRequestError())
  req.objKey = objKey
  next()
}

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) next(new BadRequestError('Permission denied'))

    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission) next(new BadRequestError('Permission denied'))

    next()
  }
}

const handleToken = (userId, req, token, keyStore, next) => {
  try {
    const decodeToken = verifyJWT(token, keyStore.publicKey)
    if (userId !== decodeToken.userId)
      throw new BadRequestError('Invalid token')

    //access token
    req.token = token

    //key document
    req.keyStore = keyStore

    return next()
  } catch (error) {
    throw new BadRequestError('Invalid token')
  }
}

const authentication = asyncHandler(async (req, res, next) => {
  // check userId missing
  const userId = req.headers[HEADERS.CLIENT]?.toString()
  if (!userId) throw new BadRequestError('Not find client id')

  // check token missing
  const token = req.headers[HEADERS.REFRESH_TOKEN]
    ? req.headers[HEADERS.REFRESH_TOKEN].toString()
    : req.headers[HEADERS.AUTHORIZATION]?.toString()
  if (!token) throw new BadRequestError('Not find token')

  // get keys in dbs
  const keysFormDb = await KeyService.findByUserId(userId)
  if (!keysFormDb) throw new BadRequestError('User not registed')

  handleToken(userId, req, token, keysFormDb, next)
})

export { checkApiKey, checkPermission, authentication }
