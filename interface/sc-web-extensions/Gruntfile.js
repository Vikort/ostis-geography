module.exports = function (grunt) {
    const museumsDirPath = './museums/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            museums: {
                src: [museumsDirPath + 'src/*.js'],
                dest: museumsDirPath + 'static/js/museums.js'
            },
        },
        copy: {
            museumsJs: {
                cwd: museumsDirPath + 'static/js/',
                src: 'museums.js',
                dest: clientJsDirPath + 'museums/',
                expand: true,
                flatten: true
            },
            museumsCss: {
                cwd: museumsDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            museumsHtml: {
                cwd: museumsDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            museumsImg: {
                cwd: museumsDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'museums/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            museumsJs: {
                files: museumsDirPath + 'src/**',
                tasks: ['concat:museums', 'copy:museumsJs'],
            },
            museumsCss: {
                files: museumsDirPath + 'static/css/**',
                tasks: ['copy:museumsCss'],
            },
            museumsHtml: {
                files: [museumsDirPath + 'static/html/**'],
                tasks: ['copy:museumsHtml'],
            },
            museumsImg: {
                files: [museumsDirPath + 'static/images/**'],
                tasks: ['copy:museumsImg'],
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
