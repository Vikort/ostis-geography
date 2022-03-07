ShopTranslatorComponent = {
	ext_lang: "shop_translator_code",
	formats: ["format_shop_translator"],
	struct_support: true,

	factory: function (sandbox) {
		return new ShopTranslatorWindow(sandbox);
	},
};

ShopTranslatorWindow = function (sandbox) {
	this.sandbox = sandbox;
	this.sandbox.container = sandbox.container;

	const keynodes = [
		"ui_shop_translator_cityName_input",
		"ui_shop_translator_shopName_input",
		"ui_shop_translator_button",
	];
	const answerButton =
		"#shopTranslator-" + sandbox.container + " #translate-button";
	const cityName =
		"#shopTranslator-" + sandbox.container + " #cityName";
	const shopName =
		"#shopTranslator-" + sandbox.container + " #shopName";

	$("#" + sandbox.container).prepend(
		'<div id="shopTranslator-' + sandbox.container + '"></div>'
	);

	$("#shopTranslator-" + sandbox.container).load(
		"static/components/html/shop_translator.html",
		function () {
			getUIComponentsIdentifiers();
			$(answerButton).click(function (event) {
				event.preventDefault();
				let englishName = $(cityName).attr("sc_addr");
				let russanName = $(shopName).attr("sc_addr");
				startTranslation(englishName, russanName);
			});
		}
	);

	this.applyTranslation = function () {
		getUIComponentsIdentifiers();
	};

	function getUIComponentsIdentifiers() {
		SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
			SCWeb.core.Server.resolveIdentifiers(
				keynodes,
				function (identifiers) {
					let cityNameComponentScAddr =
						keynodes["ui_shop_translator_cityName_input"];
					let enNameComponentText =
						identifiers[cityNameComponentScAddr];
					//$(cityName).html(enNameComponentText);
					$(cityName).attr("sc_addr", cityNameComponentScAddr);
					let shopNameComponentScAddr =
						keynodes["ui_shop_translator_shopName_input"];
					let ruNameComponentText =
						identifiers[shopNameComponentScAddr];
					//$(shopName).html(ruNameComponentText);
					$(shopName).attr("sc_addr", shopNameComponentScAddr);
					//$(count).html(countText);
					let translateButtonText =
						identifiers[keynodes["ui_shop_translator_button"]];
					$(answerButton).html(translateButtonText);
				}
			);
		});
	}

	function startTranslation(enNameAddr, ruNameAddr) {
		const actionName = "ui_menu_shop_translator";
		SCWeb.core.Server.resolveScAddr([actionName], function (keynodes) {
			let actionScAddr = keynodes[actionName];
			SCWeb.core.Main.doCommand(
				actionScAddr,
				[enNameAddr, ruNameAddr],
				function (res) {
					//SCWeb.ui.WindowManager.appendHistoryItem(res.question);
				}
			);
		});
	}

	this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

SCWeb.core.ComponentManager.appendComponentInitialize(
	ShopTranslatorComponent
);
