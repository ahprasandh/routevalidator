# Route validator
Express js Middleware which only allows configured urls and params to pass through and validates authentication otherwise throws error

## Usage
1. Session validation - `require("routevalidator").sessionValidation({func(req)})` - pass a function to validate authentication to your app. When authentication is set as true in rule, this function will be invoked, must return true or false
2. URL validation - `require("routevalidator").initRules({securityRulesObj})` - pass **Security Rule** object (refer doc below)
3. Add to express `router.use(require("routevalidator").routeValidator)` - pass **require("routevalidator").routeValidator** to express js router as a middleware

### Security Rules
` "<url_pattern>": { 
      authentication: true|false,  
           methods: {     
               POST: {           params: {             userName: {               regex:"[a-z]+",               minLength:8,               maxLength:100,               mandatory:true             },             password: {               maxLength:100,               mandatory:true             },             serurl: {               minLength:1,               maxLength:100,             },             displayName:{               regex:"[a-zA-z]+",               minLength:1,               maxLength:100,               mandatory:true             }           }         }       }     }`
