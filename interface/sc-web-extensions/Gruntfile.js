module.exports = function (grunt) {
    const wayDirPath = './way/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            way: {
                src: [wayDirPath + 'src/*.js'],
                dest: wayDirPath + 'static/js/way.js'
            },
        },
        copy: {
            wayJs: {
                cwd: wayDirPath + 'static/js/',
                src: 'way.js',
                dest: clientJsDirPath + 'way/',
                expand: true,
                flatten: true
            },
            wayCss: {
                cwd: wayDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            wayHtml: {
                cwd: wayDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            wayImg: {
                cwd: wayDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'way/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            wayJs: {
                files: wayDirPath + 'src/**',
                tasks: ['concat:way', 'copy:wayJs'],
            },
            wayCss: {
                files: wayDirPath + 'static/css/**',
                tasks: ['copy:wayCss'],
            },
            wayHtml: {
                files: [wayDirPath + 'static/html/**'],
                tasks: ['copy:wayHtml'],
            },
            wayImg: {
                files: [wayDirPath + 'static/images/**'],
                tasks: ['copy:wayImg'],
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
