# AC CustomError
Extend the NodeJS error with an error code and additional information.

[![Node.js CI](https://github.com/AdmiralCloud/ac-customError/actions/workflows/node.js.yml/badge.svg)](https://github.com/AdmiralCloud/ac-customError/actions/workflows/node.js.yml)

# Usage
```
throw new ACError('myError', 123, { id: 333 })

// 
ACError: myError
    at STACK
  code: 123,
  errorMessage: 'myError',
  additionalInfo: { id: 333 }
}

```


# Links
- [Website](https://www.admiralcloud.com/)

# License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud AG, Mark Poepping