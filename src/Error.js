'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned
 */
function _Error(raw) {
  this.populate.apply(this, arguments);
  this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 */
var ResourceError = _Error.ResourceError = _Error.extend({
  type: 'ResourceError',
  populate: function(raw) {

    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.stack = (new Error(raw.message)).stack;
    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = raw.message;
    this.detail = raw.detail;
    this.raw = raw;

  }
});

/**
 * Helper factory which takes raw errors and outputs wrapping instances
 */
ResourceError.generate = function(rawError) {
  return new _Error('Generic', 'Unknown Error');
};

// Specific Error types:
_Error.InvalidRequestError = ResourceError.extend({ type: 'InvalidRequest' });
_Error.APIError = ResourceError.extend({ type: 'APIError' });
_Error.AuthenticationError = ResourceError.extend({ type: 'AuthenticationError' });
_Error.ForbiddenError = ResourceError.extend({ type: 'ForbiddenError' });
_Error.ConnectionError = ResourceError.extend({ type: 'ConnectionError' });
