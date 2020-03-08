'use strict';
var Generator = require('yeoman-generator');
var updateNotifier = require('update-notifier');

module.exports = class extends Generator {
	 constructor(args, opts) {
    	// Calling the super constructor is important so our generator is correctly set up
    	super(args, opts);

		updateNotifier({
			pkg: require('./package.json')
		}).notify({defer: false});
	}

	_wpClassify() {
		var words  = this._.words( s );
		var result = '';

		for ( var i = 0; i < words.length; i += 1 ) {
			if ( this._.classify( words[i] ) ) {
				result += this._.capitalize( words[i] );
				if ( (i + 1) < words.length ) {
					result += '_';
				}
			}
		}

		result = result.replace('-', '_');
		return result;

	}

	_wpClassPrefix() {
		var words = s.replace( /_/g, ' ' );
		var letters = words.replace(/[a-z]/g, '');
		var hyphens = letters.replace(/\s/g, '');
		var prefix  = hyphens.replace(/-/g,'');
		return prefix + '_';
	}

	_escapeDoubleQuotes() {
		return s.replace( /"/g, '\\"');
	}

};