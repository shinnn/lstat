/*!
 * lstat | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/lstat
*/
'use strict';

var inspect = require('util').inspect;

var PinkiePromise = require('pinkie-promise');
var fsLstat = require('graceful-fs').lstat;

module.exports = function lstat(path) {
  if (typeof path !== 'string') {
    return PinkiePromise.reject(new TypeError(
      'Expected a file path (string), but got a non-string value ' +
      inspect(path) +
      '.'
    ));
  }

  if (path.length === 0) {
    return PinkiePromise.reject(new Error('Expected a file path, but got \'\' (empty string).'));
  }

  return new PinkiePromise(function(resolve, reject) {
    fsLstat(path, function(err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};
