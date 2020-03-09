module.exports = function( answers ) {
    return { 
        files: [
        {
            src: 'tests/test-sample.php',
            dest: 'tests/test-' + answers.slug + 'php'
        },
        {
            src: 'tests/bootstrap.php',
            dest: 'tests/bootstrap.php'
        },
        ]
    }
}
