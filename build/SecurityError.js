"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SecurityErrorCode = require("./SecurityErrorCode");

var _SecurityErrorCode2 = _interopRequireDefault(_SecurityErrorCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SecurityError extends Error {
  constructor(errorCode, data, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SecurityError);
    } // Custom debugging information


    if (!_SecurityErrorCode2.default[errorCode]) {
      errorCode = "RV_INTERNAL_1";
    }

    this.errorCode = errorCode;
    this.status = _SecurityErrorCode2.default[errorCode][0];
    this.message = _SecurityErrorCode2.default[errorCode][1];

    if (_SecurityErrorCode2.default[errorCode][2]) {
      for (var i in _SecurityErrorCode2.default[errorCode][2]) {
        console.log(i);

        var toGet = _SecurityErrorCode2.default[errorCode][2][i].split('|');

        var printData = null;
        var printKey = null;

        for (var j in toGet) {
          printKey = toGet[j];

          if (printData) {
            printData = printData[printKey];
          } else {
            printData = data[printKey];
          }
        }

        this.message += ' [' + printKey + ' : ' + printData + ']';
      }
    }

    this.date = new Date();
  }

}

exports.default = SecurityError;