theaterComponent = {
    ext_lang: 'theater_code',
    formats: ['format_theater'],
    struct_support: true,

    factory: function (sandbox) {
        return new theaterWindow(sandbox);
    }
};

theaterWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_theater_text_component', 'ui_theater_search_component', 'ui_theater_answer_button',
    'ui_theater_info_block'];
    const textComponent = '#theater-' + sandbox.container + " #text-component";
    const searchComponent = '#theater-' + sandbox.container + " #search-component";
    const answerButton = '#theater-' + sandbox.container + " #answer-button";
    const keyword = '#theater-' + sandbox.container + " #keyword";
    const infoBlock = '#theater-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="theater-' + sandbox.container + '"></div>');

    $('#theater-' + sandbox.container).load('static/components/html/theater.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
            let keywordText = $(keyword).val();

            if (keywordText) {
                findByIdentifier(keywordText);
            }
        });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let textComponentScAddr = keynodes['ui_theater_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_theater_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_theater_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_theater_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });
    }

    function findByIdentifier(identifier) {
        const actionName = 'ui_menu_search_theaters_in_the_city';
        SCWeb.core.Server.resolveScAddr([actionName, identifier], function (keynodes) {
            let keywordScAddr = keynodes[identifier];
            let actionScAddr = keynodes[actionName];
            if (!keywordScAddr && !actionScAddr){
                return;
            }
            // Simulate click on ui_menu_view_full_semantic_neighborhood button
            SCWeb.core.Main.doCommand(actionScAddr, [keywordScAddr], function (result) {
                // waiting for result
                if (result.question !== undefined) {
                    // append in history
                    SCWeb.ui.WindowManager.appendHistoryItem(result.question);
                }
            });
        });
    }

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(theaterComponent);
