import { statusCodes } from './httpStatusCode/statusCodes.js'
import { reasonPharses } from './httpStatusCode/reasonPhrases.js'
import { message } from './httpStatusCode/message.js'
class ErrorRes extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
    // Error.captureStackTrace(this)
  }
}

class ConfigRequestError extends ErrorRes {
  constructor(status = statusCodes.CONFLICT, message = reasonPharses.CONFLICT) {
    super(status, message)
  }
}

class BadRequestError extends ErrorRes {
  constructor(
    status = statusCodes.BAD_REQUEST,
    message = statusCodes.BAD_REQUEST
  ) {
    super(status, message)
  }
}

class ForbiddenError extends ErrorRes {
  constructor(
    status = statusCodes.FORBIDDEN,
    message = reasonPharses.FORBIDDEN
  ) {
    super(status, message)
  }
}

class AuthFailError extends ErrorRes {
  constructor(
    status = statusCodes.BAD_REQUEST,
    message = reasonPharses.BAD_REQUEST
  ) {
    super(status, message)
  }
}

class VoucherInvalidError extends ErrorRes {
  constructor({
    status = statusCodes.BAD_REQUEST,
    message = message.VoucherInvalid
  }) {
    super(status, message)
  }
}

export {
  ConfigRequestError,
  BadRequestError,
  ForbiddenError,
  AuthFailError,
  VoucherInvalidError
}
