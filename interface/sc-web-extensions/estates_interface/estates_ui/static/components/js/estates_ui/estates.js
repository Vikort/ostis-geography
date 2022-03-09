var estatesSection = {};

function extend(child, parent) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}

estatesSection.DrawComponent = {
    ext_lang: 'estates_section',
    formats: ['estates_json'],
    struct_support: true,
    factory: function(sandbox) {
        return new estatesSection.DrawWindow(sandbox);
    }
};

estatesSection.DrawWindow = function(sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new estatesSection.PaintPanel(this.sandbox.container);
    this.paintPanel.init();
    this.recieveData = function(data) {
        console.log("in recieve data" + data);
    };

    var scElements = {};

    function drawAllElements() {
        var dfd = new jQuery.Deferred();
        // for (var addr in scElements) {
        jQuery.each(scElements, function(j, val) {
            var obj = scElements[j];
            if (!obj || obj.translated) return;
            // check if object is an arc
            if (obj.data.type & sc_type_arc_pos_const_perm) {
                var begin = obj.data.begin;
                var end = obj.data.end;
                // logic for component update should go here
            }

        });
        SCWeb.ui.Locker.hide();
        dfd.resolve();
        return dfd.promise();
    }

    // resolve keynodes
    var self = this;
    this.needUpdate = false;
    this.requestUpdate = function() {
        var updateVisual = function() {
            // check if object is an arc
            var dfd1 = drawAllElements();
            dfd1.done(function(r) {
                return;
            });


            /// @todo: Don't update if there are no new elements
            window.clearTimeout(self.structTimeout);
            delete self.structTimeout;
            if (self.needUpdate)
                self.requestUpdate();
            return dfd1.promise();
        };
        self.needUpdate = true;
        if (!self.structTimeout) {
            self.needUpdate = false;
            SCWeb.ui.Locker.show();
            self.structTimeout = window.setTimeout(updateVisual, 1000);
        }
    }

    this.eventStructUpdate = function(added, element, arc) {
        window.sctpClient.get_arc(arc).done(function(r) {
            var addr = r[1];
            window.sctpClient.get_element_type(addr).done(function(t) {
                var type = t;
                var obj = new Object();
                obj.data = new Object();
                obj.data.type = type;
                obj.data.addr = addr;
                if (type & sc_type_arc_mask) {
                    window.sctpClient.get_arc(addr).done(function(a) {
                        obj.data.begin = a[0];
                        obj.data.end = a[1];
                        scElements[addr] = obj;
                        self.requestUpdate();
                    });
                }
            });
        });
    };
    // delegate event handlers
    this.sandbox.eventDataAppend = $.proxy(this.receiveData, this);
    this.sandbox.eventStructUpdate = $.proxy(this.eventStructUpdate, this);
    this.sandbox.updateContent();
};
SCWeb.core.ComponentManager.appendComponentInitialize(estatesSection.DrawComponent);

estatesSection.PaintPanel = function(containerId) {
    this.containerId = containerId;
};

estatesSection.PaintPanel.prototype = {

    init: function() {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function(containerId) {
        var container = $('#' + containerId);

        var self = this;
        container.append('<label for="introduction" id="interface"><u><h2>Добро пожаловать в систему посвященную усадьбам РБ</h2></u></label>');
        container.append('<label for="estates" id="estates"><b><a href="https://ru.wikipedia.org/wiki/Усадьба" target="_blank">Усадьба</a><b></label>');

        container.append('<button id="about-estates" type="button">Что такое усадьба?</button>');
        $('#about-estates').click(function() {
            self._estates();
        });


        container.append('<button id="find_estates_by_city" type="button">Найти усадьбы по конкретному городу</button>');
        $('#find_estates_by_city').click(function() {
            self._findEstatesByCity();
        });

        container.append('<button id="find_estates_by_district" type="button">Найти усадьбы для указанного района</button>');
        $('#find_estates_by_district').click(function() {
            self._findEstatesByDistrict();
        });
		
		container.append('<button id="find_estates_by_region" type="button">Найти усадьбы для указанной области</button>');
        $('#find_estates_by_region').click(function() {
            self._findEstatesByRegion();
        });

        container.append('<button id="find_estates_by_layer" type="button">Найти усадьбы количеству этажей</button>');
        $('#find_estates_by_layer').click(function() {
            self._findEstatesByLayer();
        });

        container.append('<button id="find_estates_by_area" type="button">Найти усадьбы по площади</button>');
        $('#find_estates_by_area').click(function() {
            self._findEstatesByArea();
        });
		
		container.append('<button id="find_estates_by_price" type="button">Найти усадьбы по цене</button>');
        $('#find_estates_by_price').click(function() {
            self._findEstatesByPrice();
        });

    },

    _findEstatesByCity: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_search_estates_by_city"],
                function(data) {
                    var cmd = data["ui_menu_search_estates_by_city"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    _findEstatesByDistrict: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_search_estates_by_district"],
                function(data) {
                    var cmd = data["ui_menu_search_estates_by_district"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findEstatesByRegion: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_search_estates_by_region"],
                function(data) {
                    var cmd = data["ui_menu_search_estates_by_region"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findEstatesByLayer: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_search_estates_by_layer"],
                function(data) {
                    var cmd = data["ui_menu_search_estates_by_layer"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    _findEstatesByArea: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_search_estates_by_area"],
                function(data) {
                    var cmd = data["ui_menu_search_estates_by_area"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findEstatesByPrice: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_search_estates_by_price"],
                function(data) {
                    var cmd = data["ui_menu_search_estates_by_price"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },


    _estates: function() {
        var addr;
        SCWeb.core.Server.resolveScAddr(['concept_estates'], function(keynodes) {
            addr = keynodes['concept_estates'];
            SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
                function(data) {
                    var cmd = data["ui_menu_view_full_semantic_neighborhood"];
                    SCWeb.core.Main.doCommand(cmd, [addr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    /**/
    _findSubject: function(object) {
        var addr;
        SCWeb.core.Server.resolveScAddr([object], function(keynodes) {
            addr = keynodes[object];
            SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
                function(data) {
                    var cmd = data["ui_menu_view_full_semantic_neighborhood"];
                    SCWeb.core.Main.doCommand(cmd, [addr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    _findMainIdentifier: function() {
        console.log("inFind");
        var main_menu_addr, nrel_main_idtf_addr;
        SCWeb.core.Server.resolveScAddr(['ui_main_menu', 'nrel_main_idtf'], function(keynodes) {
            main_menu_addr = keynodes['ui_main_menu'];
            nrel_main_idtf_addr = keynodes['nrel_main_idtf'];
            console.log(main_menu_addr);
            console.log(nrel_main_idtf_addr);
            window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
                main_menu_addr,
                sc_type_arc_common | sc_type_const,
                sc_type_link,
                sc_type_arc_pos_const_perm,
                nrel_main_idtf_addr
            ]).
            done(function(identifiers) {
                window.sctpClient.get_link_content(identifiers[0][2], 'string').done(function(content) {
                    alert('Главный идентификатор: ' + content);
                });
            });
        });
    },

    _generateNodes: function() {
        var main_menu_addr, nrel_main_idtf_addr, lang_en_addr;
        SCWeb.core.Server.resolveScAddr(['ui_main_menu', 'lang_en', 'nrel_main_idtf'], function(keynodes) {
            main_menu_addr = keynodes['ui_main_menu'];
            nrel_main_idtf_addr = keynodes['nrel_main_idtf'];
            lang_en_addr = keynodes['lang_en'];

            window.sctpClient.create_link().done(function(generatedLink) {
                window.sctpClient.set_link_content(generatedLink, 'Main menu');
                window.sctpClient.create_arc(sc_type_arc_common | sc_type_const, main_menu_addr, generatedLink).done(function(generatedCommonArc) {
                    window.sctpClient.create_arc(sc_type_arc_pos_const_perm, nrel_main_idtf_addr, generatedCommonArc);
                });
                window.sctpClient.create_arc(sc_type_arc_pos_const_perm, lang_en_addr, generatedLink);
            });
            $('#generateNodes').attr("sc_addr", main_menu_addr);
            SCWeb.core.Server.resolveScAddr(["ui_menu_view_full_semantic_neighborhood"],
                function(data) {
                    var cmd = data["ui_menu_view_full_semantic_neighborhood"];
                    SCWeb.core.Main.doCommand(cmd, [main_menu_addr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    }
};