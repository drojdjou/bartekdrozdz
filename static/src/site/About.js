About = function() {

	var _active = false, _canScroll = false;

	var plate = EXT.select('#about > div');

	var easer = new Easer(0.2);

	var onAnimatedIn = function() {
		_canScroll = true;
	}

	var onResize = function() {
		var max = plate.ext.height() - window.innerHeight;
		easer.setLimits(-max, 0);
	}

	var onScroll = function(e) {
        if(_active && _canScroll) {
        	easer.updateTarget(e.deltaY);
    	}
    }

   var onRender = function() {
        if(_active && _canScroll) {
	        var scr = easer.easeVal() | 0;        
	        plate.ext.y = scr;
	        plate.ext.transform();
	    }
	}

	var onRoute = function(e) {
		var r = e.parts[0];
		var startUp = e.prevRoute == null;
		var offset = Math.min(500, window.innerWidth);

		_active = (r == Site.ABOUT);

		switch(r) {
			case Site.ABOUT:
				if(!startUp) {
					_canScroll = false;
					plate.ext.transition({ transform: { rotY: 0, x: 0 }, opacity: 1 }, 500, 'ease', 0, onAnimatedIn);
				}
				break;
			default:
				if(!startUp) {
					_canScroll = false;
					plate.ext.transition({ transform: { rotY: -90, x: -offset }, opacity: 0 }, 500, 'ease');
				} else {
					plate.ext.transform({ rotY: -90, x: -offset });
					plate.ext.css('opacity', 0);
				}
				break;
		}
	};

	VirtualScroll.on(onScroll);
	FrameImpulse.on(onRender);
	Application.on(MSG.RESIZE, onResize);
	Application.on(MSG.ROUTE, onRoute);

	onResize();
}