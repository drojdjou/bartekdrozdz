Content = function() {

	var _active = false;

	var data;
	var section = EXT.select('#content');
	var close = section.ext.select('.close');
	var hero = Hero(section.ext.select('.hero')), video;
	var content = section.ext.select('.content');
	var easer = new Easer(0.2);

	var onResize = function() {
		if(!_active) return;

		var max = (content.ext.height() - window.innerHeight);
		easer.setLimits(Math.min(0, -max), hero.height());
		hero.onResize();
		onScroll();
	}

	var onScroll = function(e) {
        if(!_active) return;

        var dx = (e) ? e.deltaY : 0;
        easer.updateTarget(dx);
    }

   var onRender = function() {
   		if(!_active) return;

        var scr = easer.easeVal();

        content.ext.y = scr;
        content.ext.transform();

        hero.ext.y = (scr - hero.height()) * 0.5;
        hero.ext.transform();
	}

	var onRoute = function(e) {
		var r = e.parts[0];
		var startUp = e.prevRoute == null;
		var offset = window.innerWidth * 0.5;

		_active = (r == Site.PROJECT || r == Site.ARTICLE);

		if(_active) {
			data = Data.getProjectById(e.parts[1]);
			content.innerHTML = '';

			easer.reset(hero.height());
			easer.setLimits(0, hero.height());

			Loader.loadText('/data/' + e.parts[1], onData);
		}

		switch(r) {
			case Site.PROJECT:
			case Site.ARTICLE:
				if(!startUp) {
					hero.adjust();
					section.ext.transition({ transform: { x: 0 }, opacity: 1 }, Timing.pageTransition(), 'ease', 0, function() {
						// console.log("Content.transtion.in over");
						hero.setup(data);
					});
				} else {
					section.ext.transform({ x: 0 });
					section.ext.css('opacity', 1);
					hero.setup(data);
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

		if(Simplrz.touch) video.ext.css("display", "none");

		if(playImage) {
			playImage.ext.css("backgroundImage", "url(" + playImage.ext.attr("data-src") + ")");

			playImage.ext.on('click', function() {
				video.ext.css("display", "block");
				video.play();
				playImage.ext.css("display", "none");
			});
		}

		if(video) {
			video.ext.on("pause", function() {
			    if (Simplrz.touch && !video.webkitDisplayingFullscreen) {
			    	video.css("display", "none");
					playImage.css("display", "block");
			    }
			});
		}

		onResize();
	}

	VirtualScroll.on(onScroll);
	FrameImpulse.on(onRender);
	Application.on(MSG.RESIZE, onResize);
	Application.on(MSG.ROUTE, onRoute);
};