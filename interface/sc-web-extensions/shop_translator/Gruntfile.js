module.exports = function (grunt) {
	const shop_translatorDirPath = "./shop_translator/";

	const scWebDirPath = "../../../ostis-web-platform/sc-web";
	const clientJsDirPath = scWebDirPath + "/client/static/components/js/";
	const clientCssDirPath = scWebDirPath + "/client/static/components/css/";
	const clientHtmlDirPath = scWebDirPath + "/client/static/components/html/";
	const clientImgDirPath = scWebDirPath + "/client/static/components/images/";

	grunt.initConfig({
		concat: {
			shop_translator: {
				src: [shop_translatorDirPath + "src/*.js"],
				dest:
					shop_translatorDirPath + "static/js/shop_translator.js",
			},
		},
		copy: {
			shop_translatorJs: {
				cwd: shop_translatorDirPath + "static/js/",
				src: "shop_translator.js",
				dest: clientJsDirPath + "shop_translator/",
				expand: true,
				flatten: true,
			},
			shop_translatorCss: {
				cwd: shop_translatorDirPath + "static/css/",
				src: "*.css",
				dest: clientCssDirPath,
				expand: true,
				flatten: true,
			},
			shop_translatorHtml: {
				cwd: shop_translatorDirPath + "static/html/",
				src: ["*.html"],
				dest: clientHtmlDirPath,
				expand: true,
				flatten: true,
			},
			shop_translatorImg: {
				cwd: shop_translatorDirPath + "static/images/",
				src: "*.png",
				dest: clientImgDirPath + "shop_translator/",
				expand: true,
				flatten: true,
			},
		},
		watch: {
			shop_translatorJs: {
				files: shop_translatorDirPath + "src/**",
				tasks: ["concat:shop_translator", "copy:shop_translatorJs"],
			},
			shop_translatorCss: {
				files: shop_translatorDirPath + "static/css/**",
				tasks: ["copy:shop_translatorCss"],
			},
			shop_translatorHtml: {
				files: [shop_translatorDirPath + "static/html/**"],
				tasks: ["copy:shop_translatorHtml"],
			},
			shop_translatorImg: {
				files: [shop_translatorDirPath + "static/images/**"],
				tasks: ["copy:shop_translatorImg"],
			},
		},
		exec: {
			updateCssAndJs: "sh scripts/update_css_and_js.sh",
		},
	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-exec");

	grunt.registerTask("default", [
		"concat",
		"copy",
		"exec:updateCssAndJs",
		"watch",
	]);
	grunt.registerTask("build", ["concat", "copy", "exec:updateCssAndJs"]);
};
