window.MainPanel = function() {

	var active = true;

	var scrollPos = 0, scrollTarget = 0, scrollMax;

	var main = 		Wrapper.select('#main');

	var header = 	Wrapper.select('#header');
	var projects = 	Wrapper.select('#projects');
	var play =  	Wrapper.select('#play');
	var footer =  	Wrapper.select('#footer');
	var boxes = 	Wrapper.selectAll('.box');

	var toggleMainSlidingAnimation = function(t) {
		if(t) {
			main.addClass("animated");
		} else {
			main.rmClass("animated");
		}
	}

	var onResize = function() {
		scrollMax = main.height() - window.innerHeight;
	}

	var onScroll = function(e) {
		if(!active) return;
		scrollTarget += e.deltaY;
	}

	var onRender = function() {
		if(!active) return;

		scrollTarget = Math.clamp(scrollTarget, -scrollMax, 0);
		var velocity = (scrollTarget - scrollPos) * 0.2;
		scrollPos += velocity;

		var scr = scrollPos | 0;

		header.move(0, scr * 0.6);
		projects.move(0, scr);
		play.move(0, scr);
		footer.move(0, scr);
	}


	var slideBack = function() {
		if(active) return;
		main.move(0, 0);
		active = true;
	}

	var slideRight = function() {
		var offset = (window.innerWidth > 500) ? 500 : window.innerWidth;
		main.move(offset, 0);
		active = false;
	}

	var slideLeft = function() {
		var offset = -window.innerWidth;
		main.move(offset, 0);
		active = false;
	}

	Broadcast.addClient(Msg.ON_ITEM_OPEN, slideLeft); 
	Broadcast.addClient(Msg.ON_ABOUT_OPEN, slideRight);

	Broadcast.addClient(Msg.ON_MAIN_OPEN, slideBack); 

	Broadcast.addClient(Msg.SCROLL, onScroll); 
	Broadcast.addClient(Msg.RESIZE, onResize); 
	Broadcast.addClient(Msg.RENDER, onRender); 

	boxes.forEach(function(b) {
		b = Box(b);
		b.current = b.target = 0;
	});

	onResize();
	toggleMainSlidingAnimation(true);
};















