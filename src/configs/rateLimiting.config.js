export default {
  limit: process.env.LIMIT_PER_REQUEST || 1000,
  windowMs: process.env.LIMIT_TIMMER || 60 * 60 * 1000,
  message:
    process.env.LIMIT_MESSAGE ||
    'Too many requests from this IP, please try again after an hour',
}
