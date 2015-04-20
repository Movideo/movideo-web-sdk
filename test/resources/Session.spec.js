'use strict';

// var movideo = require('../utils').getSpyableMovideo();
var movideo = require('../../src/Movideo')('dev', 'flash_test_app');
var expect = require('chai').expect;
var Promise = require('bluebird');

describe('Session Resource', function() {
  describe('get', function() {
    it('Sends the correct request with params', function(done) {
      return movideo.session.get('dev', 'flash_test_app', { format: 'json' })
        .then(function(session) {
          expect(session).to.have.property('session');
        }).then(done, done);
    });
  });
});