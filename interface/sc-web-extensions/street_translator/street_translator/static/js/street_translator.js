StreetTranslatorComponent = {
    ext_lang: 'street_translator_code',
    formats: ['format_street_translator'],
    struct_support: true,

    factory: function (sandbox) {
        return new StreetTranslatorWindow(sandbox);
    }
};

StreetTranslatorWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const answerButton = '#streetTranslator-' + sandbox.container + " #translate-button";
    const nameInEnglish = '#streetTranslator-' + sandbox.container + " #nameInEnglish";
    const nameInRussian = '#streetTranslator-' + sandbox.container + " #nameInRussian";
    const count = '#streetTranslator-' + sandbox.container + " #count";

    $('#' + sandbox.container).prepend('<div id="streetTranslator-' + sandbox.container + '"></div>');

    $('#streetTranslator-' + sandbox.container).load('static/components/html/street_translator.html', function () {

        $(answerButton).click(function (event) {
            event.preventDefault();
            let englishName = $(nameInEnglish).val();
            let russanName = $(nameInRussian).val();
            let countNum = $(count).val();
            alert(englishName, russanName, countNum);

            if (keywordText) {
                findByIdentifier(keywordText);
            }
        });
    });

    function findByIdentifier(identifier) {
        const actionName = 'ui_menu_view_full_semantic_neighborhood_in_the_agreed_part_of_kb';
        SCWeb.core.Server.resolveScAddr([actionName, identifier], function (keynodes) {
            let keywordScAddr = keynodes[identifier];
            let actionScAddr = keynodes[actionName];
            if (!keywordScAddr && !actionScAddr) {
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

SCWeb.core.ComponentManager.appendComponentInitialize(StreetTranslatorComponent);