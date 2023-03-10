class ACError extends Error {
  constructor(message, code, additionalInfo = {}) {
    super(message)
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ACError)
    }
    // info
    this.code = code || -1
    this.errorMessage = message
    // show other properties of options object
    if (Object.keys(additionalInfo).length) {
      this.additionalInfo = additionalInfo
    }
  }
}


module.exports = ACError