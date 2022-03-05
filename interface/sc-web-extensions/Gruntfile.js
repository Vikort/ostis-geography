module.exports = function (grunt) {
    const parksDirPath = './parks/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            parks: {
                src: [parksDirPath + 'src/*.js'],
                dest: parksDirPath + 'static/js/parks.js'
            },
        },
        copy: {
            parksJs: {
                cwd: parksDirPath + 'static/js/',
                src: 'parks.js',
                dest: clientJsDirPath + 'parks/',
                expand: true,
                flatten: true
            },
            parksCss: {
                cwd: parksDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            parksHtml: {
                cwd: parksDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            parksImg: {
                cwd: parksDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'parks/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            parksJs: {
                files: parksDirPath + 'src/**',
                tasks: ['concat:parks', 'copy:parksJs'],
            },
            parksCss: {
                files: parksDirPath + 'static/css/**',
                tasks: ['copy:parksCss'],
            },
            parksHtml: {
                files: [parksDirPath + 'static/html/**'],
                tasks: ['copy:parksHtml'],
            },
            parksImg: {
                files: [parksDirPath + 'static/images/**'],
                tasks: ['copy:parksImg'],
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
