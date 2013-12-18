Main = function() {

	var _active = false;

	var section = 	EXT.select('#main');
	var header = 	section.ext.select('.header');
	var projects = 	EXT.select('#projects');

	var boxes = 	EXT.selectAll('.box');

	boxes.forEach(function(item) {
		Box(item);
	});

	var easer = new Easer(0.1);

	var onResize = function() {
		var max = section.ext.height() - window.innerHeight;
		easer.setLimits(-max, 0);

		boxes.forEach(function(item) {
			item.box.onResize(max);
		});

		if(!_active) {
			section.ext.transform({ x: -window.innerWidth });
		}
	}

	var onScroll = function(e) {
        if(!_active) return;
        easer.updateTarget(e.deltaY);

    }

   var onRender = function() {
        if(!_active) return;

        var scr = easer.easeVal();
        
        var n = 1 - Math.norm(scr, -20, -100);
        header.ext.css('opacity', n);
	}

	var onRoute = function(e) {
		var r = e.parts[0];
		var pr = e.prevRoute;
		var offset = 500;

		_active = (r == Site.MAIN);

		switch(r) {
			case Site.MAIN:

				if(pr) {
					section.ext.transition({ transform: { x: 0 } }, Timing.pageTransition(), 'ease');
				} else {
					section.ext.transform({ x: 0 });
				}

				break;
			case Site.ABOUT:

				if(pr) {
					section.ext.transition({ transform: { x: offset } }, Timing.pageTransition(), 'ease');
				} else {
					section.ext.transform({ x: offset });
				}

				break;
			case Site.PROJECT:

				if(pr) {
					section.ext.transition({ transform: { x: -window.innerWidth } }, Timing.pageTransition(), 'ease', 0, function() {
						// console.log("Main.transtion.in over");
					});
				} else {
					section.ext.transform({ x: -window.innerWidth });
				}
				
				break;
		}
	};

	VirtualScroll.on(onScroll);
	FrameImpulse.on(onRender);
	Application.on(MSG.RESIZE, onResize);
	Application.on(MSG.ROUTE, onRoute);

	onResize();
};















