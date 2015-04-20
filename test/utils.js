require('mocha');
// Ensure we are using the 'as promised' libs before any tests are run:
require('chai').use(require('chai-as-promised'));

var utils = module.exports = {
  getSpyableMovideo: function() {
    // Provide a testable instance
    // That is, with mock-requests built in and hookable

    var Movideo = require('../src/Movideo');
    var movideoInstance = Movideo('dev', 'flash_test_app');

    movideoInstance.REQUESTS = [];

    for (var i in movideoInstance) {
      if (movideoInstance[i] instanceof Movideo.Resource) {

        // Override each _request method so we can make the params
        // available to consuming tests (revealing requests made on
        // REQUESTS and LAST_REQUEST):
        movideoInstance[i].request = function(method, url, data, options, cb) {
          var req = movideoInstance.LAST_REQUEST = {
            method: method,
            url: url,
            data: data,
            headers: options.headers || {},
          };
          movideoInstance.REQUESTS.push(req);
          cb.call(this, null, {});
        };
      }
    }
    return movideoInstance;
  }
};