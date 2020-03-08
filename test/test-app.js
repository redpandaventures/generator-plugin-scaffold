'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('plugin-scaffold:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions()
      .withPrompt({
        name: 'Test Plugin NAME'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.gitignore',
      'Gulpfile.babel.js',
      'composer.json', 
      'README.md',
      'readme.txt',
      'changelog.txt',
      'test-plugin-name.php',
      'assets/src/scss/admin.scss',
      'assets/src/scss/front.scss',
      'assets/src/scss/test-plugin-name.scss',
      'src/Admin/Admin.php', 
      'src/Front/Front.php', 
    ]);
  });
});
