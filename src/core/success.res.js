const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode = {
  OK: 'success',
  CREATED: 'created',
};

class SuccessRes {
  constructor({
    message,
    statuscode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    this.message = message || reasonStatusCode;
    this.status = statuscode;
    this.metadata = metadata;
  }

  send(res, hearders = {}) {
    return res.status(this.statuscode).json(this);
  }
}

class OK extends SuccessRes {
  constructor({ message, metadata = {} }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessRes {
  constructor({
    message,
    statusCode = statusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata = {},
    options = {},
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}

export { OK, CREATED };
