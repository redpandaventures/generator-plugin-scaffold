module.exports = {
    files: [
        {
            src: 'tests/test-sample.php',
            dest: 'test-' + this.answers.slug + 'php'
        },
        {
            src: 'src',
            dest: 'src'
        },
    ]
}
