window.onload = function() {	
	require([
		"js/lib/modernizr", 
		"js/lib/requestAnimFrame",  
		"js/lib/virtualscroll",
		"js/lib/xmath",
		"js/framework/Broadcast",
		"js/framework/Loader",
		"js/framework/Wrapper",
		"js/site/Messages",
		"js/site/Site",
		"js/site/Data",
		"js/site/MainPanel",
		"js/site/AboutPanel",
		"js/site/ContentPanel"
	], function() {
		Loader.loadJSON("data/main.json", function(data) {
			Data.setMain(data);
			Site();
			MainPanel();
			AboutPanel();
			ContentPanel();
		});
	});
}












