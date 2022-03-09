module.exports = function (grunt) {
    const itCompanyOfficeDirPath = './it-showroom/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            itShowroom: {
                src: [itCompanyOfficeDirPath + 'src/*.js'],
                dest: itCompanyOfficeDirPath + 'static/js/it-showroom.js'
            },
        },
        copy: {
            itShowroomJs: {
                cwd: itCompanyOfficeDirPath + 'static/js/',
                src: 'it-showroom.js',
                dest: clientJsDirPath + 'it-showroom/',
                expand: true,
                flatten: true
            },
            itShowroomCss: {
                cwd: itCompanyOfficeDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            itShowroomHtml: {
                cwd: itCompanyOfficeDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            itShowroomImg: {
                cwd: itCompanyOfficeDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'it-showroom/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            itShowroomJs: {
                files: itCompanyOfficeDirPath + 'src/**',
                tasks: ['concat:it-showroom', 'copy:itShowroomJs'],
            },
            itShowroomCss: {
                files: itCompanyOfficeDirPath + 'static/css/**',
                tasks: ['copy:itShowroomCss'],
            },
            itShowroomHtml: {
                files: [itCompanyOfficeDirPath + 'static/html/**'],
                tasks: ['copy:itShowroomHtml'],
            },
            itShowroomImg: {
                files: [itCompanyOfficeDirPath + 'static/images/**'],
                tasks: ['copy:itShowroomImg'],
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
