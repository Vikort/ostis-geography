module.exports = function (grunt) {
    const theaterDirPath = './theater/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            theater: {
                src: [theaterDirPath + 'src/*.js'],
                dest: theaterDirPath + 'static/js/theater.js'
            },
        },
        copy: {
            theaterJs: {
                cwd: theaterDirPath + 'static/js/',
                src: 'theater.js',
                dest: clientJsDirPath + 'theater/',
                expand: true,
                flatten: true
            },
            theaterCss: {
                cwd: theaterDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            theaterHtml: {
                cwd: theaterDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            theaterImg: {
                cwd: theaterDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'theater/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            theaterJs: {
                files: theaterDirPath + 'src/**',
                tasks: ['concat:theater', 'copy:theaterJs'],
            },
            theaterCss: {
                files: theaterDirPath + 'static/css/**',
                tasks: ['copy:theaterCss'],
            },
            theaterHtml: {
                files: [theaterDirPath + 'static/html/**'],
                tasks: ['copy:theaterHtml'],
            },
            theaterImg: {
                files: [theaterDirPath + 'static/images/**'],
                tasks: ['copy:theaterImg'],
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
