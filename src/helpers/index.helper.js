const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

const terminate = (
  server,
  options = {
    coredump: false,
    timeout: 500,
  },
) => {
  return (code, reason) => (err, promise) => {
    const exit = () => {
      console.log('Process exist code: ', code)
      options.coredump ? process.abort() : process.exit(code)
    }
    console.log(reason)
    if (err && err instanceof Error) {
      console.log(err.message, err.stack)
    }
    // console.log('code day ne', code)
    server.close(exit)
    setTimeout(exit, options.timeout).unref()
  }
}

export { asyncHandler, terminate }
