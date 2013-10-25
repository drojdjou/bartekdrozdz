var Config = {
	// Doesn't work when set to false...
	vscrollEnabled: true,
	scrollMargin: 0
};

if(Config.vscrollEnabled) {

	var h = function(id) {
		document.querySelector(id).style.overflowY = "hidden";
	}
	
	h('#main');
	h('#about');
	h('#content');

	document.querySelector('#content').style.pointerEvents = "none";
}

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