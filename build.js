({

	baseUrl: "static/js/", 

	out: "static/site.min.js", 

	name: "main", 

	optimize: "uglify2",

	skipModuleInsertion: true,

	include: [		
		"../../app/shared/Data",
		"lib/requestAnimFrame", 
		"lib/RLdummy",
		"framework/Broadcast",
		"framework/Loader",
		"framework/Wrapper",
		"framework/VirtualScroll",
		"framework/Simplrz",
		"framework/XMath",
		"site/Messages",
		"site/Site",
		"site/MainPanel",
		"site/AboutPanel",
		"site/ContentPanel",
		"site/Box",
		"site/Router"
	]
})