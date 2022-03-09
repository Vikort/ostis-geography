itCompanyParkingComponent = {
    ext_lang: 'it_company_parking_code',
    formats: ['format_it_company_parking'],
    struct_support: true,

    factory: function (sandbox) {
        return new itCompanyParkingWindow(sandbox);
    }
};

itCompanyParkingWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const key_nodes = ['ui_it_company_parking_text_component', 'ui_it_company_parking_search_component', 'ui_it_company_parking_answer_button',
    'ui_it_company_parking_info_block'];

    const textComponent = '#it_company_parking-' + sandbox.container + " #text-component";
    const searchComponent = '#it_company_parking-' + sandbox.container + " #search-component";
    const answerButton = '#it_company_parking-' + sandbox.container + " #answer-button";
    const infoBlock = '#it_company_parking-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="it_company_parking-' + sandbox.container + '"></div>');

    $('#it_company_parking-' + sandbox.container).load('static/components/html/it_company_parking.html', function () {
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

                let textComponentScAddr = keynodes['ui_it_company_parking_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);

                let searchComponentScAddr = keynodes['ui_it_company_parking_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);

                let answerButtonText = identifiers[keynodes['ui_it_company_parking_answer_button']];
                $(answerButton).html(answerButtonText);

                let infoBlockText = identifiers[keynodes['ui_it_company_parking_info_block']];
                $(infoBlock).html(infoBlockText);

            });
        });


    }

   function makeFileText() {

	    const identifier = document.getElementById("identifier_en").value;

        const name = document.getElementById("name_ru").value

	   	let lat = document.getElementById("latitude").value

	   	let long = document.getElementById("longitude").value

	    const result = identifier + " <- concept_it_company_parking;\n" +
		 						    "=> nrel_main_idtf:\n" +
		 						    "["+ name +"]\n" +
		 						    "(* <- lang_ru;; <- name_ru;; <- name;;*);\n" +
		 						    "=> nrel_latitude:\n" +
								    "[" + lat + "]\n" +
								    "(* <- lang_ru;; <- latitude;;*);\n" +
		                            "=> nrel_longitude:\n" +
		                            "[" + long + "]\n" +
								    "(* <- lang_ru;; <- longitude;;*);;\n";

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

SCWeb.core.ComponentManager.appendComponentInitialize(itCompanyParkingComponent);
