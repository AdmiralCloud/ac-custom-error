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
    expect(error).to.be.instanceOf(ACError)
    expect(error.message).to.equal(errorParams.message)
    expect(error.errorMessage).to.equal(errorParams.message)
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

  it('Check default code -1 when no code is provided', () => {
    let errorParams = { message: 'myError' }
    let error
    try {
      errorFunction(errorParams)
    }
    catch (err) {
      error = err
    }
    expect(error).to.be.an('Error')
    expect(error.code).to.equal(-1)
  })

  it('Check that additionalInfo is not set when empty', () => {
    let errorParams = { message: 'myError', code: 123 }
    let error
    try {
      errorFunction(errorParams)
    }
    catch (err) {
      error = err
    }
    expect(error.additionalInfo).to.be.undefined
  })

})

describe('Run tests with ACErrorFromCode', () => {

  before(() => {
    global.errorCodes = {
      123: {
        message: 'thisIsAnError',
        solution: 'Provide an ID to avoid this error.'
      }
    }
  })

  after(() => {
    delete global.errorCodes
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
    expect(error).to.be.instanceOf(ACErrorFromCode)
    expect(error.message).to.equal(global.errorCodes[123].message)
    expect(error.errorMessage).to.equal(global.errorCodes[123].message)
    expect(error.code).to.equal(123)
    expect(error.solution).to.equal(global.errorCodes[123].solution)
  })

  it('Check error with additionalInfo', () => {
    let error
    try {
      errorFunctionFromCode({ code: 123, additionalInfo: { field: 'userId' } })
    }
    catch (err) {
      error = err
    }

    expect(error).to.be.an('Error')
    expect(error.additionalInfo).to.deep.equal({ field: 'userId' })
  })

  it('Check default code -1 when no code is provided', () => {
    let error
    try {
      errorFunctionFromCode({})
    }
    catch (err) {
      error = err
    }

    expect(error).to.be.an('Error')
    expect(error.code).to.equal(-1)
  })

  it('Check fallback errorMessage for unknown code', () => {
    let error
    try {
      errorFunctionFromCode({ code: 999 })
    }
    catch (err) {
      error = err
    }

    expect(error).to.be.an('Error')
    expect(error.errorMessage).to.equal('undefinedError')
    expect(error.solution).to.be.undefined
  })

  it('Check that ACErrorFromCode works when global.errorCodes is not defined', () => {
    delete global.errorCodes
    let error
    try {
      errorFunctionFromCode({ code: 123 })
    }
    catch (err) {
      error = err
    }

    expect(error).to.be.an('Error')
    expect(error.errorMessage).to.equal('undefinedError')
  })

})

