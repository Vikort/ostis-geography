module.exports = function (grunt) {
    const companiesDirPath = './companies/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            companies: {
                src: [companiesDirPath + 'src/*.js'],
                dest: companiesDirPath + 'static/js/companies.js'
            },
        },
        copy: {
            companiesJs: {
                cwd: companiesDirPath + 'static/js/',
                src: 'companies.js',
                dest: clientJsDirPath + 'companies/',
                expand: true,
                flatten: true
            },
            companiesCss: {
                cwd: companiesDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            companiesHtml: {
                cwd: companiesDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            companiesImg: {
                cwd: companiesDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'companies/',
                expand: true,
                flatten: true
            },
            companiesKb: {
                cwd: companiesDirPath + 'kb/',
                src: '*.scs',
                dest: "../../kb/" + 'companies/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            companiesJs: {
                files: companiesDirPath + 'src/**',
                tasks: ['concat:companies', 'copy:companiesJs'],
            },
            companiesCss: {
                files: companiesDirPath + 'static/css/**',
                tasks: ['copy:companiesCss'],
            },
            companiesHtml: {
                files: [companiesDirPath + 'static/html/**'],
                tasks: ['copy:companiesHtml'],
            },
            companiesImg: {
                files: [companiesDirPath + 'static/images/**'],
                tasks: ['copy:companiesImg'],
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
