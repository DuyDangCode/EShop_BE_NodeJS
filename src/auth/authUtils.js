import JWT from 'jsonwebtoken'
import { BadRequestError } from '../core/error.res.js'

const createTokenPair = (payload, privateKey) => {
  try {
    const accessToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1 days'
    })

    const refreshToken = JWT.sign(payload, privateKey, {
      algorithm: 'RS256',
      expiresIn: '30 days'
    })
    return accessToken && refreshToken ? { accessToken, refreshToken } : null
  } catch (error) {
    throw new BadRequestError()
  }
}

const verifyJWT = (payload, key) => {
  return JWT.verify(payload, key)
}

export { createTokenPair, verifyJWT }
