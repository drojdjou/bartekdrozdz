Content = function() {

	var _active = false;

	var section = EXT.select('#content');

	var smallHeader = section.ext.select('h2');
	var close = section.ext.select('.close');

	var hero = Hero(section.ext.select('.hero')), video;

	var content = section.ext.select('.content');

	var easer = new Easer(0.2);

	var onResize = function() {
		if(!_active) return;
		var max = content.ext.height() - window.innerHeight;
		easer.setLimits(-max, hero.height());
		hero.onResize();
	}

	var onScroll = function(e) {
        if(!_active) return;
        easer.updateTarget(e.deltaY);
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
		var offset = Math.min(500, window.innerWidth);

		_active = (r == Site.PROJECT || r == Site.ARTICLE);

		if(_active) {
			var data = Data.getProjectById(e.parts[1]);
			smallHeader.innerHTML = data.name;
			hero.setup(data);
			content.innerHTML = '';
			easer.reset(hero.height());
			Loader.loadText('/data/' + e.parts[1], onData);
		}

		switch(r) {
			case Site.PROJECT:
				if(!startUp) section.ext.transition({ transform: { x: 0 }, opacity: 1 }, 500, 'ease');
				break;
			default:
				if(video) video.pause();
				hero.kill();
				if(!startUp) section.ext.transition({ transform: { x: window.innerWidth }, opacity: 0 }, 500, 'ease');
				else section.ext.css('opacity', 0);
				break;
		}
	};

	var onData = function(html) {
		content.innerHTML = html;

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