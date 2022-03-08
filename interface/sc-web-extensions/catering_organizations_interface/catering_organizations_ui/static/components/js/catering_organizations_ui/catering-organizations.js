var cateringOrganizationsSection = {};

function extend(child, parent) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}

cateringOrganizationsSection.DrawComponent = {
    ext_lang: 'catering_organizations_section',
    formats: ['catering_organizations_json'],
    struct_support: true,
    factory: function(sandbox) {
        return new cateringOrganizationsSection.DrawWindow(sandbox);
    }
};

cateringOrganizationsSection.DrawWindow = function(sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new cateringOrganizationsSection.PaintPanel(this.sandbox.container);
    this.paintPanel.init();
    this.recieveData = function(data) {
        console.log("in recieve data" + data);
    };

    var scElements = {};

    function drawAllElements() {
        var dfd = new jQuery.Deferred();
        jQuery.each(scElements, function(j, val) {
            var obj = scElements[j];
            if (!obj || obj.translated) return;
            if (obj.data.type & sc_type_arc_pos_const_perm) {
                var begin = obj.data.begin;
                var end = obj.data.end;
            }

        });
        SCWeb.ui.Locker.hide();
        dfd.resolve();
        return dfd.promise();
    }

    var self = this;
    this.needUpdate = false;
    this.requestUpdate = function() {
        var updateVisual = function() {
            var dfd1 = drawAllElements();
            dfd1.done(function(r) {
                return;
            });


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
    this.sandbox.eventDataAppend = $.proxy(this.receiveData, this);
    this.sandbox.eventStructUpdate = $.proxy(this.eventStructUpdate, this);
    this.sandbox.updateContent();
};
SCWeb.core.ComponentManager.appendComponentInitialize(cateringOrganizationsSection.DrawComponent);

cateringOrganizationsSection.PaintPanel = function(containerId) {
    this.containerId = containerId;
};

cateringOrganizationsSection.PaintPanel.prototype = {

    init: function() {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function(containerId) {
        var container = $('#' + containerId);

        var self = this;
        container.append('<label for="introduction" id="interface"><u><h2>Добро пожаловать в систему, посвященную организациям общественного питания</h2></u></label>');
        container.append('<label for="catering_organizations" id="catering_organizations"><b><a href="https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%B5%D0%B4%D0%BF%D1%80%D0%B8%D1%8F%D1%82%D0%B8%D0%B5_%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE%D0%B3%D0%BE_%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F" target="_blank">Организация общественного питания</a><b></label>');

        container.append('<button id="about-catering_organizations" type="button">Что такое организация общественного питания?</button>');
        $('#about-catering_organizations').click(function() {
            self._cateringOrganizations();
        });


        container.append('<button id="find_catering_organizations_by_day_of_week" type="button">Найти организации общественного питания по дню недели, в который они работают</button>');
        $('#find_catering_organizations_by_day_of_week').click(function() {
            self._findСateringOrganizationsByDayOfWeek();
        });

        container.append('<button id="find_catering_organizations_by_working_hours" type="button">Найти организации общественного питания по часам работы</button>');
        $('#find_catering_organizations_by_working_hours').click(function() {
            self._findСateringOrganizationsByWorkingHours();
        });
		
		container.append('<button id="find_catering_organizations_by_rate" type="button">Найти организации общественного питания по рейтингу</button>');
        $('#find_catering_organizations_by_rate').click(function() {
            self._findСateringOrganizationsByRate();
        });
		
		container.append('<button id="find_catering_organizations_by_cuisine" type="button">Найти организации общественного питания по предлагаемой кухне</button>');
        $('#find_catering_organizations_by_cuisine').click(function() {
            self._findСateringOrganizationsByCuisine();
        });
		
		container.append('<button id="find_catering_organizations_by_open_year" type="button">Найти организации общественного питания по году открытия заведения</button>');
        $('#find_catering_organizations_by_open_year').click(function() {
            self._findСateringOrganizationsByOpenYear();
        });
		
		container.append('<button id="find_catering_organizations_by_price_category" type="button">Найти организации общественного питания по ценовой категории заведения</button>');
        $('#find_catering_organizations_by_price_category').click(function() {
            self._findСateringOrganizationsByPriceCategory();
        });

    },

    _findСateringOrganizationsByDayOfWeek: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_catering_organization_by_day_of_week"],
                function(data) {
                    var cmd = data["ui_menu_find_catering_organization_by_day_of_week"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    _findСateringOrganizationsByWorkingHours: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_catering_organization_by_working_hours"],
                function(data) {
                    var cmd = data["ui_menu_find_catering_organization_by_working_hours"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findСateringOrganizationsByRate: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_catering_organization_by_rate"],
                function(data) {
                    var cmd = data["ui_menu_find_catering_organization_by_rate"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findСateringOrganizationsByCuisine: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_catering_organization_by_cuisine"],
                function(data) {
                    var cmd = data["ui_menu_find_catering_organization_by_cuisine"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findСateringOrganizationsByOpenYear: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_catering_organization_by_open_year"],
                function(data) {
                    var cmd = data["ui_menu_find_catering_organization_by_open_year"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findСateringOrganizationsByPriceCategory: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_catering_organization_by_price_category"],
                function(data) {
                    var cmd = data["ui_menu_find_catering_organization_by_price_category"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    _cateringOrganizations: function() {
        var addr;
        SCWeb.core.Server.resolveScAddr(['concept_catering_organization'], function(keynodes) {
            addr = keynodes['concept_catering_organization'];
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
