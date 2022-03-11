CountAverageBooksComponent = {
    ext_lang: 'count_average_books_code',
    formats: ['format_count_average_books_json'],
    struct_support: true,

    factory: function (sandbox) {
        return new setCountAverageBooksViewerWindow(sandbox);
    }
};

var setCountAverageBooksViewerWindow = function (sandbox) {

    var self = this;
    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    var inputSeasons = '#series-tools-' + sandbox.container + " #series_district-input"

    var buttonFind = '#series-tools-' + sandbox.container + " #button-find-series-district";
    var buttonGetLibrary = '#series-tools-' + sandbox.container + " #get-library";
    var buttonCloseTime = '#series-tools-' + sandbox.container + " #close-time";
    var buttonCityModule = '#series-tools-' + sandbox.container + " #city-module";
    var buttonYear = '#series-tools-' + sandbox.container + " #year";
    var buttonType = '#series-tools-' + sandbox.container + " #type";
    var keynodes = ['ui_count_average_books_in_memory'];

    $('#' + sandbox.container).prepend('<div class="inputBox" id="series-tools-' + sandbox.container + '"></div>');
    $('#series-tools-' + sandbox.container).load('static/components/html/count_average_books_component.html', function () {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (idf) {
                $(buttonFind).click(function () {
                    var districtString = $(inputSeasons).val();
                    if (districtString) {
                        var searchParams = {
                            District: districtString.toString()
                        };
                        findVillages(searchParams);
                    }
                });
                $(buttonGetLibrary).click(function () {
                    var districtString = $(inputSeasons).val();
                    if (districtString) {
                        var searchParams = {
                            District: districtString.toString()
                        };
                        
                        getLibrary(searchParams);
                    }
                });

                $(buttonCloseTime).click(function () {
                    var districtString = $(inputSeasons).val();
                    if (districtString) {
                        var searchParams = {
                            District: districtString.toString().split(',')[0],
                            Time: districtString.toString().split(',')[1]
                        };
                        closeTime(searchParams);
                    }
                });
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

SCWeb.core.ComponentManager.appendComponentInitialize(CountAverageBooksComponent);

function findVillages(searchParams) {
    console.log(searchParams);
    
    SCWeb.core.Server.resolveScAddr([searchParams.District], function (keynodes) {
        addr1 = keynodes[searchParams.District];
        console.log("addr1", addr1);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        SCWeb.core.Server.resolveScAddr(["ui_menu_get_average_books_count"], function (data) {
            var cmd = data["ui_menu_get_average_books_count"];
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

function getLibrary(searchParams) {
    console.log(searchParams);

    SCWeb.core.Server.resolveScAddr([searchParams.District], function (keynodes) {
        addr1 = keynodes[searchParams.District];
        console.log("addr1", addr1);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        SCWeb.core.Server.resolveScAddr(["ui_menu_get_library"], function (data) {
            var cmd = data["ui_menu_get_library"];
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

function closeTime(searchParams) {
    console.log(searchParams);

    SCWeb.core.Server.resolveScAddr([searchParams.District, searchParams.Time], function (keynodes) {
        addr1 = keynodes[searchParams.District];
        addr2 = keynodes[searchParams.Time];
        console.log("addr1", addr1);
        console.log("addr2", addr2);
        console.log("arguments", SCWeb.core.Arguments._arguments);
        SCWeb.core.Server.resolveScAddr(["ui_menu_find_by_sity_and_open_time"], function (data) {
            var cmd = data["ui_menu_find_by_sity_and_open_time"];
            console.log("cmd", cmd);
            SCWeb.core.Main.doCommand(cmd, [addr1, addr2], function (result) {
                if (result.question != undefined) {
                    consonle.log(result.question);
                    SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                }
            });
        });
    });
}

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
