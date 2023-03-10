# AC-Custom-Error
Extend the NodeJS error with an error code and additional information.

[![Node.js CI](https://github.com/AdmiralCloud/ac-custom-error/actions/workflows/node.js.yml/badge.svg)](https://github.com/AdmiralCloud/ac-custom-error/actions/workflows/node.js.yml)

# Usage
```
const ACError = require('ac-custom-error')

throw new ACError('myError', 123, { id: 333 })

// OUTPUT 
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