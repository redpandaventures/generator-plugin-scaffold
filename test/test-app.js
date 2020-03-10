'use strict';

var path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test')
const fs = require('fs-extra')

// Define some variables
const author = {
    name: 'Jamie Madden',
    email: 'developer@redpandaventures.com',
    homepage: 'https://redpandaventures.com'
}

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
      'assets/src/scss/plugin-scaffold.scss',
      'src/Admin/Admin.php', 
      'src/Front/Front.php', 
    ]);
  });
});
