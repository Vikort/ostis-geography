module.exports = function (grunt) {
    const chainStoreDirPath = './chain-store/';

    const scWebDirPath = '../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            chainStore: {
                src: [chainStoreDirPath + 'src/*.js'],
                dest: chainStoreDirPath + 'static/js/chain-store.js'
            },
        },
        copy: {
            chainStoreJs: {
                cwd: chainStoreDirPath + 'static/js/',
                src: 'chain-store.js',
                dest: clientJsDirPath + 'chain-store/',
                expand: true,
                flatten: true
            },
            chainStoreCss: {
                cwd: chainStoreDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            chainStoreHtml: {
                cwd: chainStoreDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            chainStoreImg: {
                cwd: chainStoreDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'chain-store/',
                expand: true,
                flatten: true
            },
            chainStoreKb: {
                cwd: chainStoreDirPath + 'kb/',
                src: '*.scs',
                dest: "../../kb/" + 'chain-store/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            chainStoreJs: {
                files: chainStoreDirPath + 'src/**',
                tasks: ['concat:chain-store', 'copy:chainStoreJs'],
            },
            chainStoreCss: {
                files: chainStoreDirPath + 'static/css/**',
                tasks: ['copy:chainStoreCss'],
            },
            chainStoreHtml: {
                files: [chainStoreDirPath + 'static/html/**'],
                tasks: ['copy:chainStoreHtml'],
            },
            chainStoreImg: {
                files: [chainStoreDirPath + 'static/images/**'],
                tasks: ['copy:chainStoreImg'],
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
