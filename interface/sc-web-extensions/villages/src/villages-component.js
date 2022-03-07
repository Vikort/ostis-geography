VillagesComponent = {
    ext_lang: 'villages_code',
    formats: ['format_villages'],
    struct_support: true,
    concept_population: 0,
    concept_village: 0,
    nrel_population: 0,
    factory: function (sandbox) {
        return new VillagesWindow(sandbox);
    }
};

VillagesWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_villages_text_component', 'ui_villages_search_component', 'ui_villages_answer_button',
        'ui_villages_info_block', 'concept_population', 'concept_village', 'nrel_population'];
    const minPopulation = '#villages-' + sandbox.container + " #min-population";
    const maxPopulation = '#villages-' + sandbox.container + " #max-population";
    const answerButton = '#villages-' + sandbox.container + " #answer-button1";
    const infoBlock = '#villages-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="villages-' + sandbox.container + '"></div>');

    $('#villages-' + sandbox.container).load('static/components/html/villages.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
            let minPopulationValue = $(minPopulation).val();
            let maxPopulationValue = $(maxPopulation).val();

            if (minPopulationValue && maxPopulationValue) {
                findVillagesByPopulation(parseInt(minPopulationValue), parseInt(maxPopulationValue));
            }
        });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let searchComponentScAddr = keynodes['ui_villages_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(answerButton).html(searchComponentText);
                $(answerButton).attr('sc_addr', searchComponentScAddr);
                VillagesComponent.concept_population = keynodes['concept_population'];
                VillagesComponent.concept_village = keynodes['concept_village'];
                VillagesComponent.nrel_population = keynodes['nrel_population'];
            });
        });
    }

    function findVillagesByPopulation(minPopulation, maxPopulation) {
        window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_3F_A_A, [
            VillagesComponent.concept_village,
            sc_type_arc_pos_const_perm,
            sc_type_node]).
            done(function (identifiers) {
                for (let i = 0; i < identifiers.length; ++i) {
                    let village = identifiers[i][2];
                    window.sctpClient.iterate_elements(SctpIteratorType.SCTP_ITERATOR_5F_A_A_A_F, [
                        identifiers[i][2],
                        sc_type_arc_common | sc_type_const,
                        sc_type_node,
                        sc_type_arc_pos_const_perm,
                        VillagesComponent.nrel_population
                    ]).done(function (identifiers) {
                        SCWeb.core.Server.resolveIdentifiers([identifiers[0][2], village], function (keynodes) {
                            let population = parseInt(keynodes[identifiers[0][2]]);

                            if (population >= minPopulation && population <= maxPopulation) {
                                document.getElementById("info").innerHTML += keynodes[village] + "<br/>";
                            }
                        });
                    });
                }
            });
    }
};

SCWeb.core.ComponentManager.appendComponentInitialize(VillagesComponent);
