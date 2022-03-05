ParksComponent = {
    ext_lang: 'parks_code',
    formats: ['format_parks'],
    struct_support: true,
    concept_square: 0,
    concept_park: 0,
    nrel_square: 0,
    factory: function (sandbox) {
        return new ParksWindow(sandbox);
    }
};

ParksWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_parks_text_component', 'ui_parks_search_component', 'ui_parks_answer_button',
    'ui_parks_info_block', 'concept_square', 'concept_park', 'nrel_square'];
    const minArea = '#parks-' + sandbox.container + " #min-area";
    const maxArea = '#parks-' + sandbox.container + " #max-area";
    const answerButton = '#parks-' + sandbox.container + " #answer-button1";
    const infoBlock = '#parks-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="parks-' + sandbox.container + '"></div>');

    $('#parks-' + sandbox.container).load('static/components/html/parks.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
            let minAreaValue = $(minArea).val();
            let maxAreaValue = $(maxArea).val();
            
            if (minAreaValue && maxAreaValue) {
                findParksByArea(parseInt(minAreaValue), parseInt(maxAreaValue));
            }
        });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let searchComponentScAddr = keynodes['ui_parks_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(answerButton).html(searchComponentText);
                $(answerButton).attr('sc_addr', searchComponentScAddr);
                ParksComponent.concept_square = keynodes['concept_square'];
                ParksComponent.concept_park = keynodes['concept_park'];
                ParksComponent.nrel_square = keynodes['nrel_square'];
            });
        });
    }

    function findParksByArea(minArea, maxArea) {
        window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
            ParksComponent.concept_park,
            sc_type_arc_pos_const_perm,
            sc_type_node]).
            done(function(identifiers) {
                for (let i = 0; i < identifiers.length; ++i) {
                    let park = identifiers[i][2];
                    window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
                        identifiers[i][2],
                        sc_type_arc_common | sc_type_const,
                        sc_type_node,
                        sc_type_arc_pos_const_perm,
                        ParksComponent.nrel_square
                    ]).done(function (identifiers) {
                        SCWeb.core.Server.resolveIdentifiers([identifiers[0][2], park], function (keynodes) {
                            let square = parseInt(keynodes[identifiers[0][2]]);

                            if (square >= minArea && square <= maxArea) {
                                document.getElementById("info").innerHTML += keynodes[park] + "<br/>";
                            }
                        });
                    });
                }
            });
    }
};

SCWeb.core.ComponentManager.appendComponentInitialize(ParksComponent);
