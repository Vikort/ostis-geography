module.exports = function (grunt) {
    const villagesDirPath = './villages/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            villages: {
                src: [villagesDirPath + 'src/*.js'],
                dest: villagesDirPath + 'static/js/villages.js'
            },
        },
        copy: {
            villagesJs: {
                cwd: villagesDirPath + 'static/js/',
                src: 'villages.js',
                dest: clientJsDirPath + 'villages/',
                expand: true,
                flatten: true
            },
            villagesCss: {
                cwd: villagesDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            villagesHtml: {
                cwd: villagesDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            villagesImg: {
                cwd: villagesDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'villages/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            villagesJs: {
                files: villagesDirPath + 'src/**',
                tasks: ['concat:villages', 'copy:villagesJs'],
            },
            villagesCss: {
                files: villagesDirPath + 'static/css/**',
                tasks: ['copy:villagesCss'],
            },
            villagesHtml: {
                files: [villagesDirPath + 'static/html/**'],
                tasks: ['copy:villagesHtml'],
            },
            villagesImg: {
                files: [villagesDirPath + 'static/images/**'],
                tasks: ['copy:villagesImg'],
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
