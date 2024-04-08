const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

const terminate = (
  server,
  options = {
    coredump: false,
    timeout: 500
  }
) => {
  const exit = (code) => {
    console.log(code)
    options.coredump ? process.abort() : process.exit(code)
  }

  return (code, reason) => (err, promise) => {
    console.log(reason)
    if (err && err instanceof Error) {
      console.log(err.message, err.stack)
    }
    // server.close(exit)
    setTimeout(exit, options.timeout).unref()
  }
}

export { asyncHandler, terminate }
