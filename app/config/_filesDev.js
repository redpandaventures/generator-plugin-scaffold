module.exports = {
    filesTpl: [
     	{
            src: '_babelrc',
            dest: '.babelrc'
        },
        {
            src: '_editorconfig',
            dest: '.editorconfig'
        },
        {
            src: '_gitignore',
            dest: '.gitignore'
        },
       
        {
            src: 'composer.json',
            dest: 'composer.json'
        },
       
        {
            src: 'package.json',
            dest: 'package.json'
        },
        {
            src: 'phpcs.xml',
            dest: 'phpcs.xml'
        },
        {
            src: 'phpunit.xml',
            dest: 'phpunit.xml'
        },
        {
            src: 'README.md',
            dest: 'README.md'
        },
    ], 
    files: [
         {
            src: 'Gulpfile.babel.js',
            dest: 'Gulpfile.babel.js'
        },
    ]
}
