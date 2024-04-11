import { statusCodes } from './httpStatusCode/statusCodes.js'
import { reasonPharses } from './httpStatusCode/reasonPhrases.js'

class SuccessRes {
  constructor({
    message,
    status = statusCodes.OK,
    reason = reasonPharses.OK,
    metadata = {}
  }) {
    this.message = message || reason
    this.status = status
    this.metadata = metadata
  }

  send(res, hearders = {}) {
    return res.status(this.status).json(this)
  }
}

class OK extends SuccessRes {
  constructor({ message, metadata }) {
    super({ message, metadata })
  }
}

class CREATED extends SuccessRes {
  constructor({
    message,
    status = statusCodes.CREATED,
    reason = reasonPharses.CREATED,
    metadata = {},
    options = {}
  }) {
    super({ message, status, reason, metadata })
    this.options = options
  }
}

export { OK, CREATED }
