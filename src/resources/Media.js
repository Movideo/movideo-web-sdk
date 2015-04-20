'use strict';

var _ = require('lodash');
var utils = require('../utils');
var Resource = require('../Resource');
var Method = Resource.method;

module.exports = Resource.extend({

  path: 'media',

  includeBasic: ['retrieve'],

  related: Method({
    method: 'GET',
    path: '/{id}/related',
    urlParams: ['id']
  }),

  images: Method({
    method: 'GET',
    path: '/{id}/images',
    urlParams: ['id']
  }),

  cuepoints: Method({
    method: 'GET',
    path: '/{id}/cuepoints',
    urlParams: ['id']
  }),

  total: Method({
    method: 'GET',
    path: '/totals'
  }),

  daily: Method({
    method: 'GET',
    path: '/mostPlayed/day'
  }),

  weekly: Method({
    method: 'GET',
    path: '/mostPlayed/week'
  }),

  monthly: Method({
    method: 'GET',
    path: '/mostPlayed/month'
  })

});