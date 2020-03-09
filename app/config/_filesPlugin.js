module.exports = function( answers ) {
    files: [
     	{
            src: 'plugin.php',
            dest: answers.slug + '.php'
        },
        {
            src: 'uninstall.php',
            dest: 'uninstall.php'
        },
        {
            src: 'changelog.txt',
            dest: 'changelog.txt'
        },
        {
            src: 'readme.txt',
            dest: 'readme.txt'
        },
       
    ]
}