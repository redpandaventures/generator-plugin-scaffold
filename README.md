# generator-plugin-scaffold 

This 

> [Yeoman](http://yeoman.io) generator for PSR-4 WordPress plugins. This is based off the [webdevstudios generator](https://github.com/WebDevStudios/generator-plugin-wp)

## Getting Started

Pre-requisites: You'll need [node](https://nodejs.org/download/) which comes with [npm](https://github.com/npm/npm#super-easy-install).

If you don't have [Yeoman](http://yeoman.io/) installed:

```bash
npm install -g yo
```

To install generator-plugin-scaffold from npm, run: (not published yet)

```bash
npm install -g generator-plugin-scaffold
```


To install generator-plugin-scaffold from git, run:

```bash
npm install -g git+https://github.com/redpandaventures/generator-plugin-scaffold
```

To use generator-plugin-scaffold, `cd` to your WordPress plugins folder and:

```bash
yo plugin-scaffold
```
You'll be prompted with steps for creating your plugin.



## Tests

By default the plugin generator includes some built in tests for you to add on to as
you develop your plugin. Theses

To run these tests run the `install-wp-tests.sh` script
in the bin folder with the proper database details for your local setup.

Once you've run the `install-wp-tests.sh` script you can run just `phpunit` in
the main folder of your plugin.

If you don't want tests included in your plugin when it is generated run the
main generator with the `--notests` option.

## PHP 7.2

By default PHP 7.2 is is the minimum version supported for this generator. 
