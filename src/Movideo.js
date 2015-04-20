'use strict';

Movideo.DEFAULT_HOST      = 'api.movideo.com';
Movideo.DEFAULT_PORT      = '80';
Movideo.DEFAULT_BASE_PATH = '/rest/';
Movideo.DEFAULT_FORMAT    = 'json';
// use node's default timout 900 milliseconds
Movideo.DEFAULT_TIMEOUT   = require('http').createServer().timeout;
Movideo.PACKAGE_VERSION   = require('../package.json').verion;

var resources = {
  Session : require('./resources/Session')
};

Movideo.Resource = require('./Resource');
Movideo.resources = resources;

function Movideo(key, alias) {

  if (!(this instanceof Movideo)) {
    return new Movideo(key, alias);
  }

  this.api = {
    key      : null,
    alias    : null,
    token    : null,
    format   : Movideo.DEFAULT_FORMAT,
    host     : Movideo.DEFAULT_HOST,
    port     : Movideo.DEFAULT_PORT,
    basePath : Movideo.DEFAULT_BASE_PATH,
    timeout  : Movideo.DEFAULT_TIMEOUT
  };

  this.loadResources();
  this.setKey(key);
  this.setAlias(alias);
}

Movideo.prototype = {
  setHost: function(host, port) {
    this._setApiField('host', host);
    if (port) this.setPort(port);
  },

  setPort: function(port) {
    this._setApiField('port', port);
  },

  setKey: function(key) {
    this._setApiField('key', key);
  },

  setAlias: function(alias) {
    this._setApiField('alias', alias);
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Movideo.DEFAULT_TIMEOUT : timeout
    );
  },

  setFormat: function(format) {
    this._setApiField('format', format);
  },

  setToken: function(token) {
    this._setApiField('token', token);
  },

  _setApiField: function(key, value) {
    this.api[key] = value;
  },

  getApiField: function(key) {
    return this.api[key];
  },

  getConstant: function(c) {
    return Movideo[c];
  },

  loadResources: function() {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  }
}

module.exports = Movideo;
