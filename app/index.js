'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var request = require( 'request' );
var child_process = require('child_process');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

	// Escape double quotes. 
	_escapeDoubleQuotes( s ) {
		return s.replace( /"/g, '\\"');
	}

	method1() {
		this.log('method 1 just ran');
	}

	_getLatestWPVersion() {
	    // Save the generator (this) to a variable so that we can access it within the nested function below.
	    var generator = this;

	    request.get({
	      url: 'https://api.wordpress.org/core/version-check/1.7/',
	      json: true,
	      headers: { 'User-Agent': 'request' }
	    }, function (err, res, data) {
	      // Check for status code.
	      if ( ! err && ( 200 === res.statusCode ) ) {
	        // Loop through results to find only the "upgrade" version
	        for ( var i in data.offers ) {
	          if ( 'upgrade' === data.offers[i].response ) {
	            generator.currentVersionWP = data.offers[i].current;
	            return;
	          }
	        }
	      }
	    });
	}

	initializing() {

	    // Grab package.json.
	    this.pkg = require('../package.json');

	    // Set Composer to false.
	    this.autoloaderList = ['Basic', 'None'];

	    // Get the plugin gen version.
	    var pjson = require( '../package.json' );
	    this.plugingenversion = pjson.version;

  	}

	async promptUser() {

		// Have Yeoman greet the user.
		this.log( yosay(
		  'Welcome to the sweet ' + chalk.red('Plugin Scaffold') + ' generator!'
		));

		// Set up all our prompts.
		this.answers = await this.prompt([
		{
		  type   : 'input',
		  name   : 'name',
		  message: 'Name',
		  default: 'RPV Plugin Name'
		}, 
		{
		  type   : 'input',
		  name   : 'homepage',
		  message: 'Homepage',
		  default: 'https://redpandaventures.com',
		  store: true
		}, 
		{
		  type   : 'input',
		  name   : 'description',
		  message: 'Description',
		  default: 'A PSR-4 based plugin for WordPress!'
		}, 
		{
		  type   : 'input',
		  name   : 'version',
		  message: 'Version',
		  default: '0.0.0'
		}, 
		{
		  type   : 'input',
		  name   : 'author',
		  message: 'Author',
		  default: 'RedPandaVentures',
		  save   : true,
		  store: true
		}, 
		{
		  type   : 'input',
		  name   : 'authoremail',
		  message: 'Author Email',
		  default: 'contact@redpandaventures.com',
		  save   : true,
		  store: true
		}, 
		{
		  type   : 'input',
		  name   : 'authorurl',
		  message: 'Author URL',
		  default: 'https://redpandaventures.com',
		  save   : true,
		  store: true
		}, 
		{
		  type   : 'input',
		  name   : 'license',
		  message: 'License',
		  default: 'GPLv2',
		  save   : true,
		  store  : true
		}, 
		{
		  type   : 'input',
		  name   : 'licenseuri',
		  message: 'License URI',
		  default: 'http://www.gnu.org/licenses/gpl-2.0.html',
		  save   : true,
		  store  : true
		}, 
		{
		  type   : 'input',
		  name   : 'slug',
		  message: 'Plugin Slug',
		  default: 'plugin-slug', 
		  save   : true,
		  store  : true	  
		}, 
		{
		  type   : 'input',
		  name   : 'namespace',
		  message: 'Namespace',
		  default: 'RedPandaVentures',
		  save   : true,
		  store  : true
		}, 
		{
		  type   : 'input',
		  name   : 'constant',
		  message: 'Constant Variables',
		  default: 'SLUG',
		  save   : true,
		  store  : true
		}
		]);

		this.answers.descriptionEscaped = this._escapeDoubleQuotes( this.answers.description ); 
		this.answers.year = new Date().getFullYear();
		this.answers.currentVersionWP = this._getLatestWPVersion();
	}


  	// Writing  
	async writing(){

		this.log( chalk.green( 'Creating plugin directory...' ) );

		// Set our destination to our slug.
		this.destinationRoot( this.answers.slug );

		// Copy the .files.  
		this.log( chalk.green( 'copying dot files...' ) );
		this.fs.copy(
			this.templatePath('_babelrc'),
			this.destinationPath('.babel')
		);
		this.fs.copyTpl(
			this.templatePath('_gitignore'),
			this.destinationPath('.gitignore'),
			this.answers
		);
		this.fs.copyTpl(
		  	this.templatePath('_editorconfig'),
		  	this.destinationPath('.editorconfig'),
		  	this.answers
		);

		 // Copy the dev files 
		this.log( chalk.green( 'copying dev files...' ) );
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath('package.json'),
			this.answers
		);
		this.fs.copyTpl(
			this.templatePath('composer.json'),
			this.destinationPath('composer.json'),
			this.answers
		);
		this.fs.copy(
			this.templatePath('Gulpfile.babel.js'),
			this.destinationPath('Gulpfile.babel.js')
		);
		this.fs.copy(
			this.templatePath('phpcs.xml'),
			this.destinationPath('phpcs.xml')
		);

		// Copy the main plugin file. 
		this.log( chalk.green( 'copying main plugin file' ) );
		this.fs.copyTpl(
			this.templatePath('plugin.php'),
			this.destinationPath(this.answers.slug + '.php'),
			this.answers
		);

		// Copy the readme.
		this.fs.copyTpl(
			this.templatePath('README.md'),
			this.destinationPath('README.md'),
			this.answers
		);

		// Copy the tests. 
		this.fs.copy(
			this.templatePath('phpunit.xml'),
			this.destinationPath('phpunit.xml'),
			this.answers
		);
		this.fs.copy(
			this.templatePath('bin/install-wp-tests.sh'),
			this.destinationPath('bin/install-wp-tests.sh'),
			this.answers
		);
		this.fs.copyTpl(
			this.templatePath('tests/bootstrap.php'),
			this.destinationPath('tests/bootstrap.php'),
			this.answers
		);
		this.fs.copyTpl(
			this.templatePath('tests/test-sample.php'),
			this.destinationPath('tests/test-sample.php'),
			this.answers
		);

		// Copy the directories. 
		this.fs.copyTpl(
			this.templatePath('assets/README.md'),
			this.destinationPath('assets/README.md'),
			this.answers
		);

		this.fs.copyTpl(
			this.templatePath('src'),
			this.destinationPath('src'),
			this.answers
		);
	}
};