export default Object.freeze({
  "RV_INTERNAL_1":[500,"Internal Server Error"],
  "RV_URL_404":[404,"RouteValidationError:URL rule not configured for the url",['url']],
  "RV_AUTH_401":[401,"RouteValidationError: Unauthorized"],
  "RV_PARAM_4001":[400,"RouteValidationError: Configured Param value does not match",['param','value','regex']],
  "RV_PARAM_4002":[400,"RouteValidationError: Mandatory param missing",['param']],
  "RV_PARAM_4003":[400,"RouteValidationError: Param length greater than configured length",['param','length']],
  "RV_PARAM_4004":[400,"RouteValidationError: Param length lesser than configured length",['param','length']],
  "RV_PARAM_4005":[400,"RouteValidationError: Param value does not match loaded regex",['param','value', 'regex']],
  "RV_PARAM_4006":[400,"RouteValidationError: Extra param found",['param','value']]
});