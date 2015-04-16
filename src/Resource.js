'use strict'

var http = require('http');
var _ = require('lodash');
var path = require('path');
var Promise = require('bluebird');
var utils = require('./utils');
// var Error = require('./Error');


// Provide extension mechanism for Stripe Resource Sub-Classes
Resource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
Resource.method = require('./Method');
Resource.BASIC_METHODS = require('./Method.basic');

function Resource(resource, urlData) {

  this._resource = resource;
  this._urlData = urlData || {};

  this.basePath = utils.makeURLInterpolator(resource.getApiField('basePath'));
  this.path = utils.makeURLInterpolator(this.path);

  if (this.includeBasic) {
    this.includeBasic.forEach(function(method) {
      this[method] = Resource.BASIC_METHODS[method];
    });
  }

  this.initialise.apply(this, arguments);
}

Resource.prototype = {

  path: '',

  initialize: function() {},

  // Function to override the default data processor. This allows full control
  // over how a StripeResource's request data will get converted into an HTTP
  // body. This is useful for non-standard HTTP requests. The function should
  // take method name, data, and headers as arguments.
  requestDataProcessor: null,

  // String that overrides the base API endpoint. If `overrideHost` is not null
  // then all requests for a particular resource will be sent to a base API
  // endpoint as defined by `overrideHost`.
  overrideHost: null,

  createFullPath: function(commandPath, urlData) {
    return path.join(
      this.basePath(urlData),
      this.path(urlData),
      typeof commandPath == 'function' ?
        commandPath(urlData) : commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  },

  createUrlData: function() {
    var urlData = {};
    // Merge in baseData
    for (var i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }
    return urlData;
  },

  createDeferred: function(callback) {
    var deferred = Promise.defer();

    if (callback) {
      // Callback, if provided, is a simply translated to Promise'esque:
      // (Ensure callback is called outside of promise stack)
      deferred.promise.then(function(res) {
        setTimeout(function(){ callback(null, res) }, 0);
      }, function(err) {
        setTimeout(function(){ callback(err, null); }, 0);
      });
    }
    return deferred;
  },

  request: function(method, path, data, auth, options, callback) {
    var requestData = utils.stringifyRequestData(data || {});
    var self = this;
    var requestData;

    if (self.requestDataProcessor) {
      requestData = self.requestDataProcessor(method, data, options.headers);
    } else {
      requestData = utils.stringifyRequestData(data || {});
    }

    if (options.headers) {
      headers = _.extend(headers, options.headers);
    }

    this.makeRequest();
  },

  makeRequest: function() {
    var timeout = self._resource.getApiField('timeout');

    var host = self.overrideHost || self._resource.getApiField('host');

    var req = http.request({
      host: host,
      port: self._resource.getApiField('port'),
      path: path,
      method: method,
      headers: headers,
      ciphers: "DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5"
    });

    req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
    req.on('response', self._responseHandler(req, callback));
    req.on('error', self._errorHandler(req, callback));

    req.on('socket', function(socket) {
      socket.on('connect'), function() {
        // Send payload; we're safe:
        req.write(requestData);
        req.end();
      });
    });
  },

  // Handlers
  timeoutHandler: function(timeout, request, callback) {
    var self = this;
    return function() {
      var timeoutErr = new Error('ETIMEDOUT');
      timeoutErr.code = 'ETIMEDOUT';

      request._isAborted = true;
      request.abort();

      callback.call(
        self,
        new Error.ConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr
        }),
        null
      );
    }
  },
  responseHandler: function(request, callback) {
    var self = this;
    return function(res) {
      var response = '';

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response += chunk;
      });

      res.on('end', function() {
        try {
          response = JSON.parse(response);
          if (response.error) {
            var err;
            if (res.statusCode === 401) {
              err = new Error.AuthenticationError(response.error);
            } else {
              err = Error.ResourceError.generate(response.error);
            }
            return callback.call(self, err, null);
          }
        } catch (e) {
          return callback.call(
            self,
            new Error.APIError({
              message: 'Invalid JSON received from the Movideo API',
              response: response,
              exception: e
            }),
            null
          );
        }
        callback.call(self, null, response);
      });
    };
  },
  errorHandler: function(request, callback) {
    var self = this;
    return function(error) {
      if (request._isAborted) return; // already handled
      callback.call(
        self,
        new Error.ConnectionError({
          message: 'An error occurred with our connection to Movideo',
          detail: error
        }),
        null
      );
    }
  }
};

module.exports = Resource;