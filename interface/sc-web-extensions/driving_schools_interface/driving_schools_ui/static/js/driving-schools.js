var drivingSchoolsSection = {};

function extend(child, parent) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}

drivingSchoolsSection.DrawComponent = {
    ext_lang: 'driving_schools_section',
    formats: ['driving_schools_json'],
    struct_support: true,
    factory: function(sandbox) {
        return new drivingSchoolsSection.DrawWindow(sandbox);
    }
};

drivingSchoolsSection.DrawWindow = function(sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new drivingSchoolsSection.PaintPanel(this.sandbox.container);
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
SCWeb.core.ComponentManager.appendComponentInitialize(drivingSchoolsSection.DrawComponent);

drivingSchoolsSection.PaintPanel = function(containerId) {
    this.containerId = containerId;
};

drivingSchoolsSection.PaintPanel.prototype = {

    init: function() {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function(containerId) {
        var container = $('#' + containerId);

        var self = this;
        container.append('<label for="introduction" id="interface"><u><h2>Добро пожаловать в систему посвященному автошколам РБ</h2></u></label>');
        container.append('<label for="driving_schools" id="driving_schools"><b><a href="https://ru.wikipedia.org/wiki/Автошкола" target="_blank">Автошкола</a><b></label>');

        container.append('<button id="about-driving_schools" type="button">Что такое автошкола?</button>');
        $('#about-driving_schools').click(function() {
            self._drivingSchools();
        });


        container.append('<button id="find_driving_schools_by_city" type="button">Найти автошколы по конкретному городу</button>');
        $('#find_driving_schools_by_city').click(function() {
            self._findDrivingSchoolsByCity();
        });

        container.append('<button id="find_driving_schools_by_district" type="button">Найти автошколы для указанного района</button>');
        $('#find_driving_schools_by_district').click(function() {
            self._findDrivingSchoolsByDistrict();
        });
		
		container.append('<button id="find_driving_schools_by_region" type="button">Найти автошколы для указанной области</button>');
        $('#find_driving_schools_by_region').click(function() {
            self._findDrivingSchoolsByRegion();
        });

        container.append('<button id="find_driving_schools_by_street" type="button">Найти автошколы на указанной улице</button>');
        $('#find_driving_schools_by_street').click(function() {
            self._findDrivingSchoolsByStreet();
        });

        container.append('<button id="find_driving_schools_by_failure_rate" type="button">Найти автошколы по проценту несдачи</button>');
        $('#find_driving_schools_by_failure_rate').click(function() {
            self._findDrivingSchoolsByFailureRate();
        });
		
		container.append('<button id="find_driving_schools_by_rating" type="button">Найти автошколы по рейтингу</button>');
        $('#find_driving_schools_by_rating').click(function() {
            self._findDrivingSchoolsByRating();
        });

    },

    _findDrivingSchoolsByCity: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_get_driving_schools_by_city"],
                function(data) {
                    var cmd = data["ui_menu_get_driving_schools_by_city"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    _findDrivingSchoolsByDistrict: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_get_driving_schools_by_district"],
                function(data) {
                    var cmd = data["ui_menu_get_driving_schools_by_district"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findDrivingSchoolsByRegion: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_get_driving_schools_by_region"],
                function(data) {
                    var cmd = data["ui_menu_get_driving_schools_by_region"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findDrivingSchoolsByStreet: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_get_driving_schools_by_street"],
                function(data) {
                    var cmd = data["ui_menu_get_driving_schools_by_street"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    _findDrivingSchoolsByRating: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_get_driving_schools_by_rating"],
                function(data) {
                    var cmd = data["ui_menu_get_driving_schools_by_rating"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },
	
	_findDrivingSchoolsByFailureRate: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_get_driving_schools_by_failure_rate"],
                function(data) {
                    var cmd = data["ui_menu_get_driving_schools_by_failure_rate"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },


    _drivingSchools: function() {
        var addr;
        SCWeb.core.Server.resolveScAddr(['concept_driving_school'], function(keynodes) {
            addr = keynodes['concept_driving_school'];
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