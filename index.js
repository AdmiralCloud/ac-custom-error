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

class ACErrorFromCode extends Error {
  constructor(code, additionalInfo = {}) {
    super(code)

    // fetch the error message for errorCodes object (if available)
    const error = global?.errorCodes[code]
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ACErrorFromCode)
    }
    // info
    this.code = code || -1
    this.errorMessage = error?.message || 'undefinedError'
    this.message = this.errorMessage

    if (error?.solution) {
      this.solution = error.solution
    }

    if (Object.keys(additionalInfo).length) {
      this.additionalInfo = additionalInfo
    }
    if (error?.stack) {
      console.error(this.stack)
    }
  }
}


module.exports = { ACError, ACErrorFromCode }