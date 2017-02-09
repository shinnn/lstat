/*!
 * lstat | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/lstat
*/
'use strict';

var inspect = require('util').inspect;

var fsLstat = require('graceful-fs').lstat;

module.exports = function lstat(path) {
  if (typeof path !== 'string') {
    return Promise.reject(new TypeError('Expected a file path (string), but got a non-string value ' + inspect(path) + '.'));
  }

  if (path.length === 0) {
    return Promise.reject(new Error('Expected a file path, but got \'\' (empty string).'));
  }

  return new Promise(function(resolve, reject) {
    fsLstat(path, function(err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};
