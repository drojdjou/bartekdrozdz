window.onload = function() {	
	require([
		"js/lib/modernizr", 
		"js/lib/requestAnimFrame", 
		"js/lib/wrapper", 
		"js/lib/virtualscroll",
		"js/lib/xmath",
		"js/framework/Broadcast",
		"js/framework/Loader",
		"js/site/Messages",
		"js/site/Site",
		"js/site/MainPanel",
		"js/site/AboutPanel",
		"js/site/ContentPanel"
	], function() {
		Site();
		MainPanel();
		AboutPanel();
		ContentPanel();
	});
}












