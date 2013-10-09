var Config = {
	vscrollEnabled: true,
	scrollMargin: 50
};

window.onload = function() {	

	if(Config.vscrollEnabled) {
		document.querySelector('#main').style.overflowY = "hidden";
		document.querySelector('#about').style.overflowY = "hidden";
		document.querySelector('#content').style.overflowY = "hidden";
		document.querySelector('#content').style.pointerEvents = "none";
	}

	window.scroll(0, 1);

	require([
		"js/lib/modernizr", 
		"js/lib/requestAnimFrame",  
		"js/lib/virtualscroll",
		"js/lib/history",
		"js/lib/xmath",
		"js/framework/Broadcast",
		"js/framework/Loader",
		"js/framework/Wrapper",
		"js/site/Messages",
		"js/site/Site",
		"js/site/MainPanel",
		"js/site/AboutPanel",
		"js/site/ContentPanel",
		"js/site/Box",
		"../shared/Data"
	], function() {
		Loader.loadJSON("data", function(data) {
			Data.setMain(data);
			Site();
			MainPanel();
			AboutPanel();
			ContentPanel();
		});
	});
}












