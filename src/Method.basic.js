'use strict';

var Method = require('./Method');
var utils = require('./utils');

module.exports = {

  create: Method({
    method: 'POST'
  }),

  get: Method({
    method: 'GET'
  }),

  retrieve: Method({
    method: 'GET',
    path: '/{id}',
    urlParams: ['id']
  }),

  update: Method({
    method: 'POST',
    path: '{id}',
    urlParams: ['id']
  }),

  // Avoid 'delete' keyword in JS
  del: Method({
    method: 'DELETE',
    path: '{id}',
    urlParams: ['id']
  })
};