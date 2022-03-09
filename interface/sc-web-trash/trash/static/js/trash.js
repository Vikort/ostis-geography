TrashComponent = {
    ext_lang: 'trash_code',
    formats: ['format_trash'],
    struct_support: true,
    concept_district: 0,
    search_area: 0,
    factory: function (sandbox) {
        return new TrashWindow(sandbox);
    }
};

TrashWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_trash_text_component', 'ui_trash_search_component', 'ui_trash_answer_button',
        'ui_trash_info_block', 'concept_district', 'nrel_search_area'];
    const search_area = '#trash-' + sandbox.container + " #search_area";
    const answerButton = '#trash-' + sandbox.container + " #answer-button1";
    const infoBlock = '#trash-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="trash-' + sandbox.container + '"></div>');

    $('#trash-' + sandbox.container).load('static/components/html/trash.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
            let search_area = $(search_area).val();

            if (search_area) {
                TrashByRegion(search_area);
            }
        });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let searchComponentScAddr = keynodes['ui_trash_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(answerButton).html(searchComponentText);
                $(answerButton).attr('sc_addr', searchComponentScAddr);
                TrashComponent.concept_pottery_centre = keynodes['concept_district'];
                TrashComponent.nrel_technologies_used = keynodes['nrel_search_area'];
            });
        });
    }

    function TrashByRegion(search_area) {
        window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
            TrashComponent.concept_district,
            sc_type_arc_pos_const_perm,
            sc_type_node]).
            done(function (identifiers) {
                for (let i = 0; i < identifiers.length; ++i) {
                    let search_area = identifiers[i][2];
                    window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
                        identifiers[i][2],
                        sc_type_arc_common | sc_type_const,
                        sc_type_node,
                        sc_type_arc_pos_const_perm,
                        TrashComponent.nrel_search_area
                    ]).done(function (identifiers) {
                        SCWeb.core.Server.resolveIdentifiers([identifiers[0][2], pottery], function (keynodes) {
                            let search_area = keynodes[identifiers[0][2]];

                            if (search_area) {
                                document.getElementById("info").innerHTML += keynodes[search_area] + "<br/>";
                            }
                        });
                    });
                }
            });
    }
};

SCWeb.core.ComponentManager.appendComponentInitialize(TrashComponent);
