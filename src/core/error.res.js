import { statusCodes } from './httpStatusCode/statusCodes.js'
import { reasonPharses } from './httpStatusCode/reasonPhrases.js'
class ErrorRes extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
    // Error.captureStackTrace(this)
  }
}

class ConfigRequestError extends ErrorRes {
  constructor(message = reasonPharses.CONFLICT, status = statusCodes.CONFLICT) {
    super(message, status)
  }
}

class BadRequestError extends ErrorRes {
  constructor(
    message = reasonPharses.BAD_REQUEST,
    status = statusCodes.BAD_REQUEST,
  ) {
    super(message, status)
  }
}

class ForbiddenError extends ErrorRes {
  constructor({
    message = reasonPharses.FORBIDDEN,
    status = statusCodes.FORBIDDEN,
  }) {
    super(message, status)
  }
}

class AuthFailError extends ErrorRes {
  constructor(
    message = reasonPharses.BAD_REQUEST,
    status = statusCodes.BAD_REQUEST,
  ) {
    super(message, status)
  }
}

class VoucherInvalidError extends ErrorRes {
  constructor(
    message = reasonPharses.BAD_REQUEST,
    status = statusCodes.BAD_REQUEST,
  ) {
    super(message, status)
  }
}

class RedisError extends ErrorRes {
  constructor(
    message = 'redis has some error',
    status = statusCodes.INTERNAL_SERVER_ERROR,
  ) {
    super(message, status)
  }
}

class InternalServerError extends ErrorRes {
  constructor(
    message = 'something went wrong',
    status = statusCodes.INTERNAL_SERVER_ERROR,
  ) {
    super(message, status)
  }
}

class OrderError extends ErrorRes {
  constructor(message = 'order fail', status = statusCodes.BAD_REQUEST) {
    super(message, status)
  }
}

export {
  ConfigRequestError,
  BadRequestError,
  ForbiddenError,
  AuthFailError,
  VoucherInvalidError,
  RedisError,
  OrderError,
  InternalServerError,
}
