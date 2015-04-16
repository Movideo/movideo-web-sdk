'use strict';

var Resource = require('../Resource');
var Method = Resource.method;

module.exports = Resource.extend({

  path: 'session',

  get: Method({
    method: 'GET'
  })

});