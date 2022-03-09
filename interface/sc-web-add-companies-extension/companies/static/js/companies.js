companiesComponent = {
    ext_lang: 'companies_code',
    formats: ['format_companies'],
    struct_support: true,

    factory: function (sandbox) {
        return new companiesWindow(sandbox);
    }
};

companiesWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const key_nodes = ['ui_companies_text_component', 'ui_companies_search_component', 'ui_companies_answer_button',
    'ui_companies_info_block'];

    const textComponent = '#companies-' + sandbox.container + " #text-component";
    const searchComponent = '#companies-' + sandbox.container + " #search-component";
    const answerButton = '#companies-' + sandbox.container + " #answer-button";
    const infoBlock = '#companies-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="companies-' + sandbox.container + '"></div>');

    $('#companies-' + sandbox.container).load('static/components/html/companies.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
            event.preventDefault();
		makeFileText();

          });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(key_nodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let textComponentScAddr = keynodes['ui_companies_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_companies_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_companies_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_companies_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });


    }

      function makeFileText() {

          const identifier = document.getElementById("identifier_en").value;

          const name = document.getElementById("name_ru").value

          let phone_number = document.getElementById("phone_number").value;

          let site = document.getElementById("site").value;

          let unp = document.getElementById("unp").value;

          let address = document.getElementById("address").value;

          const result = identifier + " <- concept_company;\n" +
              "<- concept_belarusian_company;\n" +
              "=> nrel_main_idtf:\n" +
              "["+ name +"]\n" +
              "(* <- lang_ru;; <- name_ru;; <- name;;*);\n" +
              "["+ phone_number +"]\n" +
              "(* <- concept_phone_number;;*);\n" +
              "[" + site + "]\n" +
              "(* <- concept_website;;*);\n" +
              "[" + unp + "]\n" +
              "(* <- concept_ucn;;*);\n" +
              "[" + address + "]\n" +
              "(* <- lang_ru;; <- name_ru;; <- concept_address;;*);\n" +
              "=>nrel_country:\n" +
              "belarus;\n" +
              "=>nrel_region:\n" +
              "minsk;\n" +
              "=>nrel_scope:\n" +
              "it;;\n";

          let file = identifier + '.scs';

          download(file, result)
	}

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

SCWeb.core.ComponentManager.appendComponentInitialize(companiesComponent);
