window.Site = function(data) {
	
	if(Simplrz.touch) {
		document.addEventListener("touchmove", function(e) {
			e.preventDefault();
		});
	}

	Data.setMain(data);
	Application.init();
	Main();
	About();
	Content();
}

Site.CDN = "http://cdn.bartekdrozdz.com/";

Site.MAIN = "";
Site.ABOUT = "about";
Site.PROJECT = "project";
Site.ARTICLE = "article";