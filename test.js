const { expect } = require('chai')

const { ACError, ACErrorFromCode } = require('./index')

const errorFunction = ({ message, code, additionalInfo, options }) => {
  throw new ACError(message, code, additionalInfo, options )
}

const errorFunctionFromCode = ({ code, additionalInfo }) => {
  throw new ACErrorFromCode(code, additionalInfo)
}


describe('Run tests with ACError', () => {

  it('Check error code', () => {
    let errorParams = { message: 'myError', code: 123 }
    let error
    try {
      errorFunction(errorParams)
    }
    catch (err) {
      error = err
    }
    expect(error).to.be.an('Error')
    expect(error.message).to.equal(errorParams.message)
    expect(error.code).to.equal(errorParams.code)
  })

  it('Check error code and additionalInfo', () => {
    let errorParams = { message: 'myError', code: 123, additionalInfo: { id: 333 } }
    let error
    try {
      errorFunction(errorParams)
    }
    catch (err) {
      error = err
    }
    expect(error).to.be.an('Error')
    expect(error.message).to.equal(errorParams.message)
    expect(error.code).to.equal(errorParams.code)
    expect(error.additionalInfo.id).to.equal(errorParams.additionalInfo.id)
  })

  it('Check that options are available', () => {
    let errorParams = { message: 'myError', code: 123, additionalInfo: {}, options: { stack: true } }
    let error
    try {
      errorFunction(errorParams)
    }
    catch (err) {
      error = err
    }
    expect(error).to.be.an('Error')
    expect(error.message).to.equal(errorParams.message)
    expect(error.code).to.equal(errorParams.code)
    expect(error.options).to.have.property('stack', errorParams.options.stack)
  })

})

describe('Run tests with ACError', () => {

  it('Define error codes', () => {
    global.errorCodes = {
      123: {
        message: 'thisIsAnError',
        solution: 'Provide an ID to avoid this error.'
      }
    }
  })


  it('Check error', () => {
    let error
    try {
      errorFunctionFromCode({ code: 123 })
    }
    catch (err) {
      error = err
    }
    
    expect(error).to.be.an('Error')
    expect(error.message).to.equal(global.errorCodes[123].message)
    expect(error.code).to.equal(123)
    expect(error.solution).to.equal(global.errorCodes[123].solution)
  })


})

