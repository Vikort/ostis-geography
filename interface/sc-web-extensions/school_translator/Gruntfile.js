module.exports = function (grunt) {
    const school_translatorDirPath = './school_translator/';

    const scWebDirPath = '../../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            school_translator: {
                src: [school_translatorDirPath + 'src/*.js'],
                dest: school_translatorDirPath + 'static/js/school_translator.js'
            },
        },
        copy: {
            school_translatorJs: {
                cwd: school_translatorDirPath + 'static/js/',
                src: 'school_translator.js',
                dest: clientJsDirPath + 'school_translator/',
                expand: true,
                flatten: true
            },
            school_translatorCss: {
                cwd: school_translatorDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            school_translatorHtml: {
                cwd: school_translatorDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            school_translatorImg: {
                cwd: school_translatorDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'school_translator/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            school_translatorJs: {
                files: school_translatorDirPath + 'src/**',
                tasks: ['concat:school_translator', 'copy:school_translatorJs'],
            },
            school_translatorCss: {
                files: school_translatorDirPath + 'static/css/**',
                tasks: ['copy:school_translatorCss'],
            },
            school_translatorHtml: {
                files: [school_translatorDirPath + 'static/html/**'],
                tasks: ['copy:school_translatorHtml'],
            },
            school_translatorImg: {
                files: [school_translatorDirPath + 'static/images/**'],
                tasks: ['copy:school_translatorImg'],
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