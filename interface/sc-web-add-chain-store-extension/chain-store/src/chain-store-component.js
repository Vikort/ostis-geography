chainStoreComponent = {
    ext_lang: 'chain_store_code',
    formats: ['format_chain_store'],
    struct_support: true,

    factory: function (sandbox) {
        return new chainStoreWindow(sandbox);
    }
};

chainStoreWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const key_nodes = ['ui_chain_store_text_component', 'ui_chain_store_search_component', 'ui_chain_store_answer_button',
    'ui_chain_store_info_block'];

    const textComponent = '#chain-store-' + sandbox.container + " #text-component";
    const searchComponent = '#chain-store-' + sandbox.container + " #search-component";
    const answerButton = '#chain-store-' + sandbox.container + " #answer-button";
    const infoBlock = '#chain-store-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="chain-store-' + sandbox.container + '"></div>');

    $('#chain-store-' + sandbox.container).load('static/components/html/chain-store.html', function () {
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

                let textComponentScAddr = keynodes['ui_chain_store_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);

                let searchComponentScAddr = keynodes['ui_chain_store_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);

                let answerButtonText = identifiers[keynodes['ui_chain_store_answer_button']];
                $(answerButton).html(answerButtonText);

                let infoBlockText = identifiers[keynodes['ui_chain_store_info_block']];
                $(infoBlock).html(infoBlockText);

            });
        });


    }

   function makeFileText() {

	    const identifier = document.getElementById("identifier_en").value;

        const name = document.getElementById("name_ru").value

	   	let lat = document.getElementById("latitude").value

	   	let long = document.getElementById("longitude").value

	    const result = identifier + " <- concept_chain_store;\n" +
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

SCWeb.core.ComponentManager.appendComponentInitialize(chainStoreComponent);
