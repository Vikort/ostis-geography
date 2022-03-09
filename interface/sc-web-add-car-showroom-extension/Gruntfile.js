module.exports = function (grunt) {
    const carShowroomDirPath = './car-showroom/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            carShowroom: {
                src: [carShowroomDirPath + 'src/*.js'],
                dest: carShowroomDirPath + 'static/js/car-showroom.js'
            },
        },
        copy: {
            carShowroomJs: {
                cwd: carShowroomDirPath + 'static/js/',
                src: 'car-showroom.js',
                dest: clientJsDirPath + 'car-showroom/',
                expand: true,
                flatten: true
            },
            carShowroomCss: {
                cwd: carShowroomDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            carShowroomHtml: {
                cwd: carShowroomDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            carShowroomImg: {
                cwd: carShowroomDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'car-showroom/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            carShowroomJs: {
                files: carShowroomDirPath + 'src/**',
                tasks: ['concat:car-showroom', 'copy:carShowroomJs'],
            },
            carShowroomCss: {
                files: carShowroomDirPath + 'static/css/**',
                tasks: ['copy:carShowroomCss'],
            },
            carShowroomHtml: {
                files: [carShowroomDirPath + 'static/html/**'],
                tasks: ['copy:carShowroomHtml'],
            },
            carShowroomImg: {
                files: [carShowroomDirPath + 'static/images/**'],
                tasks: ['copy:carShowroomImg'],
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
