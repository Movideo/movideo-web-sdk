'use strict';

var _ = require('lodash');
var utils = require('../utils');
var Resource = require('../Resource');
var Method = Resource.method;

module.exports = Resource.extend({

  path: 'playlist',

  includeBasic: ['retrieve'],

  search: Method({
    method: 'GET',
    path: '/search'
  }),

  media: Method({
    method: 'GET',
    path: '/{id}/media',
    urlParams: ['id']
  }),

  playlists: Method({
    method: 'GET',
    path: '/{id}/playlists',
    urlParams: ['id']
  }),

  images: Method({
    method: 'GET',
    path: '/{id}/images',
    urlParams: ['id']
  }),

  root: Method({
    method: 'GET',
    path: '/firstRootPlaylist'
  })

});
