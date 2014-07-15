var fs = require('fs');
var UglifyJS = require("uglify-js");

var version = require("./version.json");

var frameworkOut = "static/framework.js";
var frameworkOutMin = "static/framework.min.js";
var siteOut = "static/site.min.js";

var baseUrl = "static/src/";

var frameworkFiles = {
	include: [
		"framework/Version",
		"framework/Simplrz",
		"framework/Events",
		"framework/Application",

		"framework/domExtend/DomExtend",
		"framework/domExtend/State",
		"framework/domExtend/Transform",
		"framework/domExtend/Transition",

		"framework/FrameImpulse",
		"framework/HistoryRouter",
		"framework/Loader",
		"framework/MSG",
		"framework/VirtualScroll",
		"framework/Pointer",
		"framework/Util"
	]
};

var siteFiles = {
	include: [		
		"../../app/shared/Data",

		"framework/Version",
		"framework/Simplrz",
		"framework/Events",
		"framework/Application",

		"framework/domExtend/DomExtend",
		"framework/domExtend/State",
		"framework/domExtend/Transform",
		"framework/domExtend/Transition",

		"framework/FrameImpulse",
		"framework/HistoryRouter",
		"framework/Loader",
		"framework/MSG",
		"framework/VirtualScroll",
		"framework/Pointer",
		"framework/Util",

		"site/util/Easer",
		"site/util/Timing",

		"site/Site",
		"site/Main",
		"site/Box",
		"site/About",
		"site/Content",
		"site/Hero",

		"main"
	]
};

var updateVersion = function() {
	version.build++;
	version.date = new Date();

	var jsHeader = "/** DO NOT EDIT. Updated from version.json **/\nvar Framework = ";

	fs.writeFileSync("./version.json", JSON.stringify(version));
	fs.writeFileSync(baseUrl  + "framework/Version.js", jsHeader + JSON.stringify(version));
}

var minify = function(set) {
	var includes = [];

	for(var i = 0; i < set.include.length; i++) {
		includes.push(baseUrl + set.include[i] + ".js");
	}

	var result = UglifyJS.minify(includes);

	return result.code;
}

var concat = function(set) {
	var concatFile = "";

	for(var i = 0; i < set.include.length; i++) {
		var f = baseUrl + set.include[i] + ".js";

		concatFile += "/* --- --- [" + set.include[i] + "] --- --- */\n\n";
		concatFile += fs.readFileSync(f);
		concatFile += "\n\n";
	}

	return concatFile;
}

updateVersion();

console.log("Compressing javascript. Framework " + version.version + " build " + version.build);

fs.writeFileSync(frameworkOut, concat(frameworkFiles, false));
fs.writeFileSync(frameworkOutMin, minify(frameworkFiles, false));
fs.writeFileSync(siteOut, minify(siteFiles, true));


console.log("...done!");







