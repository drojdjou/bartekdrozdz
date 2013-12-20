({

	baseUrl: "static/src/", 

	out: "static/site.min.js", 

	name: "main", 

	optimize: "uglify2",

	skipModuleInsertion: true,

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
		"site/Hero"
	]
})