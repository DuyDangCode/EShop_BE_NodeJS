const PORT = process.env.PORT_REDIS || 6379
const HOST = process.env.HOST_REDIS || 'localhost'
const USERNAME = ''
const PASSWORD = ''
const TIMEOUT = process.env.TIMEOUT_REDIS || 10000
const MESSAGE_TIMEOUT = {
  code: '-1',
  message: 'Redis not running'
}
const status = {
  CONNECT: 'connect',
  RECONNECT: 'reconnecting',
  ERROR: 'error',
  END: 'end'
}

export default {
  PORT,
  USERNAME,
  PASSWORD,
  HOST,
  TIMEOUT,
  status,
  MESSAGE_TIMEOUT
}
