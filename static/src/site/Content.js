Content = function() {

	var _active = false, _canScroll = false;

	var data;
	var section = EXT.select('#content');
	var close = section.ext.select('.close');
	var hero = Hero(section.ext.select('.hero')), video;
	var content = section.ext.select('.content');
	var easer = new Easer(0.2);

	// Is it a webkit browser and it is not a touch screen or it is an iPhone 5
	var canBlurFunc =  function() {
		return Simplrz.prefix.lowercase == "webkit" && (!Simplrz.touch || (navigator.platform == "iPhone" && screen.height == 568));
	
	}

	var canBlur = false;

	var onResize = function() {
		if(!_active) return;

		var max = (content.ext.height() - window.innerHeight);
		easer.setLimits(Math.min(hero.height(), -max), hero.height());
		hero.onResize();
		onScroll();
	}

	var onScroll = function(e) {
        if(!_active && _canScroll) return;

        var dx = (e) ? e.deltaY : 0;
        easer.updateTarget(dx);
    }

   var onRender = function() {
   		if(!_active && _canScroll) return;

        var scr = easer.easeVal();

        content.ext.y = scr;
        content.ext.transform();

        var br = scr - hero.height();

        hero.ext.y = br * 0.5;
        hero.ext.transform();

        // If we see a drop in frame rate - let's skip the blur effect
        if(FrameImpulse.fps < 25 && canBlur) {
        	console.log("Cancaling blur: ", FrameImpulse.fps);
        	content.ext.css("backgroundColor", "rgba(0, 0, 0, 1)");
        	canBlur = false;
        }

        if(canBlur) {
	        var b = Math.clamp(br/-10, 0, 40) | 0;
	        hero.ext.css("webkitFilter", "blur(" + b + "px)");
	    }
	}

	var onRoute = function(e) {
		var r = e.parts[0];
		var startUp = e.prevRoute == null;
		var offset = window.innerWidth * 0.5;

		_active = (r == Site.PROJECT || r == Site.ARTICLE);

		if(_active) {

			canBlur = canBlurFunc();
			if(canBlur) content.ext.css("backgroundColor", "rgba(0, 0, 0, 0.5)");

			_canScroll = false;
			data = Data.getProjectById(e.parts[1]);
			content.innerHTML = '';

			easer.reset(hero.height());
			// easer.setLimits(0, hero.height());

			Loader.loadText('/data/' + e.parts[1], onData);
		}

		switch(r) {
			case Site.PROJECT:
			case Site.ARTICLE:
				if(!startUp) {

					hero.adjust();
					hero.setup(data);

					section.ext.transition({ transform: { x: 0 }, opacity: 1 }, Timing.pageTransition(), 'ease', 0, function() {
						hero.load(data);
					});

				} else {
					section.ext.transform({ x: 0 });
					section.ext.css('opacity', 1);
					
					hero.setup(data);
					hero.load(data);
				}

				break;
			default:

				if(video) video.pause();
				hero.killIframe();

				if(!startUp) {
					section.ext.transition({ transform: { x: offset }, opacity: 0 }, Timing.pageTransition(), 'ease', 0, function() {
						hero.kill();
					});
				} else {
					section.ext.transform({ x: offset });
					section.ext.css('opacity', 0);
				}

				break;
		}
	};

	var onData = function(html) {
		content.innerHTML = '<h1>' + data.name + '</h1>' + html;

		var playImage = content.ext.select(".video .play");
		video = content.ext.select(".video video");

		if(playImage) {
			playImage.ext.css("backgroundImage", "url(" + playImage.ext.attr("data-src") + ")");

			playImage.ext.on('click', function() {
				video.ext.css("display", "block");
				video.play();
				playImage.ext.css("display", "none");
			});
		}

		if(video && Simplrz.touch) {
			var resetVideo = function() {
				video.ext.css("display", "none");
				playImage.ext.css("display", "block");
			}

			video.ext.css("display", "none");

			video.ext.on('pause', function() { 
				if(!video.webkitDisplayingFullscreen) {
					resetVideo();
				}
			});

			video.ext.on('ended', function() {
				if(video.webkitDisplayingFullscreen) {
					video.webkitExitFullScreen();
					resetVideo();
				}
			});
		}

		onResize();

		_canScroll = true;
	}

	VirtualScroll.on(onScroll);
	FrameImpulse.on(onRender);
	Application.on(MSG.RESIZE, onResize);
	Application.on(MSG.ROUTE, onRoute);
};