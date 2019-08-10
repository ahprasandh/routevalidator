import SecurityErrorCode from './SecurityErrorCode'
class SecurityError extends Error {
  constructor(errorCode,data, ...params) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SecurityError);
    }
    // Custom debugging information
    if (!SecurityErrorCode[errorCode]) {
      errorCode = "RV_INTERNAL_1";
    }
    this.errorCode = errorCode;
    this.status = SecurityErrorCode[errorCode][0];
    this.message = SecurityErrorCode[errorCode][1];
    if (SecurityErrorCode[errorCode][2]) {
      for (var i in SecurityErrorCode[errorCode][2]) {
        console.log(i)
        var toGet=SecurityErrorCode[errorCode][2][i].split('|');
        var printData=null
        var printKey=null;
        for(var j in toGet){
          printKey=toGet[j];
          if(printData){
            printData=printData[printKey]
          }else{
            printData=data[printKey]
          }
        }
        this.message += ' ['+printKey+' : '+printData+']';
      }
    }
    this.date = new Date();
  }
}
export default SecurityError;