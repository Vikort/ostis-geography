SearchVillagesBySelsovietComponent = {
    ext_lang: 'search_villages_by_selsoviet_code',
    formats: ['format_search_villages_by_selsoviet_json'],
    struct_support: true,

    factory: function (sandbox) {
        return new setSearchVillagesBySelsovietViewerWindow(sandbox);
    }
};

var setSearchVillagesBySelsovietViewerWindow = function (sandbox) {

    var self = this;
    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    var inputSeasons = '#series-tools-' + sandbox.container + " #series_selsoviet-input"

    var buttonFind = '#series-tools-' + sandbox.container + " #button-find-series";

    var keynodes = ['ui_search_villages_by_selsoviet_in_memory'];

    $('#' + sandbox.container).prepend('<div class="inputBox" id="series-tools-' + sandbox.container + '"></div>');
    $('#series-tools-' + sandbox.container).load('static/components/html/search_villages_by_selsoviet_component.html', function () {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonSearch = idf[keynodes['ui_search_villages_by_selsoviet_in_memory']];

                $(buttonFind).html(buttonSearch);
                $(buttonFind).click(function () {
                    var selsovietString = $(inputSeasons).val();

                    console.log("Villages find selsoviet string" + selsovietString);

                    if (selsovietString) {
                        var searchParams = {
                            Selsoviet: selsovietString.toString()
                        };

                        findVillages(searchParams);
                    }
                });
            });
        });
    });

    this.applyTranslation = function (namesMap) {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonLoad = idf[keynodes['ui_search_villages_by_selsoviet_in_memory']];

                $(buttonFind).html(buttonLoad);
            });
        });
    };
    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(SearchVillagesBySelsovietComponent);

function findVillages(searchParams) {
    console.log(searchParams);
    
    SCWeb.core.Server.resolveScAddr([searchParams.Selsoviet], function (keynodes) {
        addr1 = keynodes[searchParams.Selsoviet];
        console.log("addr1", addr1);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        SCWeb.core.Server.resolveScAddr(["ui_menu_get_villages_by_selsoviet"], function (data) {
            var cmd = data["ui_menu_get_villages_by_selsoviet"];
            console.log("cmd", cmd);
            SCWeb.core.Main.doCommand(cmd, [addr1], function (result) {
                if (result.question != undefined) {
                    consonle.log(result.question);
                    SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                }
            });
        });
    });
}
