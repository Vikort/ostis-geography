SchoolTranslatorComponent = {
    ext_lang: 'school_translator_code',
    formats: ['format_school_translator'],
    struct_support: true,

    factory: function (sandbox) {
        return new SchoolTranslatorWindow(sandbox);
    }
};

SchoolTranslatorWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_school_translator_ruName_input', 'ui_school_translator_count_input',
        'ui_school_translator_button'];
    const answerButton = '#schoolTranslator-' + sandbox.container + " #translate-button";
    const nameInRussian = '#schoolTranslator-' + sandbox.container + " #nameInRussian";
    const count = '#schoolTranslator-' + sandbox.container + " #count";

    $('#' + sandbox.container).prepend('<div id="schoolTranslator-' + sandbox.container + '"></div>');

    $('#schoolTranslator-' + sandbox.container).load('static/components/html/school_translator.html', function () {
        getUIComponentsIdentifiers();
        $(answerButton).click(function (event) {
            event.preventDefault();
            let russanName = $(nameInRussian).attr('sc_addr');
            let countNum = $(count).attr('sc_addr');
            startTranslation(russanName, countNum);
        });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let ruNameComponentScAddr = keynodes['ui_school_translator_ruName_input'];
                let ruNameComponentText = identifiers[ruNameComponentScAddr];
                //$(nameInRussian).html(ruNameComponentText);
                $(nameInRussian).attr('sc_addr', ruNameComponentScAddr);
                let countScAddr = keynodes['ui_school_translator_count_input'];
                let countText = identifiers[countScAddr];
                //$(count).html(countText);
                $(count).attr('sc_addr', countScAddr);
                let translateButtonText = identifiers[keynodes['ui_school_translator_button']];
                $(answerButton).html(translateButtonText);
            });
        });
    }

    function startTranslation(ruNameAddr, countAddr) {
        const actionName = "ui_menu_school_translator";
        SCWeb.core.Server.resolveScAddr([actionName], function (keynodes) {
            let actionScAddr = keynodes[actionName];
            SCWeb.core.Main.doCommand(actionScAddr, [ruNameAddr, countAddr], function (res) {
                //SCWeb.ui.WindowManager.appendHistoryItem(res.question);
            })
        })
    }

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(SchoolTranslatorComponent);