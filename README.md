# AC-Custom-Error
Extend the NodeJS error with an error code and additional information.

[![Node.js CI](https://github.com/AdmiralCloud/ac-custom-error/actions/workflows/node.js.yml/badge.svg)](https://github.com/AdmiralCloud/ac-custom-error/actions/workflows/node.js.yml)

# ACErrorFromCode
This is the preferred way to use this class. You define a central library of error codes and export them to global. You can then throw the error based on that code.

## Usage
```
const { ACErrorFromCode } = require('ac-custom-error)

// define error library
const errorCodes = {
  12345: {
    message: 'this is the error,
    solution: 'Provide optional solution to solve the error',
    stack: true // optional, if you want to log the stack
  },
  ...
}
global.errorCodes = errorCodes


// call the error
throw new ACErrorFromCode(12345)

// result in console
ACErrorFromCode: this is the error
    at STACK
  code: 12345,
  errorMessage: 'this is the error',
  solution: 'Provide optional solution to solve the error'
}
```


# ACError
If you do not want ot use a global library of error codes, you can use ACError to still show code and additionalInfo.
## Usage
Use it just like the built-in error:
+ first parameter is the actual error message as string
+ second parameter is the error code 
+ third parameter is an optional object of additional information (e.g. variables clarifying the error)
+ fouth parameter is an optional object of options that can help further processing of the error 

### Example
```
const { ACError } = require('ac-custom-error')

throw new ACError('myError', 123, { id: 333 }, { stack: true })

// OUTPUT 
ACError: myError
    at STACK
  code: 123,
  errorMessage: 'myError',
  additionalInfo: { id: 333 },
  options: { stack: true }
}

```

### How to use options
You might have an app were you would like to distinguish between soft errors (e.g. a requested ID is not available) and hard errors (that are bugs in the code). The first one should be logged as information in the code (maybe not even on ERROR level). The second one, the hard error, should probably contain as much information as possible for further debugging, so you want to log the stack as well.

```
// EXAMPLE soft error
throw new Error('userIdInvalid', 10223, { id: 12345 })
// will e.g. log like this
WARN | userIdInvalid | 10223 | { id: 12345 }

// EXAMPLE hard error
throw new Error('SQLinvalid', 13001, { query: 'SELECT FROM a' }, { stack: true })
// will e.g. log like this
ACError: SQLinvalid
  at SQLconnect (/pathTofile:150:10)
  ...
ERROR | SQLinvalid | 13001 | { query: 'SELECT FROM a' }
```


# Links
- [Website](https://www.admiralcloud.com/)

# License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud AG, Mark Poepping