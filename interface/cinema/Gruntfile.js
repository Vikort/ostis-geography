module.exports = function (grunt) {
    const cinemaDirPath = './cinema/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            cinema: {
                src: [cinemaDirPath + 'src/*.js'],
                dest: cinemaDirPath + 'static/js/cinema.js'
            },
        },
        copy: {
            cinemaJs: {
                cwd: cinemaDirPath + 'static/js/',
                src: 'cinema.js',
                dest: clientJsDirPath + 'cinema/',
                expand: true,
                flatten: true
            },
            cinemaCss: {
                cwd: cinemaDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            cinemaHtml: {
                cwd: cinemaDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            cinemaImg: {
                cwd: cinemaDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'cinema/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            cinemaJs: {
                files: cinemaDirPath + 'src/**',
                tasks: ['concat:cinema', 'copy:cinemaJs'],
            },
            cinemaCss: {
                files: cinemaDirPath + 'static/css/**',
                tasks: ['copy:cinemaCss'],
            },
            cinemaHtml: {
                files: [cinemaDirPath + 'static/html/**'],
                tasks: ['copy:cinemaHtml'],
            },
            cinemaImg: {
                files: [cinemaDirPath + 'static/images/**'],
                tasks: ['copy:cinemaImg'],
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
