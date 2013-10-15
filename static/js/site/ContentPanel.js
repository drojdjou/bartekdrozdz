window.ContentPanel = function() {

	var active = false;
	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var content = 	Wrapper.select('#content section');
	var close = 	Wrapper.select('#content .close');

	var header = Wrapper.select('#content h2');
	var text = Wrapper.select('#content .content');
	var hero = Wrapper.select('#content .hero');

	var iframe, poster;

	var onResize = function() {
		scrollMax = text.position().y - (window.innerHeight - text.height()) + Config.scrollMargin;
		scrollMax = Math.max(0, scrollMax);
	}

	var onScroll = function(e) {
		if(!active || scrollMax <= 0) return;
		scrollTarget += e.deltaY;
	}

	var onRender = function() {
		if(!active || scrollMax <= 0) return;
		scrollTarget = Math.clamp(scrollTarget, -scrollMax, 0);
		scrollPos += (scrollTarget - scrollPos) * 0.2;

		text.move(0, scrollPos);
		if(iframe) iframe.move(0, scrollPos * 0.5);
		if(poster) poster.move(0, scrollPos * 0.5);
	}

	var show = function(id) {
		active = true;
		scrollMax = 0;
		setTimeout(lateShow, 500, Data.getProjectById(id));
	}

	var lateShow = function(data) {
		close.css("display", "block");
		content.css("display", "block"); 

		header.e().innerHTML = data.name;

		Loader.loadText(data.contentUrl, function(d) {
			text.e().innerHTML = d;
			onResize();
		});

		var missingDeps = [];
		data.deps.forEach(function(dep) {
			if(!Simplrz[dep]) {
				missingDeps.push(dep);
			}
		});

		var ww = window.innerWidth, wh = window.innerHeight;

		if(data.type == "demo") {
			// By default all demos display in 16:9 or lower. To make them fullscreen set "aspect": "-1:-1" in json
			var aspect = 9 / 16;

			if(data.aspect && data.aspect != "") {
				var aw = parseInt(data.aspect.split(":")[0]);
				var ah = parseInt(data.aspect.split(":")[1]);
				if(aw == -1) aspect = wh / ww 
				else aspect = ah / aw;
			}

			var fh = ww * aspect;

			if(fh < wh - text.height()) {
				fh = wh - text.height();
			}

			if(ww < 500) {
				fh = ww;
			}

			iframe = Wrapper.create("iframe");
			iframe.e().setAttribute("frameBorder", "0");

			iframe.on("load", function(e) {
				iframe.css("opacity", "1");
				var cd = iframe.e().contentDocument;
				if(cd) {
					cd.addEventListener("DOMMouseScroll", function(e) {
						VirtualScroll.invokeFirefox(e);
					});
				}
				
			});

			iframe.css("opacity", "0");
			iframe.css("height", fh + "px");
			hero.e().appendChild(iframe.e());
			iframe.e().contentWindow.location.replace(data.url);

		} else if(data.type == "article") {
			poster = Wrapper.create("img");
			var posterTint = Wrapper.create("div");

			poster.on("load", function(e) {
				posterTint.css("backgroundColor", "rgba(0, 0, 0, 0)");
				onResize();
			});

			if(ww > wh) {
				// Landscape-ish screen
				poster.css("width", "100%");
				poster.css("height", (ww * (100/235)) + "px");

				posterTint.css("width", "100%");
				posterTint.css("height", (ww * (100/235)) + "px");

				poster.e().src = 'assets/content/1920w-235as/' + data.id + '.jpg';
			} else {
				// Portrait (or ideally square)
				poster.css("width", "100%");
				poster.css("height", ww + "px");

				posterTint.css("width", "100%");
				posterTint.css("height", ww + "px");

				poster.e().src = 'assets/content/871sq/' + data.id + '.jpg';
			}

			hero.e().appendChild(poster.e());
			hero.e().appendChild(posterTint.e());
		}
	}

	var fadeOut = function() {
		if(!active) return;
		active = false;
		hide();
	}

	var hide = function() {
		active = false;

		text.e().innerHTML = "";

		if(iframe) {
			try {
				iframe.e().contentWindow.kill();
			} catch(e) {
				// Nevermind
			}

			hero.e().removeChild(iframe.e());
			iframe = null;
		}

		if(poster) {
			hero.e().removeChild(poster.e());
			poster = null;
		}

		close.css("display", "none");
		content.css("display", "none");
	}

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RENDER, onRender); 
	Broadcast.addClient(Msg.RESIZE, onResize); 

	Broadcast.addClient(Msg.ON_MAIN_OPEN, fadeOut);
	Broadcast.addClient(Msg.ON_ABOUT_OPEN, hide); 
	Broadcast.addClient(Msg.ON_ITEM_OPEN, show);

	close.on(Config.click, function() {
		Broadcast.send(Msg.ON_MAIN_OPEN);
	});
}