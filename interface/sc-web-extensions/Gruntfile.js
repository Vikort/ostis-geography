module.exports = function (grunt) {
    const riversDirPath = './rivers/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            rivers: {
                src: [riversDirPath + 'src/*.js'],
                dest: riversDirPath + 'static/js/rivers.js'
            },
        },
        copy: {
            riversJs: {
                cwd: riversDirPath + 'static/js/',
                src: 'rivers.js',
                dest: clientJsDirPath + 'rivers/',
                expand: true,
                flatten: true
            },
            riversCss: {
                cwd: riversDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            riversHtml: {
                cwd: riversDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            riversImg: {
                cwd: riversDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'rivers/',
                expand: true,
                flatten: true
            },
            riversKb: {
                cwd: riversDirPath + 'kb/',
                src: '*.scs',
                dest:  '../../kb/rivers/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            riversJs: {
                files: riversDirPath + 'src/**',
                tasks: ['concat:rivers', 'copy:riversJs'],
            },
            riversCss: {
                files: riversDirPath + 'static/css/**',
                tasks: ['copy:riversCss'],
            },
            riversHtml: {
                files: [riversDirPath + 'static/html/**'],
                tasks: ['copy:riversHtml'],
            },
            riversImg: {
                files: [riversDirPath + 'static/images/**'],
                tasks: ['copy:riversImg'],
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
