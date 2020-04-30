'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var request = require('request');
var child_process = require('child_process');

// Config files.
const filesDev = require('./config/_filesDev');
const filesPlugin = require('./config/_filesPlugin');
const dirsPluginTpl = require('./config/_dirsPluginTpl');
const filesTests = require('./config/_filesTests');

const licenses = {
    'GPLv2' : 'http://www.gnu.org/licenses/gpl-2.0.html', 
    'GPLv3' : 'http://www.gnu.org/licenses/gpl-3.0.html',
    'All Rights Reserved' : 'http://www.gnu.org/licenses/gpl-2.0.html'
};

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Files & Folders
        this.filesDev = filesDev
        this.filesPlugin = filesPlugin
        this.dirsPluginTpl = dirsPluginTpl
        this.filesTests = filesTests
    }

    // Escape double quotes. 
    _escapeDoubleQuotes(s) {
        return s.replace(/"/g, '\\"');
    }
    _getLatestWPVersion() {
        // Save the generator (this) to a variable so that we can access it within the nested function below.
        var generator = this;

        request.get({
            url: 'https://api.wordpress.org/core/version-check/1.7/',
            json: true,
            headers: {
                'User-Agent': 'request'
            }
        }, function(err, res, data) {
            // Check for status code.
            if (!err && (200 === res.statusCode)) {
                // Loop through results to find only the "upgrade" version
                for (var i in data.offers) {
                    if ('upgrade' === data.offers[i].response) {
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

        // Get the plugin gen version.
        var pjson = require('../package.json');
        this.plugingenversion = pjson.version;

    }

    async promptUser() {

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the WordPress ' + chalk.red('Plugin Scaffold') + ' generator!'
        ));

        this.log( Object.keys( licenses ) ); 

        // Set up all our prompts.
        this.answers = await this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Name',
            default: 'RPV Plugin Name'
        }, {
            type: 'input',
            name: 'homepage',
            message: 'Homepage',
            default: 'https://redpandaventures.com',
            store: true
        }, {
            type: 'input',
            name: 'description',
            message: 'Description',
            default: 'A PSR-4 based plugin for WordPress!'
        }, {
            type: 'input',
            name: 'version',
            message: 'Version',
            default: '0.0.1'
        }, {
            type: 'input',
            name: 'author',
            message: 'Author',
            default: 'RedPandaVentures',
            save: true,
            store: true
        }, {
            type: 'input',
            name: 'authoremail',
            message: 'Author Email',
            default: 'contact@redpandaventures.com',
            save: true,
            store: true
        }, {
            type: 'input',
            name: 'authorurl',
            message: 'Author URL',
            default: 'https://redpandaventures.com',
            save: true,
            store: true
        }, {
            type: 'list',
            name: 'license',
            message: 'What License will this code be relased under?',
            choices: Object.keys( licenses ), 
            save: true,
            store: true
        }, {
            type: 'input',
            name: 'slug',
            message: 'Plugin Slug',
            default: 'plugin-slug',
            save: true,
            store: true
        }, {
            type: 'input',
            name: 'wp_requires',
            message: 'WordPress Required version',
            default: this._getLatestWPVersion(),
            save: true,
            store: true
        }, {
            type: 'input',
            name: 'wp_testedto',
            message: 'WordPress Testd to version',
            default: this._getLatestWPVersion(),
            save: true,
            store: true
        },{
            type: 'input',
            name: 'namespace',
            message: 'Namespace',
            default: 'RedPandaVentures',
            save: true,
            store: true
        }, {
            type: 'input',
            name: 'constant',
            message: 'Constant Variable Prefix',
            default: 'SLUG',
            save: true,
            store: true
        }]);

        this.answers.licenseuri = licenses[this.answers.license]; 
        this.answers.descriptionEscaped = this._escapeDoubleQuotes(this.answers.description);
        this.answers.year = new Date().getFullYear();
        this.answers.currentVersionWP = this._getLatestWPVersion();

        this.config.set('answers', this.answers);
    }


    // Writing  
    async writing() {

        this.log(chalk.green('Creating plugin directory...'));

        // Set our plugin dir destination to our slug.
        this.destinationRoot(this.answers.slug);

        // Dev Files
        this.log({
            message: 'Moving Dev Files'
        })
        this.filesDev.filesTpl.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file.src),
                this.destinationPath(file.dest),
                this.answers
            )
        })

        this.filesDev.files.forEach(file => {
            this.fs.copy(
                this.templatePath(file.src),
                this.destinationPath(file.dest),
            )
        })

        // Copy the main plugin files. 
        this.log(chalk.green('Moving Plugin files'));
        this.filesPlugin(this.answers).files.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file.src),
                this.destinationPath(file.dest),
                this.answers
            )
        })

        // Copy the main plugin directories. 
        this.log(chalk.green('Moving Plugin directories'));
        this.dirsPluginTpl.files.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file.src),
                this.destinationPath(file.dest),
                this.answers
            )
        })

        // Copy the main plugin directories. 
        this.log(chalk.green('Moving test files'));
        this.filesTests(this.answers).files.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file.src),
                this.destinationPath(file.dest),
                this.answers
            )
        })

    }
};