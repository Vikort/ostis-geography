riversComponent = {
    ext_lang: 'rivers_code',
    formats: ['format_rivers'],
    struct_support: true,
    concept_basin: 0,
    concept_river: 0,
    nrel_basin: 0,
    factory: function (sandbox) {
        return new riversWindow(sandbox);
    }
};

riversWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_rivers_text_component', 'ui_rivers_search_component', 'ui_rivers_answer_button',
        'ui_rivers_info_block', 'concept_basin', 'concept_river', 'nrel_basin'];
    const minbasin = '#rivers-' + sandbox.container + " #min-basin";
    const maxbasin = '#rivers-' + sandbox.container + " #max-basin";
    const answerButton = '#rivers-' + sandbox.container + " #answer-button1";
    const infoBlock = '#rivers-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="rivers-' + sandbox.container + '"></div>');

    $('#rivers-' + sandbox.container).load('static/components/html/rivers.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
            let minbasinValue = $(minbasin).val();
            let maxbasinValue = $(maxbasin).val();

            if (minbasinValue && maxbasinValue) {
                findriversBybasin(parseInt(minbasinValue), parseInt(maxbasinValue));
            }
        });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let searchComponentScAddr = keynodes['ui_rivers_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(answerButton).html(searchComponentText);
                $(answerButton).attr('sc_addr', searchComponentScAddr);
                riversComponent.concept_basin = keynodes['concept_basin'];
                riversComponent.concept_river = keynodes['concept_river'];
                riversComponent.nrel_basin = keynodes['nrel_basin'];
            });
        });
    }

    function findriversBybasin(minbasin, maxbasin) {
        window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
            riversComponent.concept_river,
            sc_type_arc_pos_const_perm,
            sc_type_node]).
            done(function (identifiers) {
                for (let i = 0; i < identifiers.length; ++i) {
                    let river = identifiers[i][2];
                    window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
                        identifiers[i][2],
                        sc_type_arc_common | sc_type_const,
                        sc_type_node,
                        sc_type_arc_pos_const_perm,
                        riversComponent.nrel_basin
                    ]).done(function (identifiers) {
                        SCWeb.core.Server.resolveIdentifiers([identifiers[0][2], river], function (keynodes) {
                            let basin = parseInt(keynodes[identifiers[0][2]]);

                            if (basin >= minbasin && basin <= maxbasin) {
                                document.getElementById("info").innerHTML += keynodes[river] + "<br/>";
                            }
                        });
                    });
                }
            });
    }
};

SCWeb.core.ComponentManager.appendComponentInitialize(riversComponent);
