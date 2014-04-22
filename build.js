var fs = require('fs');
var UglifyJS = require("uglify-js");

console.log("Compressing javascript...");

var data = {
	baseUrl: "static/src/", 
	out: "static/site.min.js", 
	include: [		
		"../../app/shared/Data",

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

var includes = [];

for(var i = 0; i < data.include.length; i++) {
	includes.push(data.baseUrl + data.include[i] + ".js");
}

var result = UglifyJS.minify(
	includes
);

fs.writeFileSync(data.out, result.code);

console.log("...done!");







