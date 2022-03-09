PotteryComponent = {
    ext_lang: 'pottery_code',
    formats: ['format_pottery'],
    struct_support: true,
    concept_pottery_centre: 0,
    technologies_used: 0,
    factory: function (sandbox) {
        return new PotteryWindow(sandbox);
    }
};

PotteryWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_pottery_text_component', 'ui_pottery_search_component', 'ui_pottery_answer_button',
        'ui_pottery_info_block', 'concept_pottery_centre', 'nrel_technologies_used'];
    const technologies = '#pottery-' + sandbox.container + " #technologies";
    const answerButton = '#pottery-' + sandbox.container + " #answer-button1";
    const infoBlock = '#pottery-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="pottery-' + sandbox.container + '"></div>');

    $('#pottery-' + sandbox.container).load('static/components/html/pottery.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
            let technologies = $(technologies).val();

            if (technologies) {
                PotteryByTech(technologies);
            }
        });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let searchComponentScAddr = keynodes['ui_pottery_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(answerButton).html(searchComponentText);
                $(answerButton).attr('sc_addr', searchComponentScAddr);
                PotteryComponent.concept_pottery_centre = keynodes['concept_pottery_centre'];
                PotteryComponent.nrel_technologies_used = keynodes['nrel_technologies_used'];
            });
        });
    }

    function PotteryByTech(technologies) {
        window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
            PotteryComponent.concept_pottery_centre,
            sc_type_arc_pos_const_perm,
            sc_type_node]).
            done(function (identifiers) {
                for (let i = 0; i < identifiers.length; ++i) {
                    let technologies = identifiers[i][2];
                    window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
                        identifiers[i][2],
                        sc_type_arc_common | sc_type_const,
                        sc_type_node,
                        sc_type_arc_pos_const_perm,
                        PotteryComponent.nrel_technologies_used
                    ]).done(function (identifiers) {
                        SCWeb.core.Server.resolveIdentifiers([identifiers[0][2], pottery], function (keynodes) {
                            let technologies = keynodes[identifiers[0][2]];

                            if (technologies) {
                                document.getElementById("info").innerHTML += keynodes[technologies] + "<br/>";
                            }
                        });
                    });
                }
            });
    }
};

SCWeb.core.ComponentManager.appendComponentInitialize(PotteryComponent);
