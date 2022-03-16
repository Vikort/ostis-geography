module.exports = function() {

    var kb = 'kb/ui_components/search_coffee_houses';
    var components = 'sc-web/components/search_coffee_houses/';
    var clientJsDirPath = '../../../../ostis-web-platform/sc-web/client/static/components/js/';
    var clientCssDirPath = '../../../../ostis-web-platform/sc-web/client/static/components/css/';
    var clientHtmlDirPath = '../../../../ostis-web-platform/sc-web/client/static/components/html/';
    var clientImgDirPath = '../../../../ostis-web-platform/sc-web/client/static/components/images/';

    return  {
        concat: {
            search_villages_by_district_component: {
                src: [
                    components + 'src/search_coffee_houses.js'],
                dest: clientJsDirPath + 'search_coffee_houses/search_coffee_houses.js'
            }
        },
        copy: {
            search_villages_by_district_component_IMG: {
                cwd: components + 'static/components/images/',
                src: ['*'],
                dest: clientImgDirPath + 'search_coffee_houses/',
                expand: true,
                flatten: true
            },
            search_villages_by_district_component_CSS: {
                cwd: components + 'static/components/css/',
                src: ['search_coffee_houses.css'],
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            search_villages_by_district_component_HTML: {
                cwd: components + 'static/components/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            kb: {
                cwd: kb,
                src: ['*'],
                dest: '../../../../kb/ui_components/search_coffee_houses/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            search_villages_by_district_component: {
                files: components + 'src/**',
                tasks: ['concat:search_coffee_houses']
            },
            search_villages_by_district_component_IMG: {
                files: [components + 'static/components/images/**'],
                tasks: ['copy:search_coffee_houses_IMG']
            },
            search_villages_by_district_component_CSS: {
                files: [components + 'static/components/css/**'],
                tasks: ['copy:search_coffee_houses_CSS']
            },
            search_villages_by_district_component_HTML: {
                files: [components + 'static/components/html/**',],
                tasks: ['copy:search_coffee_houses_HTML']
            },
            copyKB: {
                files: [kb + '**',],
                tasks: ['copy:kb']
            }
        },
        exec: {
          updateCssAndJs: 'sh add-css-and-js.sh'
        }
    }
};

