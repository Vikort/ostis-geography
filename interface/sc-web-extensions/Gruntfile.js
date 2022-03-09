module.exports = function (grunt) {
    const administrationDirPath = './administration/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            administration: {
                src: [administrationDirPath + 'src/*.js'],
                dest: administrationDirPath + 'static/js/administration.js'
            },
        },
        copy: {
            administrationJs: {
                cwd: administrationDirPath + 'static/js/',
                src: 'administration.js',
                dest: clientJsDirPath + 'administration/',
                expand: true,
                flatten: true
            },
            administrationCss: {
                cwd: administrationDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            administrationHtml: {
                cwd: administrationDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            administrationImg: {
                cwd: administrationDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'trash/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            administrationJs: {
                files: administrationDirPath + 'src/**',
                tasks: ['concat:administration', 'copy:administrationJs'],
            },
            administrationCss: {
                files: administrationDirPath + 'static/css/**',
                tasks: ['copy:administrationCss'],
            },
            administrationHtml: {
                files: [administrationDirPath + 'static/html/**'],
                tasks: ['copy:administrationHtml'],
            },
            administrationImg: {
                files: [administrationDirPath + 'static/images/**'],
                tasks: ['copy:administrationImg'],
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
