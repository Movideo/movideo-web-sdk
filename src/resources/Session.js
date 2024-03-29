'use strict';

var _ = require('lodash');
var utils = require('../utils');
var Resource = require('../Resource');
var Method = Resource.method;

module.exports = Resource.extend({

  path: 'session?applicationalias={alias}&key={key}',

  get: Method({
    method: 'GET',
    urlParams: ['key', 'alias']
  })

});