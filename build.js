({

	baseUrl: "static/src/", 

	out: "static/site.min.js", 

	name: "main", 

	optimize: "uglify2",

	skipModuleInsertion: true,

	include: [		
		"../../app/shared/Data",
		"lib/RLdummy",

		"framework/Simplrz",
		"framework/Application",

		"framework/domExtend/DomExtend",
		"framework/domExtend/State",
		"framework/domExtend/Transform",
		"framework/domExtend/Transition",

		"framework/Events",
		"framework/FrameImpulse",
		"framework/HistoryRouter",
		"framework/Loader",
		"framework/MSG",
		"framework/VirtualScroll.js",
		"framework/Util.js",

		// "site/Messages",
		// "site/Site",
		// "site/MainPanel",
		// "site/AboutPanel",
		// "site/ContentPanel",
		// "site/Box",
		// "site/Router"
	]
})