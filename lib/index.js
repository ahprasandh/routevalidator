import SecurityError from "./SecurityError";

let securityRules = null;
let sessionValidationFunction = null;

const hasRuleConfigured = (wrapper) => {
  return new Promise((resolve, reject) => {
    let matchedRule = null;
    var realUrl = wrapper.req.originalUrl.split("?")[0];
    for (var rule in securityRules.urls) {
      var regex = new RegExp("^" + rule.replace("/", "\/") + "$");
      // console.log(regex.test(realUrl) + " |-url- " + realUrl + "|-rule- " + regex);
      if (regex.test(realUrl)) {
        matchedRule = securityRules.urls[rule];
        break;
      }
    }
    if (matchedRule && matchedRule.methods[wrapper.req.method]) {
      matchedRule.rule = realUrl;
      wrapper.rule = matchedRule;
      resolve(wrapper);
    } else {
      reject(new SecurityError("RV_URL_404", {
        url: wrapper.req.originalUrl
      }));
    }
  });
};

const checkParamPattern = (wrapper) => {
  var methodRule = wrapper.rule.methods[wrapper.req.method];

  if (methodRule.params && Object.keys(methodRule.params).length > 0 && Object.keys(wrapper.req.body).length > 0) {
    // console.log(wrapper.req.get("Content-Type"));
    // console.log(wrapper.req.body);
    var reqParams = wrapper.req.body;
    for (var param in reqParams) {
      if (!methodRule.params[param]) {
        return Promise.reject(new SecurityError("RV_PARAM_4006", {
          param: param,
          value: reqParams[param]
        }));
      }
    }
    for (var param in methodRule.params) {
      var configuration = methodRule.params[param];
      if (configuration.mandatory && !reqParams[param]) {
        return Promise.reject(new SecurityError("RV_PARAM_4002", {
          param: param
        }));
      }
      if (reqParams[param]) {
        var paramValue = reqParams[param]
        if (configuration.minLength && paramValue.length < configuration.minLength) {
          return Promise.reject(new SecurityError("RV_PARAM_4004", {
            param: param,
            length: configuration.minLength
          }));
        }
        if (configuration.maxLength && paramValue.length > configuration.maxLength) {
          return Promise.reject(new SecurityError("RV_PARAM_4003", {
            param: param,
            length: configuration.maxLength
          }));
        }
        if (configuration.regex && !(new RegExp("^" + configuration.regex + "$").test(paramValue))) {
          return Promise.reject(new SecurityError("RV_PARAM_4005", {
            param: param,
            value: paramValue,
            regex: configuration.regex
          }));
        }
      }
    }
  }
  return Promise.resolve(wrapper);
};

const checkAuthentication = (wrapper) => {
  let rule = wrapper.rule;
  let req = wrapper.req;
  return new Promise((resolve, reject) => {
    if (rule.authentication) {
      sessionValidationFunction(req).then((wrapper) => {
        resolve(wrapper);
      }).catch(() => {
        reject(new _SecurityError2.default("RV_AUTH_401"))
      })
    } else {
      resolve(wrapper);
    }
  });
}

export function routeValidator(req, res, next) {
  let routerWrapper = {
    req: req,
    res: res
  };
  hasRuleConfigured(routerWrapper).then(checkParamPattern).then(checkAuthentication).then((wrapper) => {
    next();
  }).catch(err => {
    next(err);
  });
};

export function sessionValidation(func) {
  sessionValidationFunction = func;
}

export function initRules(rules) {
  if (!securityRules) {
    securityRules = rules;
  } else {
    for (var rule in rules.urls) {
      securityRules.urls[rule] = rules.urls[rule];
    }
  }
}