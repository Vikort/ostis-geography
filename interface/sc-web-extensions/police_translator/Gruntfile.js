module.exports = function (grunt) {
    const police_translatorDirPath = './police_translator/';

    const scWebDirPath = '../../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            police_translator: {
                src: [police_translatorDirPath + 'src/*.js'],
                dest: police_translatorDirPath + 'static/js/police_translator.js'
            },
        },
        copy: {
            police_translatorJs: {
                cwd: police_translatorDirPath + 'static/js/',
                src: 'police_translator.js',
                dest: clientJsDirPath + 'police_translator/',
                expand: true,
                flatten: true
            },
            police_translatorCss: {
                cwd: police_translatorDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            police_translatorHtml: {
                cwd: police_translatorDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            police_translatorImg: {
                cwd: police_translatorDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'police_translator/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            police_translatorJs: {
                files: police_translatorDirPath + 'src/**',
                tasks: ['concat:police_translator', 'copy:police_translatorJs'],
            },
            police_translatorCss: {
                files: police_translatorDirPath + 'static/css/**',
                tasks: ['copy:police_translatorCss'],
            },
            police_translatorHtml: {
                files: [police_translatorDirPath + 'static/html/**'],
                tasks: ['copy:police_translatorHtml'],
            },
            police_translatorImg: {
                files: [police_translatorDirPath + 'static/images/**'],
                tasks: ['copy:police_translatorImg'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};