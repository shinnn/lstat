'use strict';

const createSymlink = require('create-symlink');
const lstat = require('.');
const rmfr = require('rmfr');
const {Stats} = require('fs');
const test = require('tape');

test('lstat()', async t => {
  t.plan(7);

  const fail = t.fail.bind(t, 'Unexpectedly succeeded.');

  lstat(new Set()).then(fail, ({message}) => {
    t.strictEqual(
      message,
      'Expected a file path (string), but got a non-string value Set {}.',
      'should fail when it takes a non-string argument.'
    );
  });

  lstat('').then(fail, ({message}) => {
    t.strictEqual(
      message,
      'Expected a file path, but got \'\' (empty string).',
      'should fail when it takes an empty string.'
    );
  });

  lstat().then(fail, ({message}) => {
    t.strictEqual(
      message,
      'Expected 1 argument (string), but got no arguments instead.',
      'should fail when it takes no arguments.'
    );
  });

  lstat('a', 'b').then(fail, ({message}) => {
    t.strictEqual(
      message,
      'Expected 1 argument (string), but got 2 arguments instead.',
      'should fail when it takes too many arguments.'
    );
  });

  lstat('none').then(fail, ({message}) => {
    t.strictEqual(
      message,
      'ENOENT: no such file or directory, lstat \'none\'',
      'should fail when it cannot find the file.'
    );
  });

  await createSymlink(__filename, '__tmp_symlink__');
  const stat = await lstat('__tmp_symlink__');

  t.ok(
    stat instanceof Stats,
    'should be fulfilled with `fs.Stats` instance.'
  );

  t.strictEqual(
    stat.isSymbolicLink(),
    true,
    'should get file info `lstat` way.'
  );

  await rmfr('__tmp_symlink__');
});
