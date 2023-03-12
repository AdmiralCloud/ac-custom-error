class ACError extends Error {
  constructor(message, code, additionalInfo = {}, options = {}) {
    super(message)
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ACError)
    }
    // info
    this.code = code || -1
    this.errorMessage = message
    // show other properties of the error (usually additional payload parameters that clarify the error)
    if (Object.keys(additionalInfo).length) {
      this.additionalInfo = additionalInfo
    }
    // options 
    if (Object.keys(options).length) {
      this.options = options
    }
    if (options?.stack) {
      console.error(this.stack)
    }
  }
}


module.exports = ACError