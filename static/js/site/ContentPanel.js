window.ContentPanel = function() {

	var active = false;
	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var content = 	Wrapper.select('#content section');

	var header = Wrapper.select('#content h2');
	var text = Wrapper.select('#content .content');
	var hero = Wrapper.select('#content .hero');
	var close = Wrapper.select('#content .close');

	var data, iframe, poster, posterTint;

	var c = 0;

	var onResize = function() {
		setScrollMax();
		if(poster) setupHeroImage();
	}

	var setScrollMax = function() {
		scrollMax = text.position().y - (window.innerHeight - text.height());
		scrollMax = Math.max(0, scrollMax);
	}

	var onScroll = function(e) {
		if(active && scrollMax > 0) scrollTarget += e.deltaY;
	}

	var onRender = function() {
		if(active && scrollMax > 0) setPosition();
	}

	var setPosition = function() {
		scrollTarget = Math.clamp(scrollTarget, -scrollMax, 0);
		scrollPos += (scrollTarget - scrollPos) * 0.2;

		header.move(0, scrollPos * 3);
		close.move(0, scrollPos * 3);
		text.move(0, scrollPos);

		if(iframe) iframe.move(0, scrollPos * 0.5);
		if(poster) poster.move(0, scrollPos * 0.5);
	}

	var show = function(id) {
		scrollMax = 0;
		scrollTarget = 0;
		scrollPos = 0;
		setPosition();
		active = true;
		data = Data.getProjectById(id);
		setTimeout(lateShow, 500);
	}

	var lateShow = function() {
		close.css("display", "block");
		content.css("display", "block"); 

		header.e().innerHTML = data.name;

		Loader.loadText(data.contentUrl, function(d) {
			text.e().innerHTML = d;

			var playImage = text.select(".video .play");
			var video = text.select(".video video");

			if(Simplrz.touch) video.css("display", "none");

			if(playImage) {
				playImage.css("backgroundImage", "url(" + playImage.attr("data-src") + ")");

				playImage.on(Config.click, function() {
					video.css("display", "block");
					video.e().play();
					playImage.css("display", "none");
				});
			}

			if(video) {
				video.on("pause", function() {
				    if (Simplrz.touch && !video.webkitDisplayingFullscreen) {
				    	video.css("display", "none");
						playImage.css("display", "block");
				    }
				});
			}

			onResize();
		});

		var missingDeps = [];
		data.deps.forEach(function(dep) {
			if(!Simplrz[dep]) {
				missingDeps.push(dep);
			}
		});


		var ww = window.innerWidth, wh = window.innerHeight;

		if(data.type == "demo" && missingDeps.length == 0) {

			// All demos display at 80% of the screen heght
			var demoHeight = window.innerHeight * 0.8


			iframe = Wrapper.create("iframe");
			iframe.e().setAttribute("frameBorder", "0");

			iframe.on("load", function(e) {
				// var cd = iframe.e().contentDocument;
				// if(cd) {
				// 	cd.addEventListener("DOMMouseScroll", function(e) {
				// 		VirtualScroll.invokeFirefox(e);
				// 	});
				// }
				
				setTimeout(function() {
					iframe.css("opacity", "1");
				}, 500);
			});

			iframe.css("opacity", "0");
			iframe.css("height", demoHeight + "px");
			hero.e().appendChild(iframe.e());
			iframe.e().contentWindow.location.replace(data.url);

		} else {
			poster = Wrapper.create("img");
			posterTint = Wrapper.create("div");

			poster.on("load", function(e) {
				posterTint.css("backgroundColor", "rgba(0, 0, 0, 0)");
				setScrollMax();
			});

			setupHeroImage();

			hero.e().appendChild(poster.e());
			hero.e().appendChild(posterTint.e());
		}
	}

	var setupHeroImage = function() {
		var ww = window.innerWidth, wh = window.innerHeight;

		if(ww > wh || ww > 768) {
			// Landscape-ish or just too big screen
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

	Broadcast.addClient(Msg.NAVIGATE, function(e) {
		if(e.parts[0] == "project") show(e.parts[1]);
		else hide();
	}); 

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RENDER, onRender); 
	Broadcast.addClient(Msg.RESIZE, onResize); 
}