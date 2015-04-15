'use strict'

Movideo.DEFAULT_HOST      = 'api.movideo.com';
Movideo.DEFAULT_PORT      = '80';
Movideo.DEFAULT_BASE_PATH = '/rest/';
Movideo.DEFAULT_FORMAT    = 'json';

Movideo.DEFAULT_TIMEOUT   = require('http').createServer().timeout;

Movideo.PACKAGE_VERSION   = require('../package.json').verion;

var resources = {
  Session : require('./resources/Session'),
  // Application: require('./resources/Application'),
  // Playlist: require('./resources/Playlist'),
  // Media: require('./resources/Media'),
  // Tag: require('./resources/Tag'),
  // Geolocation: require('./resources/Geolocation')
};

Movideo.resources = resources;

function Movideo(key, alias) {

  if (!this instanceof Movideo) {
    return new Movideo(key, alias);
  }

  this._session = null;

  this._api     = {
    auth     : null,
    alias    : null,
    host     : Movideo.DEFAULT_HOST,
    port     : Movideo.DEFAULT_PORT,
    timeout  : Movideo.DEFAULT_TIMEOUT,
  };

  this._prepResources();
  this.setKey(key);
  this.setAlias(alias);
}

Movideo.prototype = {

  setAlias: function(alias) {
    this._setApiField('alias', alias);
  },

  setSession: function(session) {
    this._session = session;
  },

  getSession: function() {
    return this._session;
  },

  refreshSession: function() {
    this._session.refresh();
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  getApiField: function(key) {
    return this._api[key];
  },

  getConstant: function(c) {
    return Movideo[c];
  },

  _prepResources: function() {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  }
}

module.exports = Movideo;