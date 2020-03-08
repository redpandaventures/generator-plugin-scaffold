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
	_escapeDoubleQuotes() {
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

	    // Set the initial value.
	    this.currentVersionWP = '5.6.0';

	    // Get the latest WP version.
	    this._getLatestWPVersion();

	    // Set Composer to false.
	    this.autoloaderList = ['Basic', 'None'];

	    // Get the plugin gen version.
	    var pjson = require( '../package.json' );
	    this.plugingenversion = pjson.version;

  	}

	promptUser() {
		var done = this.async();

		// Have Yeoman greet the user.
		this.log( yosay(
		  'Welcome to the neat ' + chalk.red('Plugin Scaffold') + ' generator!'
		));

		// Set up all our prompts.
		var prompts = [{
		  type   : 'input',
		  name   : 'name',
		  message: 'Name',
		  default: 'RPV Plugin Name'
		}, {
		  type   : 'input',
		  name   : 'homepage',
		  message: 'Homepage',
		  default: 'https://redpandaventures.com',
		  store: true
		}, {
		  type   : 'input',
		  name   : 'description',
		  message: 'Description',
		  default: 'A PSR-4 based plugin for WordPress!'
		}, {
		  type   : 'input',
		  name   : 'version',
		  message: 'Version',
		  default: '0.0.0'
		}, {
		  type   : 'input',
		  name   : 'author',
		  message: 'Author',
		  default: 'RedPandaVentures',
		  save   : true,
		  store: true
		}, {
		  type   : 'input',
		  name   : 'authoremail',
		  message: 'Author Email',
		  default: 'contact@redpandaventures.com',
		  save   : true,
		  store: true
		}, {
		  type   : 'input',
		  name   : 'authorurl',
		  message: 'Author URL',
		  default: 'https://redpandaventures.com',
		  save   : true,
		  store: true
		}, {
		  type   : 'input',
		  name   : 'license',
		  message: 'License',
		  default: 'GPLv2',
		  save   : true,
		  store  : true
		}, {
		  type   : 'input',
		  name   : 'licenseuri',
		  message: 'License URI',
		  default: 'http://www.gnu.org/licenses/gpl-2.0.html',
		  save   : true,
		  store  : true
		}, {
		  type   : 'input',
		  name   : 'slug',
		  message: 'Plugin Slug',
		  default: 'plugin-slug', 
		  save   : true,
		  store  : true	  
		}, {
		  type   : 'input',
		  name   : 'namespace',
		  message: 'Namespace',
		  default: 'RedPandaVentures',
		  save   : true,
		  store  : true
		}, {
		  type   : 'input',
		  name   : 'constant',
		  message: 'Constant Variables',
		  default: 'SLUG',
		  save   : true,
		  store  : true
		}];

		 // Sanitize inputs.
		this.prompt( prompts, function (props) {
		  this.name               = this._.clean( props.name );
		  this.homepage           = this._.clean( props.homepage );
		  this.description        = this._.clean( props.description );
		  this.descriptionEscaped = this._escapeDoubleQuotes( this.description );
		  this.version            = this._.clean( props.version );
		  this.author             = this._.clean( props.author );
		  this.authoremail        = this._.clean( props.authoremail );
		  this.authorurl          = this._.clean( props.authorurl );
		  this.license            = this._.clean( props.license );
		  this.licenseuri         = this._.clean( props.licenseuri );
		  this.slug               = this._.slugify( props.slug );
		  this.namespace          = this._.clean( props.namespace );
		  this.year               = new Date().getFullYear();
		  
		  // All done.
		  done();
		}.bind(this));
	}

  	// Create the plugin directory 
	createPluginDir(){
	  var done = this.async();

	  // Grab our destination path folder.
	  fs.lstat( this.destinationPath( this.slug ), function(err, stats) {

	    // If its not an error, but it exists, flag that to the user.
	    if (!err && stats.isDirectory()) {
	      this.log( chalk.red( 'A plugin already exists with this folder name, exiting...' ) );
	      process.exit();
	    }

	    // Set our destination to our slug.
	    this.destinationRoot( this.slug );

	    // Done.
	    done();
	  }.bind(this));
	}

    // Copy the .files.  
    dotfiles() {
      this.fs.copy(
        this.templatePath('_babelrc'),
        this.destinationPath('/.babel')
      );
      this.fs.copyTpl(
        this.templatePath('_gitignore'),
        this.destinationPath('/.gitignore'),
        this
      );
      this.fs.copyTpl(
          this.templatePath('_editorconfig'),
          this.destinationPath('/.editorconfig'),
          this
      );
    }

    // Copy the dev files 
    devFiles() {
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('/package.json'),
        this
      );
      this.fs.copyTpl(
        this.templatePath('composer.json'),
        this.destinationPath('/composer.json'),
        this
      );
      this.fs.copy(
          this.templatePath('Gulpfile.babel.js'),
          this.destinationPath('/Gulpfile.babel.js')
      );
      this.fs.copy(
          this.templatePath('phpcs.xml'),
          this.destinationPath('/phpcs.xml')
      );
    }

    // Copy the main plugin file. 
    mainFile() {
      this.fs.copyTpl(
        this.templatePath('plugin.php'),
        this.destinationPath('/' + this.slug + '.php'),
        this
      );
    }

    // Copy the readme.
    readme() {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('/README.md'),
        this
      );
    }

    // Copy the tests. 
    tests() {
      this.fs.copy(
        this.templatePath('phpunit.xml'),
        this.destinationPath('/phpunit.xml'),
        this
      );

      this.fs.copy(
        this.templatePath('bin/install-wp-tests.sh'),
        this.destinationPath('bin/install-wp-tests.sh'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('tests/bootstrap.php'),
        this.destinationPath('tests/bootstrap.php'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('tests/test-base.php'),
        this.destinationPath('tests/test-base.php'),
        this
      );
    }

    // Copy the directories. 
    directories() {
      this.fs.copyTpl(
        this.templatePath('assets/README.md'),
        this.destinationPath('assets/README.md'),
        this
      );

      this.fs.copyTpl(
        this.templatePath('includes/README.md'),
        this.destinationPath('includes/README.md'),
        this
      );
    }

    // Save the config.
    saveConfig() {
      this.config.set( 'name', this.name );
      this.config.set( 'homepage', this.homepage );
      this.config.set( 'description', this.description );
      this.config.set( 'version', this.version );
      this.config.set( 'author', this.author );
      this.config.set( 'authoremail', this.authoremail );
      this.config.set( 'authorurl', this.authorurl );
      this.config.set( 'license', this.license );
      this.config.set( 'licenseuri', this.licenseuri );
      this.config.set( 'slug', this.slug );
      this.config.set( 'classname', this.classname );
      this.config.set( 'mainclassname', this.classname );
      this.config.set( 'classprefix', this.classprefix );
      this.config.set( 'prefix', this.prefix );
      this.config.set( 'year', this.year );

      this.config.set( 'currentVersionWP', this.currentVersionWP );

      this.config.set( 'plugingenversion', this.plugingenversion );

      this.config.save();
    }

};