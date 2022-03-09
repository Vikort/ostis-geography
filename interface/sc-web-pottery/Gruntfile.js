module.exports = function (grunt) {
    const potteryDirPath = './pottery/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            pottery: {
                src: [potteryDirPath + 'src/*.js'],
                dest: potteryDirPath + 'static/js/pottery.js'
            },
        },
        copy: {
            potteryJs: {
                cwd: potteryDirPath + 'static/js/',
                src: 'pottery.js',
                dest: clientJsDirPath + 'pottery/',
                expand: true,
                flatten: true
            },
            potterysCss: {
                cwd: potteryDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            potteryHtml: {
                cwd: potteryDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            potteryImg: {
                cwd: potteryDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'pottery/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            potteryJs: {
                files: potteryDirPath + 'src/**',
                tasks: ['concat:pottery', 'copy:potteryJs'],
            },
            potteryCss: {
                files: potteryDirPath + 'static/css/**',
                tasks: ['copy:potteryCss'],
            },
            potteryHtml: {
                files: [potteryDirPath + 'static/html/**'],
                tasks: ['copy:potteryHtml'],
            },
            potteryImg: {
                files: [potteryDirPath + 'static/images/**'],
                tasks: ['copy:potteryImg'],
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
