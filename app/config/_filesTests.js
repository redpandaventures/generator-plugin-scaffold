module.exports = function( answers ) {
    files: [
        {
            src: 'tests/test-sample.php',
            dest: 'test-' + answers.slug + 'php'
        },
        {
            src: 'src',
            dest: 'src'
        },
    ]
}
