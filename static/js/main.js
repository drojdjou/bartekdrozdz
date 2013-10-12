var Config = {
	vscrollEnabled: true,
	scrollMargin: 0
};

if(Config.vscrollEnabled) {
	document.querySelector('#main').style.overflowY = "hidden";
	document.querySelector('#about').style.overflowY = "hidden";
	document.querySelector('#content').style.overflowY = "hidden";
	document.querySelector('#content').style.pointerEvents = "none";
}

window.scroll(0, 1);

if(location.host.indexOf("localhost") > -1 || location.host.indexOf("192.168") > -1) {
	document.write('<script src=\"http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1\"></' + 'script>');
}

window.addEventListener("load", function() {
	Loader.loadJSON("/data", function(data) {
		Data.setMain(data);
		Site();
		MainPanel();
		AboutPanel();
		ContentPanel();
		Router();
	});
});