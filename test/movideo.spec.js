'use strict';

var Promise = require('bluebird');
var expect = require('chai').expect;

var testUtils = require('./utils');
var Movideo = require('../src/Movideo')(
  'dev', 'flash_test_app'
);

describe('Movideo Module', function() {
  describe('setTimeout', function() {
    it('Should define a default equal to the node default', function() {
      expect(Movideo.getApiField('timeout')).to.equal(require('http').createServer().timeout);
    });
    it('Should allow me to set a custom timeout', function() {
      Movideo.setTimeout(900);
      expect(Movideo.getApiField('timeout')).to.equal(900);
    });
    it('Should allow me to set null, to reset to the default', function() {
      Movideo.setTimeout(null);
      expect(Movideo.getApiField('timeout')).to.equal(require('http').createServer().timeout);
    });
  });

});