const statusCode = {
  forbidden: 403,
  config: 409,
}

const resonStatusCode = {
  forbidden: 'bad request error',
  config: 'config error',
}


class ErrorRes extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}


class ConfigRequestError extends ErrorRes {
  constructor(status = statusCode.config, message = resonStatusCode.config) {
    super(status, message);
  }
}


class BadRequestError extends ErrorRes {
  constructor(status = statusCode.forbidden, message = resonStatusCode.forbidden) {
    super(status, message);
  }
}


export { ConfigRequestError, BadRequestError };
