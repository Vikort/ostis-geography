SearchRegionByVillageComponent = {
    ext_lang: 'search_region_by_village_code',
    formats: ['format_search_region_by_village_json'],
    struct_support: true,

    factory: function (sandbox) {
        return new setSearchRegionByVillageViewerWindow(sandbox);
    }
};

var setSearchRegionByVillageViewerWindow = function (sandbox) {

    var self = this;
    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    var inputSeasons = '#series-tools-' + sandbox.container + " #series_village-input"

    var buttonFind = '#series-tools-' + sandbox.container + " #button-find-series-village";

    var keynodes = ['ui_search_region_by_village_in_memory'];

    $('#' + sandbox.container).prepend('<div class="inputBox" id="series-tools-' + sandbox.container + '"></div>');
    $('#series-tools-' + sandbox.container).load('static/components/html/search_region_by_village_component.html', function () {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonSearch = idf[keynodes['ui_search_region_by_village_in_memory']];

                $(buttonFind).html(buttonSearch);
                $(buttonFind).click(function () {
                    var VillageString = $(inputSeasons).val();

                    console.log("Region find Village string" + VillageString);

                    if (VillageString) {
                        var searchParams = {
                            Village: VillageString.toString()
                        };

                        findRegion(searchParams);
                    }
                });
            });
        });
    });

    this.applyTranslation = function (namesMap) {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonLoad = idf[keynodes['ui_search_region_by_village_in_memory']];

                $(buttonFind).html(buttonLoad);
            });
        });
    };
    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(SearchRegionByVillageComponent);

function findRegion(searchParams) {
    console.log(searchParams);
    
    SCWeb.core.Server.resolveScAddr([searchParams.Village], function (keynodes) {
        addr1 = keynodes[searchParams.Village];
        console.log("addr1", addr1);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        SCWeb.core.Server.resolveScAddr(["ui_menu_get_region_by_village"], function (data) {
            var cmd = data["ui_menu_get_region_by_village"];
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
