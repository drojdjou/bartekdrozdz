({

	baseUrl: "static/js/", 

	out: "static/site.min.js", 

	name: "main", 

	optimize: "uglify2",

	skipModuleInsertion: true,

	include: [		
		"../../app/shared/Data",
		"lib/requestAnimFrame", 
		"lib/simplrz",
		"lib/virtualscroll",
		"lib/misc",
		"lib/RLdummy",
		"framework/Broadcast",
		"framework/Loader",
		"framework/Wrapper",
		"site/Messages",
		"site/Site",
		"site/MainPanel",
		"site/AboutPanel",
		"site/ContentPanel",
		"site/Box",
		"site/Router"
	]
})