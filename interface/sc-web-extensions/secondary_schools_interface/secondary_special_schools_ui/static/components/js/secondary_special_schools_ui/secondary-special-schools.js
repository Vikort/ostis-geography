var secondarySpecialSchoolsSection = {};

function extend(child, parent) {
    var F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superclass = parent.prototype;
}

secondarySpecialSchoolsSection.DrawComponent = {
    ext_lang: 'secondary_special_schools_section',
    formats: ['secondary_special_schools_json'],
    struct_support: true,
    factory: function(sandbox) {
        return new secondarySpecialSchoolsSection.DrawWindow(sandbox);
    }
};

secondarySpecialSchoolsSection.DrawWindow = function(sandbox) {
    this.sandbox = sandbox;
    this.paintPanel = new secondarySpecialSchoolsSection.PaintPanel(this.sandbox.container);
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
SCWeb.core.ComponentManager.appendComponentInitialize(secondarySpecialSchoolsSection.DrawComponent);

secondarySpecialSchoolsSection.PaintPanel = function(containerId) {
    this.containerId = containerId;
};

secondarySpecialSchoolsSection.PaintPanel.prototype = {

    init: function() {
        this._initMarkup(this.containerId);
    },

    _initMarkup: function(containerId) {
        var container = $('#' + containerId);

        var self = this;
        container.append('<label for="introduction" id="interface"><u><h2>Добро пожаловать в систему посвященному среднему специальному учебному образованию</h2></u></label>');
        container.append('<label for="secondary_special_schools" id="secondary_special_schools"><b><a href="https://ru.wikipedia.org/wiki/%D0%A1%D1%80%D0%B5%D0%B4%D0%BD%D0%B5%D0%B5_%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5_%D1%83%D1%87%D0%B5%D0%B1%D0%BD%D0%BE%D0%B5_%D0%B7%D0%B0%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5" target="_blank">Среднее специальное учебное заведение</a><b></label>');

        container.append('<button id="about-secondary_special_schools" type="button">Что такое специально среднее учебное заведение?</button>');
        $('#about-secondary_special_schools').click(function() {
            self._secondarySpecialSchools();
        });


        container.append('<button id="find_secondary_special_schools_po_city" type="button">Найти учебные заведения по конкретному городу</button>');
        $('#find_secondary_special_schools_po_city').click(function() {
            self._findSecondarySpecialSchoolsPoSity();
        });

        container.append('<button id="find_secondary_special_schools_po_oblasti" type="button">Найти учебные заведения по области</button>');
        $('#find_secondary_special_schools_po_oblasti').click(function() {
            self._findSecondarySpecialSchoolsPoOblasti();
        });

        container.append('<button id="find_secondary_special_schools_po_open_year" type="button">Найти учебные заведения по году открытия</button>');
        $('#find_secondary_special_schools_po_open_year').click(function() {
            self._findSecondarySpecialSchoolsPoOpenYear();
        });

    },

    _findSecondarySpecialSchoolsPoSity: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_secondary_special_schools_po_city"],
                function(data) {
                    var cmd = data["ui_menu_find_secondary_special_schools_po_city"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },

    _findSecondarySpecialSchoolsPoOblasti: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_secondary_special_schools_po_oblasti"],
                function(data) {
                    var cmd = data["ui_menu_find_secondary_special_schools_po_oblasti"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },


    _findSecondarySpecialSchoolsPoOpenYear: function() {
        var argOneAddr;
        SCWeb.core.Server.resolveScAddr([SCWeb.core.Arguments._arguments[0]], function(keynodes) {
            console.log("key", keynodes);
            console.log("arguments", SCWeb.core.Arguments._arguments[0]);
            argOneAddr = SCWeb.core.Arguments._arguments[0];
            SCWeb.core.Server.resolveScAddr(["ui_menu_find_secondary_special_schools_po_open_year"],
                function(data) {
                    var cmd = data["ui_menu_find_secondary_special_schools_po_open_year"];
                    SCWeb.core.Main.doCommand(cmd, [argOneAddr], function(result) {
                        if (result.question != undefined) {
                            SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                        }
                    });
                });
        });
    },


    _secondarySpecialSchools: function() {
        var addr;
        SCWeb.core.Server.resolveScAddr(['concept_secondary_schools'], function(keynodes) {
            addr = keynodes['concept_secondary_schools'];
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