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

            // start translator
        });
    });

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(StreetTranslatorComponent);