SearchVillagesByDistrictComponent = {
    ext_lang: 'search_villages_by_district_code',
    formats: ['format_search_villages_by_district_json'],
    struct_support: true,

    factory: function (sandbox) {
        return new setSearchVillagesByDistrictViewerWindow(sandbox);
    }
};

var setSearchVillagesByDistrictViewerWindow = function (sandbox) {

    var self = this;
    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    var inputSeasons = '#series-tools-' + sandbox.container + " #series_district-input"

    var buttonCityModule = '#series-tools-' + sandbox.container + " #city-module";
    var buttonYear = '#series-tools-' + sandbox.container + " #year";
    var buttonType = '#series-tools-' + sandbox.container + " #type";
    var keynodes = ['ui_search_villages_by_district_in_memory'];

    $('#' + sandbox.container).prepend('<div class="inputBox" id="series-tools-' + sandbox.container + '"></div>');
    $('#series-tools-' + sandbox.container).load('static/components/html/search_coffee_houses.html', function () {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                $(buttonCityModule).click(function () {
                    var districtString = $(inputSeasons).val();

                    if (districtString) {
                        var searchParams = {
                            District: districtString.toString()
                        };

                        cityModule(searchParams);
                    }
                });
                $(buttonYear).click(function () {
                    var districtString = $(inputSeasons).val();

                    if (districtString) {
                        var searchParams = {
                            District: districtString.toString()
                        };
                        year(searchParams);
                    }
                });
                $(buttonType).click(function () {
                    var districtString = $(inputSeasons).val();

                    if (districtString) {
                        var searchParams = {
                            District: districtString.toString()
                        };
                        type(searchParams);
                    }
                });
            });
        });
    });


    this.applyTranslation = function (namesMap) {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                var buttonLoad = idf[keynodes['ui_count_average_books_in_memory']];

                $(buttonFind).html(buttonLoad);
            });
        });
    };
    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

function cityModule(searchParams) {
    console.log(searchParams);

    SCWeb.core.Server.resolveScAddr([searchParams.District], function (keynodes) {
        addr1 = keynodes[searchParams.District];
        console.log("addr1", addr1);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        SCWeb.core.Server.resolveScAddr(["ui_menu_get_city"], function (data) {
            var cmd = data["ui_menu_get_city"];
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

function year(searchParams) {
    console.log(searchParams);

    SCWeb.core.Server.resolveScAddr([searchParams.District], function (keynodes) {
        addr1 = keynodes[searchParams.District];
        console.log("addr1", addr1);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        SCWeb.core.Server.resolveScAddr(["ui_menu_get_foundation_year"], function (data) {
            var cmd = data["ui_menu_get_foundation_year"];
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

function type(searchParams) {
    console.log(searchParams);

    SCWeb.core.Server.resolveScAddr([searchParams.District], function (keynodes) {
        addr1 = keynodes[searchParams.District];
        console.log("addr1", addr1);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        SCWeb.core.Server.resolveScAddr(["ui_menu_get_type"], function (data) {
            var cmd = data["ui_menu_get_type"];
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
