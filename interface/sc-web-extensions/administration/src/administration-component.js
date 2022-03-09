AdministrationComponent = {
    ext_lang: 'administration_code',
    formats: ['format_administration'],
    struct_support: true,
    concept_district: 0,
    search_area: 0,
    factory: function (sandbox) {
        return new AdministrationWindow(sandbox);
    }
};

AdministrationWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_administration_text_component', 'ui_administration_search_component', 'ui_administration_answer_button',
        'ui_administration_info_block', 'concept_district', 'nrel_search_area'];
    const search_area = '#administration-' + sandbox.container + " #search_area";
    const answerButton = '#administration-' + sandbox.container + " #answer-button1";
    const infoBlock = '#administration-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="administration-' + sandbox.container + '"></div>');

    $('#administration-' + sandbox.container).load('static/components/html/administration.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
            let search_area = $(search_area).val();

            if (search_area) {
                AdministrationByDistrict(search_area);
            }
        });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let searchComponentScAddr = keynodes['ui_administration_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(answerButton).html(searchComponentText);
                $(answerButton).attr('sc_addr', searchComponentScAddr);
                AdministrationComponent.concept_district = keynodes['concept_district'];
                AdministrationComponent.nrel_search_area = keynodes['nrel_search_area'];
            });
        });
    }

    function AdministrationByDistrict(search_area) {
        window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
            AdministrationComponent.concept_district,
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
                        AdministrationComponent.nrel_search_area
                    ]).done(function (identifiers) {
                        SCWeb.core.Server.resolveIdentifiers([identifiers[0][2], administration], function (keynodes) {
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

SCWeb.core.ComponentManager.appendComponentInitialize(AdministrationComponent);
