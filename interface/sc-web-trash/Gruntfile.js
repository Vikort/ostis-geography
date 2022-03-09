module.exports = function (grunt) {
    const trashDirPath = './trash/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            trash: {
                src: [trashDirPath + 'src/*.js'],
                dest: trashDirPath + 'static/js/trash.js'
            },
        },
        copy: {
            trashJs: {
                cwd: trashDirPath + 'static/js/',
                src: 'trash.js',
                dest: clientJsDirPath + 'trash/',
                expand: true,
                flatten: true
            },
            trashCss: {
                cwd: trashDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            trashHtml: {
                cwd: trashDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            trashImg: {
                cwd: trashDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'trash/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            trashJs: {
                files: trashDirPath + 'src/**',
                tasks: ['concat:trash', 'copy:trashJs'],
            },
            trashCss: {
                files: trashDirPath + 'static/css/**',
                tasks: ['copy:trashCss'],
            },
            trashHtml: {
                files: [trashDirPath + 'static/html/**'],
                tasks: ['copy:trashHtml'],
            },
            trashImg: {
                files: [trashDirPath + 'static/images/**'],
                tasks: ['copy:trashImg'],
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
