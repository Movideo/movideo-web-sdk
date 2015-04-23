'use strict';

var _ = require('lodash');
var utils = require('../utils');
var Resource = require('../Resource');
var Method = Resource.method;

module.exports = Resource.extend({

  path: '',

  retrieve: Method({
    path: '/tagprofile/{id}',
    method: 'GET',
    urlParams: ['id']
  }),

  search: Method({
    path: '/tagprofile/search?keyword={keyword}'
    method: 'GET',
    urlParams: ['keyword']
  }),

  content: Method({
    path: '/tag/findFromContent?content={content}&primaryNs={namespace}&primaryPredicate={predicate}',
    method: 'GET',
    urlParams: ['content', 'namespace', 'predicate']
  })

});