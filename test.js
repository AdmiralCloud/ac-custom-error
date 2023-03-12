const { expect } = require('chai')

const ACError = require('./index')

const errorFunction = ({ message, code, additionalInfo, options }) => {
  throw new ACError(message, code, additionalInfo, options )
}


describe('Run tests', () => {

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

