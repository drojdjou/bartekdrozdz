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

		header.domElement().innerHTML = data.name;

		Loader.loadText(data.contentUrl, function(d) {
			text.domElement().innerHTML = d;
			onResize();
		});

		var missingDeps = [];
		data.deps.forEach(function(dep) {
			if(!Modernizr[dep]) {
				missingDeps.push(dep);
			}
		});

		if(data.type == "demo") {
			// By default all demos display in 16:9 or lower. To make them fullscreen set "aspect": "-1:-1" in json
			var aspect = 9 / 16;

			if(data.aspect && data.aspect != "") {
				var aw = parseInt(data.aspect.split(":")[0]);
				var ah = parseInt(data.aspect.split(":")[1]);
				if(aw == -1) aspect = window.innerHeight / window.innerWidth; 
				else aspect = ah / aw;
			}

			var fh = window.innerWidth * aspect;

			if(fh < window.innerHeight - text.height()) {
				fh = window.innerHeight - text.height();
			}

			if(window.innerWidth < 500) {
				fh = window.innerWidth;
			}

			iframe = Wrapper.create("iframe");
			iframe.domElement().setAttribute("frameBorder", "0");

			iframe.on("load", function(e) {
				iframe.css("opacity", "1");
				iframe.domElement().contentDocument.addEventListener("DOMMouseScroll", function(e) {
					VirtualScroll.invokeFirefox(e);
				});
			});

			iframe.css("opacity", "0");
			iframe.css("height", fh + "px");
			hero.domElement().appendChild(iframe.domElement());
			iframe.domElement().contentWindow.location.replace(data.url);

		} else if(data.type == "article") {
			poster = Wrapper.create("img");
			var posterTint = Wrapper.create("div");

			poster.on("load", function(e) {
				posterTint.css("backgroundColor", "rgba(0, 0, 0, 0)");
				onResize();
			});

			if(window.innerWidth > window.innerHeight) {
				// Landscape-ish screen
				poster.css("width", "100%");
				poster.css("height", (window.innerWidth * (100/235)) + "px");

				posterTint.css("width", "100%");
				posterTint.css("height", (window.innerWidth * (100/235)) + "px");

				poster.domElement().src = 'assets/content/1920w-235as/' + data.id + '.jpg';
			} else {
				// Portrait (or ideally square)
				poster.css("width", "100%");
				poster.css("height", window.innerWidth + "px");

				posterTint.css("width", "100%");
				posterTint.css("height", window.innerWidth + "px");

				poster.domElement().src = 'assets/content/871sq/' + data.id + '.jpg';
			}

			hero.domElement().appendChild(poster.domElement());
			hero.domElement().appendChild(posterTint.domElement());
		}
	}

	var fadeOut = function() {
		if(!active) return;
		active = false;
		hide();
	}

	var hide = function() {
		active = false;

		text.domElement().innerHTML = "";

		if(iframe) {
			try {
				iframe.domElement().contentWindow.kill();
			} catch(e) {
				// Nevermind
			}

			hero.domElement().removeChild(iframe.domElement());
			iframe = null;
		}

		if(poster) {
			hero.domElement().removeChild(poster.domElement());
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

	close.on("click", function() {
		Broadcast.send(Msg.ON_MAIN_OPEN);
	});
}